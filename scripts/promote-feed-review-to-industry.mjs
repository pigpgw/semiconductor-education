import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const queueFile = new URL("../lib/feed-review.ts", import.meta.url);
const sourceFile = new URL("../lib/sources.ts", import.meta.url);
const industryFile = new URL("../lib/industry.ts", import.meta.url);
const lessonsDir = path.join(process.cwd(), "content", "lessons");

const queueText = readFileSync(queueFile, "utf8");
const sourceText = readFileSync(sourceFile, "utf8");
const industryText = readFileSync(industryFile, "utf8");

function parseArgs(argv) {
  return argv.reduce(
    (options, arg) => {
      if (arg.startsWith("--id=")) {
        return {
          ...options,
          id: arg.slice("--id=".length)
        };
      }

      if (arg.startsWith("--format=")) {
        return {
          ...options,
          format: arg.slice("--format=".length)
        };
      }

      if (arg === "--list") {
        return {
          ...options,
          list: true
        };
      }

      return options;
    },
    { id: undefined, format: "json", list: false }
  );
}

function getField(block, field) {
  return block.match(new RegExp(`${field}:\\s*"([^"]+)"`))?.[1];
}

function getArrayField(block, field) {
  const match = block.match(new RegExp(`${field}: \\[([\\s\\S]*?)\\]`));

  if (!match) {
    return [];
  }

  return Array.from(match[1].matchAll(/"([^"]+)"/g)).map(([, value]) => value);
}

function extractArray(text, exportName) {
  const arrayMatch = text.match(
    new RegExp(`export const ${exportName}[^=]*= \\[([\\s\\S]*?)\\];`)
  );

  if (!arrayMatch) {
    throw new Error(`Could not find ${exportName} array.`);
  }

  return Array.from(arrayMatch[1].matchAll(/\{\n([\s\S]*?)\n {2}\}/g)).map(
    ([, block]) => block
  );
}

function extractFeedReviewQueue(text) {
  return extractArray(text, "feedReviewQueue").map((block) => ({
    id: getField(block, "id"),
    sourceId: getField(block, "sourceId"),
    sourceName: getField(block, "sourceName"),
    title: getField(block, "title"),
    url: getField(block, "url"),
    publishedAt: getField(block, "publishedAt"),
    fetchedAt: getField(block, "fetchedAt"),
    status: getField(block, "status"),
    priority: getField(block, "priority"),
    topics: getArrayField(block, "topics"),
    reason: getField(block, "reason"),
    reviewQuestions: getArrayField(block, "reviewQuestions"),
    suggestedRelatedLessons: getArrayField(block, "suggestedRelatedLessons")
  }));
}

function extractOfficialSources(text) {
  return extractArray(text, "officialSources").map((block) => ({
    id: getField(block, "id"),
    name: getField(block, "name"),
    companyType: getField(block, "companyType"),
    crawlPolicy: getField(block, "crawlPolicy"),
    topics: getArrayField(block, "topics")
  }));
}

function extractIndustryUpdates(text) {
  return extractArray(text, "industryUpdates").map((block) => ({
    id: getField(block, "id"),
    url: getField(block, "url")
  }));
}

