"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, SlidersHorizontal, X } from "lucide-react";
import type { PracticeSet } from "@/lib/practice";

type OpenState = Record<string, boolean>;
type FilterOption = {
  id: string;
  label: string;
};

const allLevels = "all";
const allTopics = "all";

export function PracticeDrill({
  sets,
  topics
}: {
  sets: PracticeSet[];
  topics: string[];
}) {
  const [openAnswers, setOpenAnswers] = useState<OpenState>({});
  const [selectedLevel, setSelectedLevel] = useState(allLevels);
  const [selectedTopic, setSelectedTopic] = useState(allTopics);

  const levelOptions = useMemo<FilterOption[]>(
    () => sets.map((set) => ({ id: set.levelId, label: set.levelLabel })),
    [sets]
  );
  const totalQuestionCount = sets.reduce(
    (sum, set) => sum + set.questions.length,
    0
  );
  const filteredSets = useMemo(
    () =>
      sets
        .filter((set) => selectedLevel === allLevels || set.levelId === selectedLevel)
        .map((set) => ({
          ...set,
          questions: set.questions.filter(
            (question) =>
              selectedTopic === allTopics || question.topic === selectedTopic
          )
        }))
        .filter((set) => set.questions.length > 0),
    [selectedLevel, selectedTopic, sets]
  );
  const visibleQuestionCount = filteredSets.reduce(
    (sum, set) => sum + set.questions.length,
    0
  );
  const activeFilterCount =
    Number(selectedLevel !== allLevels) + Number(selectedTopic !== allTopics);

  function toggleAnswer(id: string) {
    setOpenAnswers((current) => ({
      ...current,
      [id]: !current[id]
    }));
  }

  function resetFilters() {
    setSelectedLevel(allLevels);
    setSelectedTopic(allTopics);
    setOpenAnswers({});
  }

  return (
    <div className="grid gap-10">
      <section className="border border-line bg-paper p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black text-teal">
              <SlidersHorizontal size={17} aria-hidden />
              복습 필터
            </p>
            <h2 className="mt-2 text-2xl font-black">
              지금 확인할 난이도와 주제를 고릅니다.
            </h2>
          </div>
          <div className="text-sm font-bold text-muted">
            {visibleQuestionCount}/{totalQuestionCount}문항
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <FilterGroup label="난이도">
            <FilterButton
              active={selectedLevel === allLevels}
              onClick={() => setSelectedLevel(allLevels)}
            >
              전체
            </FilterButton>
            {levelOptions.map((level) => (
              <FilterButton
                key={level.id}
                active={selectedLevel === level.id}
                onClick={() => setSelectedLevel(level.id)}
              >
                {level.label}
              </FilterButton>
            ))}
          </FilterGroup>

          <FilterGroup label="주제">
            <FilterButton
              active={selectedTopic === allTopics}
              onClick={() => setSelectedTopic(allTopics)}
            >
              전체
            </FilterButton>
            {topics.map((topic) => (
              <FilterButton
                key={topic}
                active={selectedTopic === topic}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </FilterButton>
            ))}
          </FilterGroup>
        </div>

        {activeFilterCount > 0 ? (
          <button
            type="button"
            onClick={resetFilters}
            className="focus-ring mt-5 inline-flex min-h-10 items-center gap-2 rounded-md border border-line px-3 text-sm font-bold text-muted hover:border-teal hover:text-teal"
          >
            <X size={16} aria-hidden />
            필터 초기화
          </button>
        ) : null}
      </section>

      {filteredSets.length === 0 ? (
        <section className="border border-line bg-paper p-6">
          <h2 className="text-2xl font-black">조건에 맞는 질문이 없습니다.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted">
            난이도나 주제를 넓히면 다시 복습 질문을 볼 수 있습니다.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="focus-ring mt-5 inline-flex min-h-11 items-center rounded-md bg-blue px-4 text-sm font-bold text-bg0 hover:bg-teal"
          >
            전체 질문 보기
          </button>
        </section>
      ) : null}

      {filteredSets.map((set) => (
        <section key={set.levelId} id={set.levelId} className="scroll-mt-28">
          <div className="border-b border-line pb-4">
            <p className="text-sm font-black text-saffron">{set.levelLabel}</p>
            <h2 className="mt-2 text-2xl font-black">{set.title}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted">
              {set.description}
            </p>
          </div>

          <div className="mt-5 grid gap-4">
            {set.questions.map((question, index) => {
              const id = `${set.levelId}-${question.question}`;
              const open = openAnswers[id] ?? false;

              return (
                <article key={question.question} className="border border-line bg-paper p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-black text-teal">
                      Question {index + 1}
                    </p>
                    <span className="rounded-full border border-line bg-bg3 px-3 py-1 text-xs font-bold text-muted">
                      {question.topic}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-black">{question.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    힌트: {question.hint}
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleAnswer(id)}
                    aria-expanded={open}
                    className="focus-ring mt-4 inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm font-bold hover:border-teal hover:text-teal"
                  >
                    {open ? "답 숨기기" : "답 확인하기"}
                  </button>

                  {open ? (
                    <div className="mt-4 grid gap-3 border-t border-line pt-4 md:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-black">핵심 답</h4>
                        <p className="mt-2 text-sm leading-7 text-muted">
                          {question.answer}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-black">실무 포인트</h4>
                        <p className="mt-2 text-sm leading-7 text-muted">
                          {question.fieldPoint}
                        </p>
                      </div>
                      <Link
                        href={question.relatedLesson.href}
                        className="focus-ring inline-flex min-h-10 items-center gap-2 self-start rounded-md text-sm font-bold text-teal hover:text-ink md:col-span-2"
                      >
                        관련 글: {question.relatedLesson.title}
                        <ArrowRight size={16} aria-hidden />
                      </Link>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>

          {selectedTopic === allTopics ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {set.scenarios.map((scenario) => (
                <article key={scenario.title} className="border border-line bg-surface p-5">
                  <p className="text-sm font-black text-teal">Scenario</p>
                  <h3 className="mt-2 text-xl font-black">{scenario.title}</h3>
                  <p className="mt-3 leading-7 text-muted">{scenario.prompt}</p>
                  <ul className="mt-4 grid gap-2">
                    {scenario.checkpoints.map((checkpoint) => (
                      <li key={checkpoint} className="flex gap-3 text-sm leading-6 text-muted">
                        <CheckCircle2
                          className="mt-0.5 shrink-0 text-teal"
                          size={17}
                          aria-hidden
                        />
                        {checkpoint}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}

function FilterGroup({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-black text-teal">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring inline-flex min-h-10 items-center rounded-md border px-3 text-sm font-bold ${
        active
          ? "border-teal bg-teal/10 text-teal"
          : "border-line bg-bg0 text-muted hover:border-teal hover:text-teal"
      }`}
    >
      {children}
    </button>
  );
}
