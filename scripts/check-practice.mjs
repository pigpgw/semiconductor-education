import { readFileSync } from "node:fs";

const practiceFile = new URL("../lib/practice.ts", import.meta.url);
const practiceText = readFileSync(practiceFile, "utf8");
const minimumQuestionCount = 20;
const requiredLevelIds = new Set(["basic", "applied", "field"]);

function getField(block, field) {
  return block.match(new RegExp(`${field}:\\s*"([^"]+)"`))?.[1];
}

function extractPracticeSets(text) {
  return Array.from(
    text.matchAll(
      /levelId: "([^"]+)"[\s\S]*?questions: \[([\s\S]*?)\],\n {4}scenarios:/g
    )
  ).map(([, levelId, questionsBlock]) => {
    const questions = Array.from(
      questionsBlock.matchAll(/\{\n([\s\S]*?)\n {6}\}/g)
    ).map(([, block]) => ({
      topic: getField(block, "topic"),
      question: getField(block, "question"),
      hint: getField(block, "hint"),
      answer: getField(block, "answer"),
      fieldPoint: getField(block, "fieldPoint"),
      relatedTitle: block.match(/title:\s*"([^"]+)"/)?.[1],
      relatedHref: block.match(/href:\s*"([^"]+)"/)?.[1]
    }));

    return {
      levelId,
      questions
    };
  });
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

const practiceSets = extractPracticeSets(practiceText);
const questions = practiceSets.flatMap((set) =>
  set.questions.map((question) => ({
    ...question,
    levelId: set.levelId
  }))
);
const missingLevels = Array.from(requiredLevelIds).filter(
  (levelId) => !practiceSets.some((set) => set.levelId === levelId)
);
const emptyLevels = practiceSets.filter((set) => set.questions.length === 0);
const missingFields = questions.filter(
  (question) =>
    !question.topic ||
    !question.question ||
    !question.hint ||
    !question.answer ||
    !question.fieldPoint ||
    !question.relatedTitle ||
    !question.relatedHref
);
const duplicateQuestions = findDuplicates(
  questions.map((question) => question.question)
);
const invalidRelatedHrefs = questions.filter(
  (question) => !question.relatedHref?.startsWith("/")
);
const tooFewQuestions = questions.length < minimumQuestionCount;

const report = {
  ok:
    !tooFewQuestions &&
    missingLevels.length === 0 &&
    emptyLevels.length === 0 &&
    missingFields.length === 0 &&
    duplicateQuestions.length === 0 &&
    invalidRelatedHrefs.length === 0,
  count: questions.length,
  minimumQuestionCount,
  byLevel: Object.fromEntries(
    practiceSets.map((set) => [set.levelId, set.questions.length])
  ),
  byTopic: questions.reduce((counts, question) => {
    counts[question.topic] = (counts[question.topic] ?? 0) + 1;
    return counts;
  }, {}),
  missingLevels,
  emptyLevels,
  missingFields,
  duplicateQuestions,
  invalidRelatedHrefs
};

if (!report.ok) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(report, null, 2));
