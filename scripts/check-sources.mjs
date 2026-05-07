import { readFileSync } from "node:fs";
import { performance } from "node:perf_hooks";

const sourceFile = new URL("../lib/sources.ts", import.meta.url);
const sourceText = readFileSync(sourceFile, "utf8");

const requestTimeoutMs = 15000;
const allowedStatusBySourceId = new Map([
  ["tsmc-technology", 403],
  ["tsmc-press-center", 403]
]);

function getField(block, field) {
  return block.match(new RegExp(`${field}: "([^"]+)"`))?.[1];
}

function extractOfficialSources(text) {
  const arrayMatch = text.match(
    /export const officialSources: OfficialSource\[\] = \[([\s\S]*?)\];/
  );

  if (!arrayMatch) {
    throw new Error("Could not find officialSources array in lib/sources.ts.");
  }

  return Array.from(arrayMatch[1].matchAll(/\{\n([\s\S]*?)\n {2}\}/g)).map(
    ([, block]) => ({
      id: getField(block, "id"),
      name: getField(block, "name"),
      url: getField(block, "url"),
      feedUrl: getField(block, "feedUrl"),
      crawlPolicy: getField(block, "crawlPolicy")
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

function validateSourceShape(sources) {
  if (sources.length === 0) {
    console.error(
      JSON.stringify(
        {
          ok: false,
          reason: "No official sources found in lib/sources.ts."
        },
        null,
        2
      )
    );
    process.exit(1);
  }

  const missingFields = sources.filter(
    (source) => !source.id || !source.name || !source.url || !source.crawlPolicy
  );

  const duplicateIds = findDuplicates(sources.map((source) => source.id));
  const duplicateUrls = findDuplicates(sources.map((source) => source.url));
  const invalidUrls = sources.filter((source) => {
    try {
      new URL(source.url);
      return false;
    } catch {
      return true;
    }
  });
  const invalidFeedUrls = sources.filter((source) => {
    if (!source.feedUrl) {
      return false;
    }

    try {
      new URL(source.feedUrl);
      return false;
    } catch {
      return true;
    }
  });
  const rssSourcesWithoutFeed = sources.filter(
    (source) => source.crawlPolicy === "rss" && !source.feedUrl
  );
  const feedSourcesWithoutRssPolicy = sources.filter(
    (source) => source.feedUrl && source.crawlPolicy !== "rss"
  );

  if (
    missingFields.length > 0 ||
    duplicateIds.length > 0 ||
    duplicateUrls.length > 0 ||
    invalidUrls.length > 0 ||
    invalidFeedUrls.length > 0 ||
    rssSourcesWithoutFeed.length > 0 ||
    feedSourcesWithoutRssPolicy.length > 0
  ) {
    console.error(
      JSON.stringify(
        {
          ok: false,
          reason: "Invalid official source metadata.",
          missingFields,
          duplicateIds,
          duplicateUrls,
          invalidUrls,
          invalidFeedUrls,
          rssSourcesWithoutFeed,
          feedSourcesWithoutRssPolicy
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
        "user-agent": "semiconductor-education-source-check/1.0"
      }
    });
  } finally {
    clearTimeout(timeout);
  }
}

function classifyResponse(source, response) {
  const expectedAllowedStatus = allowedStatusBySourceId.get(source.id);
  const status = response.status;
  const reachable = status >= 200 && status < 400;
  const allowed = expectedAllowedStatus === status;

  return {
    id: source.id,
    name: source.name,
    url: source.url,
    crawlPolicy: source.crawlPolicy,
    status,
    finalUrl: response.url,
    ok: reachable || allowed,
    allowed
  };
}

async function checkFeed(source) {
  if (!source.feedUrl) {
    return null;
  }

  try {
    const response = await fetchWithTimeout(source.feedUrl);
    const text = await response.text();
    const reachable = response.status >= 200 && response.status < 400;
    const feedLike = /<rss|<feed|<rdf:RDF/i.test(text);

    return {
      url: source.feedUrl,
      status: response.status,
      finalUrl: response.url,
      contentType: response.headers.get("content-type"),
      ok: reachable && feedLike
    };
  } catch (error) {
    return {
      url: source.feedUrl,
      ok: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

async function checkSource(source) {
  try {
    const response = await fetchWithTimeout(source.url);
    const sourceResult = classifyResponse(source, response);
    const feed = await checkFeed(source);

    return {
      ...sourceResult,
      feed,
      ok: sourceResult.ok && (!feed || feed.ok)
    };
  } catch (error) {
    return {
      id: source.id,
      name: source.name,
      url: source.url,
      crawlPolicy: source.crawlPolicy,
      ok: false,
      allowed: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

const startedAt = performance.now();
const sources = extractOfficialSources(sourceText);

validateSourceShape(sources);

const results = await Promise.all(sources.map((source) => checkSource(source)));
const failures = results.filter((result) => !result.ok);

const report = {
  ok: failures.length === 0,
  checked: results.length,
  feedChecked: results.filter((result) => result.feed).length,
  feedReachable: results.filter((result) => result.feed?.ok).length,
  reachable: results.filter((result) => result.ok && !result.allowed).length,
  allowed: results.filter((result) => result.allowed).length,
  failed: failures.length,
  durationMs: Math.round(performance.now() - startedAt),
  allowedStatusBySourceId: Object.fromEntries(allowedStatusBySourceId),
  results
};

if (failures.length > 0) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(report, null, 2));