function getTodayInSeoul() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.year}-${values.month}-${values.day}`;
}

function includesTopic(candidate, patterns) {
  return candidate.topics.some((topic) =>
    patterns.some((pattern) => topic.toLocaleLowerCase("en-US").includes(pattern))
  );
}

function inferLevel(candidate) {
  if (
    includesTopic(candidate, [
      "hbm",
      "packaging",
      "equipment",
      "etch",
      "deposition",
      "wafer",
      "euv"
    ])
  ) {
    return "심화";
  }

  if (includesTopic(candidate, ["nand", "ssd", "data center", "ai"])) {
    return "중급";
  }

  return "중급";
}

function inferCategory(candidate) {
  if (includesTopic(candidate, ["hbm", "ai memory"])) {
    return "HBM/AI 메모리";
  }

  if (includesTopic(candidate, ["nand", "ssd", "storage"])) {
    return "NAND/스토리지";
  }

  if (includesTopic(candidate, ["packaging"])) {
    return "패키징/시스템";
  }

  if (includesTopic(candidate, ["etch", "deposition", "wafer"])) {
    return "식각/공정";
  }

  if (includesTopic(candidate, ["euv", "patterning"])) {
    return "공정/미세화";
  }

  return "산업 해석";
}

function inferSourceType(candidate, source) {
  if (candidate.url.includes("/dram/") || candidate.url.includes("/technologies/")) {
    return "기술 페이지";
  }

  if (source?.companyType === "research") {
    return "공식 사이트";
  }

  return "보도자료";
}

function toIndustryDraft(candidate, source) {
  return {
    id: candidate.id,
    title: candidate.title,
    sourceId: candidate.sourceId,
    sourceName: candidate.sourceName,
    url: candidate.url,
    sourceType: inferSourceType(candidate, source),
    publishedAt: candidate.publishedAt,
    curatedAt: getTodayInSeoul(),
    level: inferLevel(candidate),
    category: inferCategory(candidate),
    status: "watching",
    tags: candidate.topics,
    summary: `${candidate.topics.join(", ")} 관점에서 원문을 확인할 산업 업데이트 초안입니다.`,
    whyItMatters: candidate.reason,
    readFor: candidate.reviewQuestions,
    relatedLessons: candidate.suggestedRelatedLessons
  };
}

function toTsValue(value, indent = 2) {
  const space = " ".repeat(indent);
  const childSpace = " ".repeat(indent + 2);

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }

    return `[\n${value
      .map((item) => `${childSpace}${toTsValue(item, indent + 2)}`)
      .join(",\n")}\n${space}]`;
  }

  if (value && typeof value === "object") {
    return `{\n${Object.entries(value)
      .filter(([, entryValue]) => entryValue !== undefined)
      .map(([key, entryValue]) => `${childSpace}${key}: ${toTsValue(entryValue, indent + 2)}`)
      .join(",\n")}\n${space}}`;
  }

  return JSON.stringify(value);
}

const options = parseArgs(process.argv.slice(2));
const candidates = extractFeedReviewQueue(queueText);
const sources = extractOfficialSources(sourceText);
const industryUpdates = extractIndustryUpdates(industryText);
const lessonSlugs = new Set(
  readdirSync(lessonsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
);

if (options.list) {
  console.log(
    JSON.stringify(
      {
        ok: true,
        candidates: candidates.map((candidate) => ({
          id: candidate.id,
          title: candidate.title,
          sourceId: candidate.sourceId,
          status: candidate.status,
          priority: candidate.priority
        }))
      },
      null,
      2
    )
  );
  process.exit(0);
}

if (!options.id) {
  console.error(
    JSON.stringify(
      {
        ok: false,
        reason: "Missing --id. Use --list to see candidate ids."
      },
      null,
      2
    )
  );
  process.exit(1);
}

const candidate = candidates.find((item) => item.id === options.id);
const source = sources.find((item) => item.id === candidate?.sourceId);
const duplicateId = industryUpdates.some((item) => item.id === options.id);
const duplicateUrl = industryUpdates.some((item) => item.url === candidate?.url);
const invalidRelatedLessons =
  candidate?.suggestedRelatedLessons.filter((slug) => !lessonSlugs.has(slug)) ?? [];

if (
  !candidate ||
  !source ||
  candidate.status === "dismissed" ||
  duplicateId ||
  duplicateUrl ||
  invalidRelatedLessons.length > 0
) {
  console.error(
    JSON.stringify(
      {
        ok: false,
        reason: "Cannot create industry draft.",
        missingCandidate: !candidate,
        missingSource: Boolean(candidate && !source),
        dismissed: candidate?.status === "dismissed",
        duplicateId,
        duplicateUrl,
        invalidRelatedLessons
      },
      null,
      2
    )
  );
  process.exit(1);
}

const draft = toIndustryDraft(candidate, source);

if (options.format === "ts") {
  console.log(toTsValue(draft, 0));
  process.exit(0);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      candidateId: candidate.id,
      insertInto: "lib/industry.ts industryUpdates",
      note:
        "원문 확인 후 summary, whyItMatters, readFor를 다듬고 industryUpdates에 추가하세요.",
      draft
    },
    null,
    2
  )
);
