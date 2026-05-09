"use client";

import { useState } from "react";
import {
  BookOpenCheck,
  ExternalLink,
  Layers,
  MousePointerClick,
  Sparkles,
  ZoomIn
} from "lucide-react";
import type { GlossaryTerm } from "@/lib/glossary";
import {
  basicModeTabs,
  getBasicConceptCards,
  type BasicConceptCard,
  type BasicModeId,
  type LessonSource
} from "@/lib/lesson-interactions";

type BasicModeExplorerProps = {
  slug: string;
  title: string;
  conclusion: string;
  analogy: string;
  keyTerms: string[];
  fieldKeywords: string[];
  sources: LessonSource[];
  relatedTerms: GlossaryTerm[];
};

export function BasicModeExplorer({
  slug,
  title,
  conclusion,
  analogy,
  keyTerms,
  fieldKeywords,
  sources,
  relatedTerms
}: BasicModeExplorerProps) {
  const concepts = getBasicConceptCards(slug);
  const [mode, setMode] = useState<BasicModeId>("first");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = concepts[selectedIndex];
  const beginnerTerms = relatedTerms.filter((term) => term.level === "기초").slice(0, 3);

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-teal/30 bg-teal/5">
      <div className="border-b border-teal/20 bg-bg0 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-black text-teal">
            <Sparkles size={15} aria-hidden />
            기초 모드
          </span>
          <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-bold text-muted">
            클릭해서 크게 보기
          </span>
        </div>
        <h2 className="mt-3 text-2xl font-black leading-snug sm:text-3xl">
          처음 들어온 사람도 {title}를 단계별로 볼 수 있게 나눕니다.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          어려운 본문을 바로 읽기 전에, 쉬운 비유와 핵심 구조를 먼저 만지고
          공식 자료를 어떤 질문으로 읽을지 확인합니다.
        </p>
      </div>

      <div className="grid gap-px bg-teal/20 lg:grid-cols-[220px_1fr]">
        <div className="bg-paper p-4">
          <div className="grid gap-2">
            {basicModeTabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id)}
                className={`focus-ring rounded-md border px-3 py-3 text-left transition ${
                  mode === item.id
                    ? "border-blue bg-blue text-bg0"
                    : "border-line bg-bg3 text-ink hover:border-teal hover:text-teal"
                }`}
              >
                <span className="block text-sm font-black">{item.label}</span>
                <span
                  className={`mt-1 block text-xs leading-5 ${
                    mode === item.id ? "text-bg0/80" : "text-muted"
                  }`}
                >
                  {item.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-paper p-5 sm:p-6">
          {mode === "first" ? (
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
              <div>
                <p className="text-sm font-black text-teal">한 줄로 먼저 잡기</p>
                <h3 className="mt-2 text-2xl font-black leading-snug">
                  {conclusion}
                </h3>
                <p className="mt-4 rounded-xl border border-line bg-bg3 p-4 text-sm leading-7 text-muted">
                  {analogy}
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {concepts.map((concept, index) => (
                    <ConceptButton
                      key={concept.title}
                      concept={concept}
                      selected={selectedIndex === index}
                      onClick={() => setSelectedIndex(index)}
                    />
                  ))}
                </div>
              </div>
              <div className="border border-line bg-surface p-4">
                <p className="flex items-center gap-2 text-sm font-black text-teal">
                  <BookOpenCheck size={17} aria-hidden />
                  기초 용어
                </p>
                <div className="mt-3 grid gap-3">
                  {[...beginnerTerms, ...keyTerms].slice(0, 3).map((term) =>
                    typeof term === "string" ? (
                      <span
                        key={term}
                        className="rounded-md border border-line bg-paper px-3 py-2 text-sm font-bold"
                      >
                        {term}
                      </span>
                    ) : (
                      <div key={term.term} className="border border-line bg-paper p-3">
                        <p className="text-sm font-black">{term.term}</p>
                        <p className="mt-1 text-xs leading-5 text-muted">
                          {term.simple}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {mode === "structure" ? (
            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(260px,0.65fr)]">
              <div>
                <p className="flex items-center gap-2 text-sm font-black text-teal">
                  <MousePointerClick size={17} aria-hidden />
                  아래 카드를 누르면 오른쪽에 크게 펼쳐집니다.
                </p>
                <div className="mt-4 grid gap-3">
                  {concepts.map((concept, index) => (
                    <button
                      key={concept.title}
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className={`focus-ring border p-4 text-left transition ${
                        selectedIndex === index
                          ? "border-blue bg-blue/10"
                          : "border-line bg-bg3 hover:border-teal"
                      }`}
                    >
                      <span className="text-xs font-black text-saffron">
                        {concept.label}
                      </span>
                      <span className="mt-1 block text-lg font-black">
                        {concept.title}
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-muted">
                        {concept.beginner}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <ExpandedConcept concept={selected} />
            </div>
          ) : null}

          {mode === "source" ? (
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
              <div>
                <p className="flex items-center gap-2 text-sm font-black text-teal">
                  <Layers size={17} aria-hidden />
                  공식 자료를 읽는 순서
                </p>
                <div className="mt-4 grid gap-3">
                  {sources.slice(0, 4).map((source, index) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring group border border-line bg-bg3 p-4 transition hover:border-teal"
                    >
                      <span className="text-xs font-black text-saffron">
                        공식 자료 {index + 1}
                      </span>
                      <span className="mt-1 flex items-start justify-between gap-3 text-base font-black">
                        {source.title}
                        <ExternalLink
                          className="mt-1 shrink-0 text-muted group-hover:text-teal"
                          size={16}
                          aria-hidden
                        />
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-muted">
                        {source.usedFor}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="border border-line bg-surface p-4">
                <p className="text-sm font-black">기초 모드 질문</p>
                <ul className="mt-3 grid gap-3 text-sm leading-6 text-muted">
                  <li>이 공식 자료가 말하는 부품이나 공정은 무엇인가?</li>
                  <li>성능, 전력, 수율, 패키징 중 무엇을 강조하는가?</li>
                  <li>쉬운 말로 바꾸면 사용자가 어떤 문제를 이해하게 되는가?</li>
                  <li>숫자보다 먼저 봐야 할 구조와 trade-off는 무엇인가?</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {fieldKeywords.slice(0, 5).map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-md border border-line bg-paper px-2.5 py-1 text-xs font-bold text-muted"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ConceptButton({
  concept,
  selected,
  onClick
}: {
  concept: BasicConceptCard;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring min-h-[140px] border p-4 text-left transition ${
        selected
          ? "border-blue bg-blue/10"
          : "border-line bg-surface hover:border-teal"
      }`}
    >
      <span className="text-xs font-black text-saffron">{concept.label}</span>
      <span className="mt-1 block text-base font-black leading-snug">
        {concept.title}
      </span>
      <span className="mt-2 block text-sm leading-6 text-muted">
        {concept.beginner}
      </span>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-black text-teal">
        <ZoomIn size={14} aria-hidden />
        크게 보기
      </span>
    </button>
  );
}

function ExpandedConcept({ concept }: { concept: BasicConceptCard }) {
  return (
    <article className="border border-blue/30 bg-blue/10 p-5">
      <div className="flex items-center gap-2 text-sm font-black text-blue">
        <ZoomIn size={18} aria-hidden />
        확대 설명
      </div>
      <h3 className="mt-2 text-2xl font-black leading-snug">{concept.title}</h3>
      <div className="mt-4 grid gap-3">
        <ExplanationBlock label="처음 보기" text={concept.beginner} />
        <ExplanationBlock label="실제 구조" text={concept.structure} />
        <ExplanationBlock label="현업 관점" text={concept.field} />
      </div>
    </article>
  );
}

function ExplanationBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="border border-line bg-paper p-4">
      <p className="text-xs font-black text-saffron">{label}</p>
      <p className="mt-2 text-sm leading-7 text-muted">{text}</p>
    </div>
  );
}
