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

type LessonSource = {
  title: string;
  url: string;
  usedFor: string;
};

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

type ModeId = "first" | "structure" | "source";

type ConceptCard = {
  label: string;
  title: string;
  beginner: string;
  structure: string;
  field: string;
};

const modes: {
  id: ModeId;
  label: string;
  description: string;
}[] = [
  {
    id: "first",
    label: "처음 보기",
    description: "비유와 한 줄 결론으로 큰 그림을 먼저 잡습니다."
  },
  {
    id: "structure",
    label: "구조 보기",
    description: "클릭한 개념을 실제 구조와 trade-off까지 크게 봅니다."
  },
  {
    id: "source",
    label: "공식 자료 읽기",
    description: "Big 10 공식 자료를 어떤 질문으로 읽을지 연결합니다."
  }
];

const conceptCardsBySlug: Record<string, ConceptCard[]> = {
  "dram-basics": [
    {
      label: "역할",
      title: "DRAM은 책상입니다",
      beginner:
        "SSD가 책장이라면 DRAM은 지금 펼쳐 둔 책상입니다. 전원이 꺼지면 치워지지만, 작업 중에는 바로 손이 닿습니다.",
      structure:
        "DRAM은 작은 셀 배열에 데이터를 전하로 저장하고, CPU/GPU가 필요한 데이터를 빠르게 가져가게 합니다.",
      field:
        "실무에서는 용량, 대역폭, 지연 시간, 전력, 고객 시스템 검증을 함께 봅니다."
    },
    {
      label: "셀",
      title: "1T1C는 1비트를 담는 최소 방입니다",
      beginner:
        "트랜지스터는 문이고 커패시터는 물컵입니다. 컵에 전하가 있으면 1, 부족하면 0으로 봅니다.",
      structure:
        "셀은 word line과 bit line으로 선택되고, sense amplifier가 아주 작은 전하 차이를 읽습니다.",
      field:
        "셀을 작게 만들수록 집적도는 좋아지지만 전하 여유와 refresh 부담이 커집니다."
    },
    {
      label: "제품군",
      title: "DDR, LPDDR, GDDR, HBM은 같은 뿌리입니다",
      beginner:
        "같은 DRAM이라도 서버, 모바일, 그래픽, AI 가속기에서 원하는 조건이 다릅니다.",
      structure:
        "DDR은 범용성, LPDDR은 저전력, GDDR/HBM은 높은 대역폭에 더 강하게 최적화됩니다.",
      field:
        "제품 이름보다 어떤 시스템 병목을 줄이려는 메모리인지 먼저 읽어야 합니다."
    }
  ],
  "hbm-ai-memory": [
    {
      label: "병목",
      title: "HBM은 GPU가 기다리지 않게 합니다",
      beginner:
        "GPU가 요리사라면 HBM은 주방 바로 옆에 붙은 넓은 재료 출입구입니다.",
      structure:
        "DRAM die를 위로 쌓고 TSV로 연결해 GPU 가까이에서 넓은 데이터 통로를 만듭니다.",
      field:
        "AI 시스템에서는 bandwidth, capacity, power, package capacity를 함께 맞춰야 성능이 납니다."
    },
    {
      label: "연결",
      title: "TSV는 위아래 칩을 잇는 수직 통로입니다",
      beginner:
        "아파트 층마다 엘리베이터가 있어야 위아래가 빠르게 이어지는 것과 비슷합니다.",
      structure:
        "TSV는 stacked DRAM die를 관통해 base die와 package로 신호를 전달합니다.",
      field:
        "정렬, 열, 수율, warpage, 고객 검증이 HBM 경쟁력의 일부가 됩니다."
    },
    {
      label: "시스템",
      title: "HBM은 메모리 기술이면서 패키징 기술입니다",
      beginner:
        "빠른 메모리를 만드는 것만으로 끝나지 않고, GPU 옆에 안정적으로 붙여야 합니다.",
      structure:
        "Interposer, substrate, power delivery, cooling 조건이 HBM 성능을 실제 서버 성능으로 바꿉니다.",
      field:
        "TSMC 3DFabric 같은 패키징 플랫폼과 메모리 기업의 HBM 발표를 같이 읽어야 합니다."
    }
  ],
  "euv-dram-scaling": [
    {
      label: "노광",
      title: "EUV는 더 얇은 펜입니다",
      beginner:
        "굵은 펜으로 촘촘한 도면을 여러 번 나눠 그리던 일을 더 얇은 펜으로 줄일 수 있습니다.",
      structure:
        "EUV는 13.5nm 파장의 빛을 써서 일부 미세 패턴의 multi-patterning 부담을 낮춥니다.",
      field:
        "양산에서는 파장뿐 아니라 mask, resist, throughput, defect, 장비 가동률을 함께 봅니다."
    },
    {
      label: "공정",
      title: "노광 뒤에는 식각과 계측이 이어집니다",
      beginner:
        "도면을 찍었다고 건물이 완성되는 것이 아닙니다. 실제 재료를 깎고 검사해야 합니다.",
      structure:
        "Photo로 만든 패턴은 etch/deposition/metrology를 거쳐 실제 막질 구조가 됩니다.",
      field:
        "Lam Research와 KLA 자료를 같이 읽으면 EUV가 공정 통합 문제라는 점이 보입니다."
    },
    {
      label: "양산",
      title: "EUV 도입은 수율과 생산성의 문제입니다",
      beginner:
        "작게 그릴 수 있어도 많이, 반복해서, 안정적으로 만들어야 제품이 됩니다.",
      structure:
        "적용 레이어, overlay, defect, process window, yield learning이 실제 양산성을 가릅니다.",
      field:
        "EUV 발표는 어느 제품과 어느 레이어에 적용됐는지, 수율을 어떻게 확보했는지 질문해야 합니다."
    }
  ]
};

function getConceptCards(slug: string) {
  return conceptCardsBySlug[slug] ?? conceptCardsBySlug["dram-basics"];
}

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
  const concepts = getConceptCards(slug);
  const [mode, setMode] = useState<ModeId>("first");
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
            {modes.map((item) => (
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
  concept: ConceptCard;
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

function ExpandedConcept({ concept }: { concept: ConceptCard }) {
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
