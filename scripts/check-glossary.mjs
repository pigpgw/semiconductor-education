import { readFileSync } from "node:fs";

const glossaryFile = new URL("../lib/glossary.ts", import.meta.url);
const glossaryText = readFileSync(glossaryFile, "utf8");
const minimumTermCount = 30;
const allowedLevels = new Set(["기초", "중급", "심화"]);

function getField(block, field) {
  return block.match(new RegExp(`${field}:\\s*"([^"]+)"`))?.[1];
}

function getStringArrayField(block, field) {
  const match = block.match(new RegExp(`${field}: \\[([^\\]]*)\\]`));

  if (!match) {
    return undefined;
  }

  return Array.from(match[1].matchAll(/"([^"]+)"/g)).map((item) => item[1]);
}

function extractGlossaryTerms(text) {
  const arrayMatch = text.match(
    /export const glossary: GlossaryTerm\[\] = \[([\s\S]*?)\];/
  );

  if (!arrayMatch) {
    throw new Error("Could not find glossary array in lib/glossary.ts.");
  }

  return Array.from(arrayMatch[1].matchAll(/\{\n([\s\S]*?)\n {2}\}/g)).map(
    ([, block]) => ({
      term: getField(block, "term"),
      english: getField(block, "english"),
      category: getField(block, "category"),
      level: getField(block, "level"),
      simple: getField(block, "simple"),
      fieldUse: getField(block, "fieldUse"),
      related: getStringArrayField(block, "related")
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

const terms = extractGlossaryTerms(glossaryText);
const missingFields = terms.filter(
  (term) =>
    !term.term ||
    !term.english ||
    !term.category ||
    !term.level ||
    !term.simple ||
    !term.fieldUse ||
    !term.related ||
    term.related.length === 0
);
const invalidLevels = terms.filter((term) => !allowedLevels.has(term.level));
const duplicateTerms = findDuplicates(terms.map((term) => term.term));
const duplicateEnglish = findDuplicates(terms.map((term) => term.english));
const tooFewTerms = terms.length < minimumTermCount;

const report = {
  ok:
    !tooFewTerms &&
    missingFields.length === 0 &&
    invalidLevels.length === 0 &&
    duplicateTerms.length === 0 &&
    duplicateEnglish.length === 0,
  count: terms.length,
  minimumTermCount,
  categories: Array.from(new Set(terms.map((term) => term.category))).sort(),
  levels: Array.from(new Set(terms.map((term) => term.level))).sort(),
  missingFields,
  invalidLevels,
  duplicateTerms,
  duplicateEnglish
};

if (!report.ok) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(report, null, 2));
