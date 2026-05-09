"use client";

import { useState } from "react";
import {
  BookOpenCheck,
  CheckCircle2,
  FileSearch,
  Gauge,
  MousePointerClick,
  Route,
  Target
} from "lucide-react";

type LevelId = "basic" | "applied" | "field";

type LessonLearningLabProps = {
  title: string;
  conclusion: string;
  readingGuide: Record<LevelId, string>;
  sourceCount: number;
  termCount: number;
};

type LevelMode = {
  id: LevelId;
  badge: string;
  label: string;
  question: string;
  checkpoint: string;
  startHref: string;
  startLabel: string;
};

type Principle = {
  id: string;
  label: string;
  title: string;
  short: string;
  weakRead: string;
  strongRead: string;
};

const levelModes: LevelMode[] = [
  {
    id: "basic",
    badge: "Level 1",
    label: "기초",
    question: "이 기술이 왜 필요한지 한 문장으로 말할 수 있나요?",
    checkpoint: "비유, 핵심 용어, 구조 그림을 보고 본문 첫 절을 읽습니다.",
    startHref: "#basic-mode",
    startLabel: "기초 모드로 이동"
  },
  {
    id: "applied",
    badge: "Level 2",
    label: "중급",
    question: "비슷한 제품이나 공정과 무엇이 다른지 비교할 수 있나요?",
    checkpoint: "지표, 비교표, trade-off를 눌러 공식 발표의 숫자를 해석합니다.",
    startHref: "#applied-mode",
    startLabel: "중급 모드로 이동"
  },
  {
    id: "field",
    badge: "Level 3",
    label: "고급",
    question: "성능 개선 뒤에 생기는 수율, 열, 전력, 고객 검증 리스크를 말할 수 있나요?",
    checkpoint: "리스크 맵과 증거 연결을 보고 실무 판단 문장으로 바꿉니다.",
    startHref: "#field-mode",
    startLabel: "고급 모드로 이동"
  }
];

const principles: Principle[] = [
  {
    id: "problem",
    label: "01",
    title: "제품명보다 병목",
    short: "DRAM, HBM, EUV를 이름으로 외우기보다 어떤 막힘을 풀려고 나온 기술인지 먼저 봅니다.",
    weakRead: "HBM은 최신 AI 메모리라서 좋다.",
    strongRead: "HBM은 GPU가 데이터를 기다리는 memory wall을 줄이기 위해 대역폭을 패키지 가까이에 모은다."
  },
  {
    id: "structure",
    label: "02",
    title: "비유에서 구조로",
    short: "쉬운 비유로 시작하되 셀, TSV, 노광, 식각, 계측 같은 실제 구조로 반드시 돌아옵니다.",
    weakRead: "EUV는 더 얇은 펜이다.",
    strongRead: "EUV는 짧은 파장으로 일부 레이어의 multi-patterning 부담을 줄이지만, mask/resist와 후속 식각·계측까지 맞아야 한다."
  },
  {
    id: "constraint",
    label: "03",
    title: "좋다보다 trade-off",
    short: "성능이 오르면 전력, 열, 수율, 비용, 공급 capacity 중 무엇이 부담되는지 같이 봅니다.",
    weakRead: "적층 수가 늘면 HBM이 더 좋아진다.",
    strongRead: "적층 수 증가는 용량과 대역폭에 유리하지만 열 경로, warpage, known good die, 스택 수율 부담을 키운다."
  },
  {
    id: "evidence",
    label: "04",
    title: "출처를 교차 확인",
    short: "한 회사 발표만 보지 않고 메모리, 장비, 공정, 계측, 패키징 자료를 이어서 읽습니다.",
    weakRead: "공식 자료에 나온 문장을 그대로 요약한다.",
    strongRead: "공식 표현을 기술 의미와 학습자 질문으로 바꾸고, 다른 공식 출처로 제약 조건을 확인한다."
  }
];

const routeItems = [
  { href: "#basic-mode", label: "기초 모드", detail: "용어와 큰 그림" },
  { href: "#applied-mode", label: "중급 모드", detail: "비교와 trade-off" },
  { href: "#field-mode", label: "고급 모드", detail: "리스크와 증거" },
  { href: "#article-body", label: "본문", detail: "MDX 교재 읽기" },
  { href: "#practice-check", label: "복습", detail: "자기 말로 설명" }
];

