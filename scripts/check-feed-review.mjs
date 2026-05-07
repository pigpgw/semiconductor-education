import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const queueFile = new URL("../lib/feed-review.ts", import.meta.url);
const sourceFile = new URL("../lib/sources.ts", import.meta.url);
const industryFile = new URL("../lib/industry.ts", import.meta.url);
const lessonsDir = path.join(process.cwd(), "content", "lessons");

const queueText = readFileSync(queueFile, "utf8");
const sourceText = readFileSync(sourceFile, "utf8");
const industryText = readFileSync(industryFile, "utf8");
const minimumCandidateCount = 3;
const allowedStatuses = new Set(["review-needed", "approved", "dismissed"]);
const allowedPriorities = new Set(["high", "medium", "low"]);
const allowedPromotionLevels = new Set(["기초", "중급", "심화"]);
const allowedPromotionStatuses = new Set(["curated", "lesson-linked", "watching"]);
const allowedPromotionSourceTypes = new Set([
  "보도자료",
  "기술 페이지",
  "제품 페이지",
  "기술 플랫폼",
  "공식 사이트"
]);

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

function getObjectBlock(block, field) {
  return block.match(new RegExp(`${field}: \\{([\\s\\S]*?)\\n    \\}`))?.[1];
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
  return extractArray(text, "feedReviewQueue").map((block) => {
    const promotionBlock = getObjectBlock(block, "promotion");

    return {
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
      suggestedRelatedLessons: getArrayField(block, "suggestedRelatedLessons"),
      promotion: promotionBlock
        ? {
            sourceType: getField(promotionBlock, "sourceType"),
            level: getField(promotionBlock, "level"),
            category: getField(promotionBlock, "category"),
            status: getField(promotionBlock, "status"),
            tags: getArrayField(promotionBlock, "tags"),
            summary: getField(promotionBlock, "summary")
          }
        : undefined
    };
  });
}

function extractOfficialSourceIds(text) {
  return new Set(
    extractArray(text, "officialSources").map((block) => getField(block, "id"))
  );
}

function extractIndustryUrls(text) {
  return new Set(
    extractArray(text, "industryUpdates").map((block) => getField(block, "url"))
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

function hasDateFormat(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

const candidates = extractFeedReviewQueue(queueText);
const sourceIds = extractOfficialSourceIds(sourceText);
const industryUrls = extractIndustryUrls(industryText);
const lessonSlugs = new Set(
  readdirSync(lessonsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
);
const duplicateIds = findDuplicates(candidates.map((candidate) => candidate.id));
const duplicateUrls = findDuplicates(candidates.map((candidate) => candidate.url));
const missingFields = candidates.filter(
  (candidate) =>
    !candidate.id ||
    !candidate.sourceId ||
    !candidate.sourceName ||
    !candidate.title ||
    !candidate.url ||
    !candidate.fetchedAt ||
    !candidate.status ||
    !candidate.priority ||
    !candidate.topics.length ||
    !candidate.reason ||
    !candidate.reviewQuestions.length ||
    !candidate.suggestedRelatedLessons.length ||
    !candidate.promotion?.sourceType ||
    !candidate.promotion?.level ||
    !candidate.promotion?.category ||
    !candidate.promotion?.status ||
    !candidate.promotion?.tags.length ||
    !candidate.promotion?.summary
);
const invalidUrls = candidates.filter((candidate) => {
  try {
    new URL(candidate.url);
    return false;
  } catch {
    return true;
  }
});
const invalidDates = candidates.filter(
  (candidate) =>
    !hasDateFormat(candidate.fetchedAt) ||
    (candidate.publishedAt && !hasDateFormat(candidate.publishedAt))
);
const invalidStatuses = candidates.filter(
  (candidate) => !allowedStatuses.has(candidate.status)
);
const invalidPriorities = candidates.filter(
  (candidate) => !allowedPriorities.has(candidate.priority)
);
const invalidPromotionLevels = candidates.filter(
  (candidate) => !allowedPromotionLevels.has(candidate.promotion?.level)
);
const invalidPromotionStatuses = candidates.filter(
  (candidate) => !allowedPromotionStatuses.has(candidate.promotion?.status)
);
const invalidPromotionSourceTypes = candidates.filter(
  (candidate) => !allowedPromotionSourceTypes.has(candidate.promotion?.sourceType)
);
const unknownSources = candidates.filter(
  (candidate) => !sourceIds.has(candidate.sourceId)
);
const alreadyCurated = candidates.filter((candidate) =>
  industryUrls.has(candidate.url)
);
const invalidRelatedLessons = candidates.filter((candidate) =>
  candidate.suggestedRelatedLessons.some((slug) => !lessonSlugs.has(slug))
);
const weakReviewQuestions = candidates.filter(
  (candidate) => candidate.reviewQuestions.length < 2
);
const weakPromotionSummaries = candidates.filter(
  (candidate) => (candidate.promotion?.summary?.length ?? 0) < 45
);
const tooFewCandidates = candidates.length < minimumCandidateCount;

const report = {
  ok:
    !tooFewCandidates &&
    duplicateIds.length === 0 &&
    duplicateUrls.length === 0 &&
    missingFields.length === 0 &&
    invalidUrls.length === 0 &&
    invalidDates.length === 0 &&
    invalidStatuses.length === 0 &&
    invalidPriorities.length === 0 &&
    invalidPromotionLevels.length === 0 &&
    invalidPromotionStatuses.length === 0 &&
    invalidPromotionSourceTypes.length === 0 &&
    unknownSources.length === 0 &&
    alreadyCurated.length === 0 &&
    invalidRelatedLessons.length === 0 &&
    weakReviewQuestions.length === 0 &&
    weakPromotionSummaries.length === 0,
  count: candidates.length,
  minimumCandidateCount,
  byStatus: candidates.reduce((counts, candidate) => {
    counts[candidate.status] = (counts[candidate.status] ?? 0) + 1;
    return counts;
  }, {}),
  byPriority: candidates.reduce((counts, candidate) => {
    counts[candidate.priority] = (counts[candidate.priority] ?? 0) + 1;
    return counts;
  }, {}),
  duplicateIds,
  duplicateUrls,
  missingFields,
  invalidUrls,
  invalidDates,
  invalidStatuses,
  invalidPriorities,
  invalidPromotionLevels,
  invalidPromotionStatuses,
  invalidPromotionSourceTypes,
  unknownSources,
  alreadyCurated,
  invalidRelatedLessons,
  weakReviewQuestions,
  weakPromotionSummaries
};

if (!report.ok) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(report, null, 2));
