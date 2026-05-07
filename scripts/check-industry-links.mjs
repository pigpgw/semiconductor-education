import { readFileSync } from "node:fs";
import { performance } from "node:perf_hooks";

const industryFile = new URL("../lib/industry.ts", import.meta.url);
const industryText = readFileSync(industryFile, "utf8");

const requestTimeoutMs = 15000;
const allowedStatusByUpdateId = new Map([["tsmc-3dfabric-platform", 403]]);

function getField(block, field) {
  return block.match(new RegExp(`${field}:\\s*"([^"]+)"`))?.[1];
}

function getArrayField(block, field) {
  const match = block.match(new RegExp(`${field}: \\[([\\s\\S]*?)\\]`));

  if (!match) {
    return undefined;
  }

  return Array.from(match[1].matchAll(/"([^"]+)"/g)).map(([, value]) => value);
}

function extractIndustryUpdates(text) {
  const arrayMatch = text.match(
    /export const industryUpdates: IndustryUpdate\[\] = \[([\s\S]*?)\];/
  );

  if (!arrayMatch) {
    throw new Error("Could not find industryUpdates array in lib/industry.ts.");
  }

  return Array.from(arrayMatch[1].matchAll(/\{\n([\s\S]*?)\n {2}\}/g)).map(
    ([, block]) => ({
      id: getField(block, "id"),
      title: getField(block, "title"),
      sourceId: getField(block, "sourceId"),
      sourceName: getField(block, "sourceName"),
      url: getField(block, "url"),
      sourceType: getField(block, "sourceType"),
      curatedAt: getField(block, "curatedAt"),
      level: getField(block, "level"),
      category: getField(block, "category"),
      status: getField(block, "status"),
      summary: getField(block, "summary"),
      whyItMatters: getField(block, "whyItMatters"),
      tags: getArrayField(block, "tags"),
      readFor: getArrayField(block, "readFor"),
      relatedLessons: getArrayField(block, "relatedLessons")
    })
  );
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }

  return Array.from(duplicates);
}

function validateUpdateShape(updates) {
  if (updates.length === 0) {
    console.error(
      JSON.stringify(
        {
          ok: false,
          reason: "No industry updates found in lib/industry.ts."
        },
        null,
        2
      )
    );
    process.exit(1);
  }

  const missingFields = updates.filter(
    (update) =>
      !update.id ||
      !update.title ||
      !update.sourceId ||
      !update.sourceName ||
      !update.url ||
      !update.sourceType ||
      !update.curatedAt ||
      !update.level ||
      !update.category ||
      !update.status ||
      !update.summary ||
      !update.whyItMatters ||
      !update.tags?.length ||
      !update.readFor?.length ||
      !update.relatedLessons
  );
  const duplicateIds = findDuplicates(updates.map((update) => update.id));
  const duplicateUrls = findDuplicates(updates.map((update) => update.url));
  const invalidUrls = updates.filter((update) => {
    try {
      new URL(update.url);
      return false;
    } catch {
      return true;
    }
  });

  if (
    missingFields.length > 0 ||
    duplicateIds.length > 0 ||
    duplicateUrls.length > 0 ||
    invalidUrls.length > 0
  ) {
    console.error(
      JSON.stringify(
        {
          ok: false,
          reason: "Invalid industry update metadata.",
          missingFields,
          duplicateIds,
          duplicateUrls,
          invalidUrls
        },
        null,
        2
      )
    );
    process.exit(1);
  }
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    return await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "semiconductor-education-industry-link-check/1.0"
      }
    });
  } finally {
    clearTimeout(timeout);
  }
}

function classifyResponse(update, response) {
  const expectedAllowedStatus = allowedStatusByUpdateId.get(update.id);
  const status = response.status;
  const reachable = status >= 200 && status < 400;
  const allowed = expectedAllowedStatus === status;

  return {
    id: update.id,
    title: update.title,
    sourceId: update.sourceId,
    url: update.url,
    status,
    finalUrl: response.url,
    ok: reachable || allowed,
    allowed
  };
}

async function checkUpdate(update) {
  try {
    const response = await fetchWithTimeout(update.url);
    return classifyResponse(update, response);
  } catch (error) {
    return {
      id: update.id,
      title: update.title,
      sourceId: update.sourceId,
      url: update.url,
      ok: false,
      allowed: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

const startedAt = performance.now();
const updates = extractIndustryUpdates(industryText);

validateUpdateShape(updates);

const results = await Promise.all(updates.map((update) => checkUpdate(update)));
const failures = results.filter((result) => !result.ok);

const report = {
  ok: failures.length === 0,
  checked: results.length,
  reachable: results.filter((result) => result.ok && !result.allowed).length,
  allowed: results.filter((result) => result.allowed).length,
  failed: failures.length,
  durationMs: Math.round(performance.now() - startedAt),
  allowedStatusByUpdateId: Object.fromEntries(allowedStatusByUpdateId),
  results
};

if (failures.length > 0) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(report, null, 2));