export function LessonLearningLab({
  title,
  conclusion,
  readingGuide,
  sourceCount,
  termCount
}: LessonLearningLabProps) {
  const [selectedLevel, setSelectedLevel] = useState<LevelId>("basic");
  const [selectedPrinciple, setSelectedPrinciple] = useState(principles[0].id);
  const activeLevel = levelModes.find((mode) => mode.id === selectedLevel) ?? levelModes[0];
  const activePrinciple =
    principles.find((principle) => principle.id === selectedPrinciple) ?? principles[0];

  return (
    <section
      id="study-flow"
      className="mt-8 overflow-hidden rounded-2xl border border-line bg-paper"
    >
      <div className="border-b border-line bg-bg0 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-black text-teal">
            <MousePointerClick size={15} aria-hidden />
            학습 인터랙션
          </span>
          <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-bold text-muted">
            원칙부터 읽기
          </span>
        </div>
        <h2 className="mt-3 max-w-3xl text-2xl font-black leading-snug sm:text-3xl">
          {title}를 원칙, 구조, 판단 순서로 공부합니다.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          {conclusion} 아래에서 자기 레벨을 누르면 먼저 볼 질문과 이동 경로가
          바뀝니다.
        </p>
      </div>

      <div className="grid gap-px bg-line xl:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)]">
        <div className="bg-paper p-5 sm:p-6">
          <div className="grid gap-2 sm:grid-cols-3">
            {levelModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSelectedLevel(mode.id)}
                className={`focus-ring min-h-[126px] border p-4 text-left transition ${
                  selectedLevel === mode.id
                    ? "border-blue bg-blue text-bg0"
                    : "border-line bg-bg3 text-ink hover:border-teal hover:text-teal"
                }`}
              >
                <span
                  className={`text-xs font-black ${
                    selectedLevel === mode.id ? "text-bg0/75" : "text-saffron"
                  }`}
                >
                  {mode.badge}
                </span>
                <span className="mt-1 block text-xl font-black">{mode.label}</span>
                <span
                  className={`mt-2 block text-sm leading-6 ${
                    selectedLevel === mode.id ? "text-bg0/85" : "text-muted"
                  }`}
                >
                  {readingGuide[mode.id]}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
            <article className="border border-blue/30 bg-blue/10 p-5">
              <p className="flex items-center gap-2 text-sm font-black text-blue">
                <Target size={17} aria-hidden />
                지금 던질 질문
              </p>
              <h3 className="mt-3 text-2xl font-black leading-snug">
                {activeLevel.question}
              </h3>
              <div className="mt-4 border-t border-blue/25 pt-4">
                <p className="flex items-center gap-2 text-sm font-black text-saffron">
                  <CheckCircle2 size={17} aria-hidden />
                  완료 기준
                </p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {activeLevel.checkpoint}
                </p>
              </div>
              <a
                href={activeLevel.startHref}
                className="focus-ring mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-blue px-4 text-sm font-black text-bg0 transition hover:bg-teal"
              >
                {activeLevel.startLabel}
              </a>
            </article>

            <aside className="border border-line bg-surface p-4">
              <p className="flex items-center gap-2 text-sm font-black text-teal">
                <Route size={17} aria-hidden />
                읽기 경로
              </p>
              <div className="mt-3 grid gap-2">
                {routeItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="focus-ring grid min-h-14 grid-cols-[1fr_auto] items-center gap-3 border border-line bg-paper px-3 py-2 text-sm transition hover:border-teal hover:text-teal"
                  >
                    <span>
                      <span className="block font-black">{item.label}</span>
                      <span className="mt-0.5 block text-xs font-bold text-muted">
                        {item.detail}
                      </span>
                    </span>
                    <BookOpenCheck size={15} aria-hidden />
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </div>

        <div className="bg-paper p-5 sm:p-6">
          <p className="flex items-center gap-2 text-sm font-black text-teal">
            <Gauge size={17} aria-hidden />
            반도체 펀더멘탈 원칙
          </p>
          <div className="mt-4 grid gap-2">
            {principles.map((principle) => (
              <button
                key={principle.id}
                type="button"
                onClick={() => setSelectedPrinciple(principle.id)}
                className={`focus-ring border p-3 text-left transition ${
                  selectedPrinciple === principle.id
                    ? "border-teal bg-teal/10"
                    : "border-line bg-bg3 hover:border-teal"
                }`}
              >
                <span className="text-xs font-black text-saffron">
                  {principle.label}
                </span>
                <span className="ml-2 text-sm font-black">{principle.title}</span>
                <span className="mt-1 block text-xs leading-5 text-muted">
                  {principle.short}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-line lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="bg-surface p-5 sm:p-6">
          <p className="text-sm font-black text-teal">{activePrinciple.title}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="border border-line bg-paper p-4">
              <p className="text-xs font-black text-berry">약한 읽기</p>
              <p className="mt-2 text-sm leading-7 text-muted">
                {activePrinciple.weakRead}
              </p>
            </div>
            <div className="border border-teal/30 bg-teal/10 p-4">
              <p className="text-xs font-black text-teal">좋은 읽기</p>
              <p className="mt-2 text-sm font-bold leading-7">
                {activePrinciple.strongRead}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-bg0 p-5 sm:p-6">
          <p className="flex items-center gap-2 text-sm font-black text-teal">
            <FileSearch size={17} aria-hidden />
            이 글의 근거
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            <div className="border border-line bg-paper p-4">
              <dt className="text-xs font-black text-muted">공식 출처</dt>
              <dd className="mt-1 text-2xl font-black">{sourceCount}</dd>
            </div>
            <div className="border border-line bg-paper p-4">
              <dt className="text-xs font-black text-muted">관련 용어</dt>
              <dd className="mt-1 text-2xl font-black">{termCount}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm leading-7 text-muted">
            숫자와 발표 문장은 그대로 외우지 않고, 공식 근거와 용어를 연결해
            자기 말로 다시 설명합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
