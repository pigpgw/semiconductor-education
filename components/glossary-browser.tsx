"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { BookMarked, Search, X } from "lucide-react";
import { DifficultyBadge } from "@/components/difficulty-badge";
import type { GlossaryTerm } from "@/lib/glossary";

const allCategories = "전체";
const allLevels = "전체";
const levelOrder = ["기초", "중급", "심화"] as const;

type GlossaryBrowserProps = {
  terms: GlossaryTerm[];
  categories: string[];
};

export function GlossaryBrowser({ terms, categories }: GlossaryBrowserProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(allCategories);
  const [selectedLevel, setSelectedLevel] = useState(allLevels);

  const normalizedQuery = query.trim().toLowerCase();
  const levels = levelOrder.filter((level) =>
    terms.some((term) => term.level === level)
  );
  const filteredTerms = useMemo(
    () =>
      terms.filter((term) => {
        const matchesCategory =
          selectedCategory === allCategories || term.category === selectedCategory;
        const matchesLevel =
          selectedLevel === allLevels || term.level === selectedLevel;
        const haystack = [
          term.term,
          term.english,
          term.category,
          term.level,
          term.simple,
          term.fieldUse,
          ...term.related
        ]
          .join(" ")
          .toLowerCase();
        const matchesQuery =
          normalizedQuery.length === 0 || haystack.includes(normalizedQuery);

        return matchesCategory && matchesLevel && matchesQuery;
      }),
    [normalizedQuery, selectedCategory, selectedLevel, terms]
  );
  const visibleCategories = categories.filter((category) =>
    filteredTerms.some((term) => term.category === category)
  );
  const activeFilterCount =
    Number(selectedCategory !== allCategories) +
    Number(selectedLevel !== allLevels) +
    Number(normalizedQuery.length > 0);

  function resetFilters() {
    setQuery("");
    setSelectedCategory(allCategories);
    setSelectedLevel(allLevels);
  }

  return (
    <section className="mt-8">
      <div className="border border-line bg-paper p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <label className="block">
            <span className="text-sm font-black text-teal">용어 검색</span>
            <span className="relative mt-2 block">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                size={18}
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="DRAM, TSV, 수율, 패키징처럼 검색"
                className="focus-ring min-h-12 w-full rounded-md border border-line bg-bg0 pl-10 pr-4 text-sm font-semibold text-ink placeholder:text-muted"
              />
            </span>
          </label>

          <div className="flex min-h-12 items-center text-sm font-bold text-muted">
            {filteredTerms.length}/{terms.length}개 용어
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <FilterGroup label="카테고리">
            {[allCategories, ...categories].map((category) => (
              <FilterButton
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </FilterButton>
            ))}
          </FilterGroup>

          <FilterGroup label="난이도">
            {[allLevels, ...levels].map((level) => (
              <FilterButton
                key={level}
                active={selectedLevel === level}
                onClick={() => setSelectedLevel(level)}
              >
                {level}
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
      </div>

      {filteredTerms.length === 0 ? (
        <div className="mt-8 border border-line bg-paper p-6">
          <h2 className="text-2xl font-black">검색 결과가 없습니다.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted">
            한국어 용어, 영어 원어, 관련어, 실무 맥락까지 함께 검색합니다.
            조건을 줄이거나 다른 표현으로 다시 찾아보세요.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="focus-ring mt-5 inline-flex min-h-11 items-center rounded-md bg-blue px-4 text-sm font-bold text-bg0 hover:bg-teal"
          >
            전체 용어 보기
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-10">
          {visibleCategories.map((category) => {
            const categoryTerms = filteredTerms.filter(
              (item) => item.category === category
            );

            return (
              <section key={category} id={category}>
                <div className="flex items-center gap-3 border-b border-line pb-3">
                  <BookMarked className="text-teal" size={22} aria-hidden />
                  <h2 className="text-2xl font-black">{category}</h2>
                  <span className="text-sm font-bold text-muted">
                    {categoryTerms.length}개
                  </span>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {categoryTerms.map((item) => (
                    <article
                      key={item.term}
                      id={item.term}
                      className="scroll-mt-24 border border-line bg-paper p-5"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <DifficultyBadge level={item.level} />
                        <span className="rounded-full border border-line px-3 py-1 text-xs font-bold text-muted">
                          {item.english}
                        </span>
                      </div>
                      <h3 className="mt-4 text-xl font-black">{item.term}</h3>
                      <p className="mt-3 leading-7 text-muted">{item.simple}</p>
                      <div className="mt-4 border-t border-line pt-4">
                        <h4 className="text-sm font-black">실무에서는</h4>
                        <p className="mt-2 text-sm leading-7 text-muted">
                          {item.fieldUse}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.related.map((related) => (
                          <button
                            key={related}
                            type="button"
                            onClick={() => {
                              setQuery(related);
                              setSelectedCategory(allCategories);
                              setSelectedLevel(allLevels);
                            }}
                            className="focus-ring rounded-full bg-surface px-3 py-1 text-xs font-bold text-muted hover:text-teal"
                          >
                            {related}
                          </button>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </section>
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
