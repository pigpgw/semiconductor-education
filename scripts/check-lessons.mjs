import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const lessonsDir = path.join(process.cwd(), "content", "lessons");
const minimumLessonCount = 3;
const requiredReadingLevels = ["basic", "applied", "field"];
const requiredQuickSummaryFields = [
  "conclusion",
  "keyTerms",
  "fieldKeywords",
  "outcome"
];
const requiredSourceInterpretationFields = [
  "officialClaim",
  "engineeringMeaning",
  "readerQuestion",
  "freshnessNote"
];

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isNonEmptyStringArray(value) {
  return Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString);
}

function hasDateFormat(value) {
  return isNonEmptyString(value) && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function validateLesson(fileName) {
  const file = readFileSync(path.join(lessonsDir, fileName), "utf8");
  const { data } = matter(file);
  const issues = [];

  for (const field of [
    "title",
    "description",
    "level",
    "category",
    "publishedAt",
    "updatedAt"
  ]) {
    if (!isNonEmptyString(data[field])) {
      issues.push(`missing ${field}`);
    }
  }

  if (!hasDateFormat(data.publishedAt)) {
    issues.push("invalid publishedAt date");
  }

  if (!hasDateFormat(data.updatedAt)) {
    issues.push("invalid updatedAt date");
  }

  if (!isNonEmptyStringArray(data.tags)) {
    issues.push("missing tags");
  }

  if (!isNonEmptyStringArray(data.learningGoals)) {
    issues.push("missing learningGoals");
  }

  if (!isNonEmptyStringArray(data.prerequisites)) {
    issues.push("missing prerequisites");
  }

  for (const field of requiredQuickSummaryFields) {
    const value = data.quickSummary?.[field];
    const valid =
      field === "keyTerms" || field === "fieldKeywords"
        ? isNonEmptyStringArray(value)
        : isNonEmptyString(value);

    if (!valid) {
      issues.push(`missing quickSummary.${field}`);
    }
  }

  for (const level of requiredReadingLevels) {
    if (!isNonEmptyString(data.readingGuide?.[level])) {
      issues.push(`missing readingGuide.${level}`);
    }
  }

  for (const field of requiredSourceInterpretationFields) {
    if (!isNonEmptyString(data.sourceInterpretation?.[field])) {
      issues.push(`missing sourceInterpretation.${field}`);
    }
  }

  if (!Array.isArray(data.sources) || data.sources.length === 0) {
    issues.push("missing sources");
  } else {
    data.sources.forEach((source, index) => {
      const prefix = `sources[${index}]`;

      if (!isNonEmptyString(source.title)) {
        issues.push(`missing ${prefix}.title`);
      }

      if (!isNonEmptyString(source.url) || !URL.canParse(source.url)) {
        issues.push(`invalid ${prefix}.url`);
      }

      if (!hasDateFormat(source.checkedAt)) {
        issues.push(`invalid ${prefix}.checkedAt`);
      }

      if (!isNonEmptyString(source.usedFor)) {
        issues.push(`missing ${prefix}.usedFor`);
      }
    });
  }

  return {
    fileName,
    issues
  };
}

const files = readdirSync(lessonsDir)
  .filter((file) => file.endsWith(".mdx"))
  .sort();
const results = files.map(validateLesson);
const failed = results.filter((result) => result.issues.length > 0);
const tooFewLessons = files.length < minimumLessonCount;
const report = {
  ok: !tooFewLessons && failed.length === 0,
  count: files.length,
  minimumLessonCount,
  failed
};

if (!report.ok) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(report, null, 2));
