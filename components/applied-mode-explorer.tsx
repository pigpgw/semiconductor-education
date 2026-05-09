"use client";

import { useState } from "react";
import {
  ArrowRightLeft,
  BarChart3,
  BookOpenText,
  ExternalLink,
  Gauge,
  SlidersHorizontal,
  ZoomIn
} from "lucide-react";

type LessonSource = {
  title: string;
  url: string;
  usedFor: string;
};

type AppliedModeExplorerProps = {
  slug: string;
  sources: LessonSource[];
};

type TabId = "compare" | "tradeoff" | "source";

type Metric = {
  label: string;
  value: string;
  meaning: string;
};

type ComparisonRow = {
  item: string;
  strength: string;
  limit: string;
  readAs: string;
};

type Tradeoff = {
  title: string;
  push: string;
  gain: string;
  cost: string;
  decision: string;
};

type SourceLens = {
  sourceHint: string;
  officialSignal: string;
  engineeringRead: string;
  question: string;
};

type AppliedConfig = {
  title: string;
  description: string;
  metrics: Metric[];
  comparisons: ComparisonRow[];
  tradeoffs: Tradeoff[];
  sourceLens: SourceLens[];
};

const tabs: {
  id: TabId;
  label: string;
  description: string;
}[] = [
  {
    id: "compare",
    label: "비교하기",
    description: "비슷한 개념을 지표와 역할로 나눠 봅니다."
  },
  {
    id: "tradeoff",
    label: "Trade-off",
    description: "한쪽을 밀면 무엇을 얻고 잃는지 확인합니다."
  },
  {
    id: "source",
    label: "공식 자료 해석",
    description: "Big 10 공식 문장을 엔지니어링 질문으로 바꿉니다."
  }
];

const configs: Record<string, AppliedConfig> = {
  "dram-basics": {
    title: "DRAM 중급 모드: 제품 이름보다 시스템 요구를 먼저 봅니다.",
    description:
      "Samsung DRAM, SK hynix 메모리 기초 자료, Micron 제품 발표를 읽을 때 용량, 대역폭, 지연 시간, 전력을 분리해서 판단합니다.",
    metrics: [
      {
        label: "Capacity",
        value: "한 번에 올려둘 데이터 양",
        meaning: "서버 메모리, AI batch, 캐시 전략과 연결됩니다."
      },
      {
        label: "Bandwidth",
        value: "단위 시간 데이터 이동량",
        meaning: "GPU와 CPU가 기다리는 시간을 줄이는 핵심 지표입니다."
      },
      {
        label: "Latency",
        value: "요청 후 도착까지의 시간",
        meaning: "응답성이 중요한 workload에서 체감 성능을 가릅니다."
      },
      {
        label: "Power",
        value: "성능을 내는 데 쓰는 에너지",
        meaning: "모바일 배터리와 데이터센터 전력 예산에 직접 연결됩니다."
      }
    ],
    comparisons: [
      {
        item: "DDR",
        strength: "범용성과 용량 확장",
        limit: "AI 가속기 옆 대역폭 집중에는 한계",
        readAs: "서버와 PC의 기본 작업 메모리"
      },
      {
        item: "LPDDR",
        strength: "낮은 전력과 얇은 폼팩터",
        limit: "최고 대역폭보다 전력 예산을 우선",
        readAs: "모바일과 AI PC의 저전력 메모리"
      },
      {
        item: "GDDR",
        strength: "그래픽 workload에 맞춘 높은 대역폭",
        limit: "패키징과 전력 효율은 HBM과 다른 선택",
        readAs: "GPU 주변의 범용 고대역폭 DRAM"
      },
      {
        item: "HBM",
        strength: "연산기 가까이에서 매우 넓은 I/O",
        limit: "패키징, 열, 수율, 공급 capacity 부담",
        readAs: "AI/HPC 병목 완화용 적층 DRAM"
      }
    ],
    tradeoffs: [
      {
        title: "셀을 더 작게 만든다",
        push: "집적도와 원가 경쟁력",
        gain: "같은 면적에 더 많은 비트를 넣을 수 있습니다.",
        cost: "전하 저장 여유가 줄어 refresh와 sensing margin 부담이 커집니다.",
        decision: "DRAM scaling 발표는 용량 증가와 셀 안정성을 함께 봅니다."
      },
      {
        title: "I/O를 더 넓힌다",
        push: "대역폭",
        gain: "CPU/GPU가 더 많은 데이터를 한 번에 받을 수 있습니다.",
        cost: "패키지, 보드, 신호 무결성, 전력 설계가 어려워집니다.",
        decision: "GDDR/HBM 발표는 bandwidth 숫자와 패키징 조건을 같이 읽습니다."
      },
      {
        title: "전력을 낮춘다",
        push: "전력 효율",
        gain: "모바일, 노트북, 서버 전력 예산을 줄일 수 있습니다.",
        cost: "최고 성능이나 응답 시간과 충돌할 수 있습니다.",
        decision: "LPDDR류 발표는 성능보다 사용 환경과 전력 제약을 먼저 봅니다."
      }
    ],
    sourceLens: [
      {
        sourceHint: "Samsung DRAM",
        officialSignal: "DRAM 제품군과 용도를 나눠 설명합니다.",
        engineeringRead: "같은 DRAM 원리가 시스템 요구에 따라 제품군으로 갈라집니다.",
        question: "이 제품은 용량, 대역폭, 전력 중 무엇을 가장 우선하나요?"
      },
      {
        sourceHint: "SK hynix Semiconductor 101",
        officialSignal: "휘발성/비휘발성 메모리를 구분합니다.",
        engineeringRead: "DRAM과 NAND를 역할별 계층으로 봐야 합니다.",
        question: "이 메모리는 작업 공간인가, 장기 저장 공간인가요?"
      }
    ]
  },
  "hbm-ai-memory": {
    title: "HBM 중급 모드: bandwidth만 보지 말고 패키지를 함께 봅니다.",
    description:
      "Samsung, SK hynix, Micron의 HBM 설명과 TSMC 3DFabric 자료를 함께 읽으며 AI 메모리 병목을 구조적으로 비교합니다.",
    metrics: [
      {
        label: "Bandwidth",
        value: "GPU가 한 번에 받을 수 있는 데이터 통로",
        meaning: "AI 학습과 추론 throughput에 직접 영향을 줍니다."
      },
      {
        label: "Capacity",
        value: "GPU 가까이에 둘 수 있는 데이터 양",
        meaning: "모델 크기, batch, cache 전략과 연결됩니다."
      },
      {
        label: "Thermal",
        value: "쌓인 die에서 열을 빼는 난이도",
        meaning: "성능 유지, 신뢰성, 패키지 설계의 핵심 제약입니다."
      },
      {
        label: "Package",
        value: "GPU와 HBM을 연결하는 물리 구조",
        meaning: "Interposer, substrate, supply capacity가 성능을 실제 제품으로 바꿉니다."
      }
    ],
    comparisons: [
      {
        item: "DDR",
        strength: "용량 확장과 범용성",
        limit: "GPU 가까이에서 bandwidth를 집중하기 어렵습니다.",
        readAs: "시스템 메모리 계층"
      },
      {
        item: "GDDR",
        strength: "GPU용 높은 대역폭",
        limit: "HBM처럼 수직 적층과 넓은 I/O를 쓰지는 않습니다.",
        readAs: "그래픽/가속기 주변 메모리"
      },
      {
        item: "HBM",
        strength: "TSV와 적층으로 대역폭 집중",
        limit: "열, 수율, 패키징 capacity가 커집니다.",
        readAs: "AI/HPC용 고급 패키징 메모리"
      },
      {
        item: "CXL/SSD 계층",
        strength: "용량 확장과 데이터 계층화",
        limit: "HBM처럼 연산기 옆 고대역폭 계층은 아닙니다.",
        readAs: "HBM 밖 데이터 이동 비용을 줄이는 보조 계층"
      }
    ],
    tradeoffs: [
      {
        title: "적층 수를 늘린다",
        push: "용량",
        gain: "GPU 가까이에 더 많은 데이터를 둘 수 있습니다.",
        cost: "스택 높이, 열, warpage, die 결함 관리가 어려워집니다.",
        decision: "몇 단 적층인지는 성능 숫자이면서 제조 난이도 신호입니다."
      },
      {
        title: "I/O 폭을 넓힌다",
        push: "대역폭",
        gain: "memory wall을 줄이고 GPU 활용률을 높일 수 있습니다.",
        cost: "Interposer, base die, 전력 전달, 신호 검증 부담이 커집니다.",
        decision: "HBM은 메모리와 패키징 발표를 항상 같이 읽어야 합니다."
      },
      {
        title: "패키지를 더 복잡하게 만든다",
        push: "시스템 성능",
        gain: "GPU와 HBM을 짧고 넓게 연결해 AI 처리량을 올립니다.",
        cost: "수율, 공급 capacity, 고객 검증 시간이 경쟁력이 됩니다.",
        decision: "TSMC/Intel 패키징 자료와 메모리 기업 발표를 교차 확인합니다."
      }
    ],
    sourceLens: [
      {
        sourceHint: "Samsung/SK hynix HBM",
        officialSignal: "TSV 기반 적층과 초고대역폭을 강조합니다.",
        engineeringRead: "대역폭은 구조, 열, 수율, 고객 검증이 함께 만든 결과입니다.",
        question: "이 HBM 발표는 bandwidth 외에 어떤 패키징 조건을 말하나요?"
      },
      {
        sourceHint: "TSMC 3DFabric",
        officialSignal: "2.5D/3D integration 플랫폼을 설명합니다.",
        engineeringRead: "HBM 성능은 GPU와 가까이 붙는 packaging capacity와 연결됩니다.",
        question: "메모리 성능이 실제 AI 서버 성능으로 이어지는 연결 조건은 무엇인가요?"
      }
    ]
  },
  "euv-dram-scaling": {
    title: "EUV 중급 모드: 짧은 파장보다 공정 통합을 먼저 봅니다.",
    description:
      "Samsung EUV, ASML lithography, Lam Research etch, KLA metrology 자료를 연결해 노광 이후 양산성까지 비교합니다.",
    metrics: [
      {
        label: "Resolution",
        value: "더 작은 패턴을 만들 가능성",
        meaning: "13.5nm EUV 파장은 미세 패턴 구현에 유리합니다."
      },
      {
        label: "Overlay",
        value: "여러 패턴 단계의 정렬 정확도",
        meaning: "Multi-patterning이 늘어날수록 오차 관리가 어려워집니다."
      },
      {
        label: "Throughput",
        value: "웨이퍼를 처리하는 속도",
        meaning: "연구 적용과 양산 적용을 가르는 생산성 지표입니다."
      },
      {
        label: "Defect",
        value: "마스크, resist, particle, 식각 전사 문제",
        meaning: "수율과 고객 공급 안정성을 좌우합니다."
      }
    ],
    comparisons: [
      {
        item: "DUV multi-patterning",
        strength: "기존 생태계와 경험 활용",
        limit: "반복 공정, overlay, 공정 시간 부담",
        readAs: "복잡도를 여러 단계로 나누는 선택"
      },
      {
        item: "EUV selected layer",
        strength: "일부 패턴을 더 적은 단계로 구현",
        limit: "장비 비용, mask/resist, throughput 부담",
        readAs: "효과가 큰 레이어에 비용을 집중하는 선택"
      },
      {
        item: "Etch/deposition",
        strength: "패턴을 실제 막질 구조로 전사",
        limit: "고종횡비, profile, uniformity 제어 필요",
        readAs: "노광 이후 구조를 완성하는 공정"
      },
      {
        item: "Metrology/inspection",
        strength: "결함을 찾고 공정 조건을 되먹임",
        limit: "미세 결함을 빠르게 잡아야 ramp-up 가능",
        readAs: "수율 학습 속도를 만드는 데이터 계층"
      }
    ],
    tradeoffs: [
      {
        title: "EUV를 더 많이 쓴다",
        push: "패터닝 단순화",
        gain: "일부 레이어에서 multi-patterning 부담을 줄일 수 있습니다.",
        cost: "장비 비용, mask defect, throughput, 공정 통합 난이도가 커집니다.",
        decision: "EUV 적용 발표는 어느 레이어에 왜 쓰는지 먼저 확인합니다."
      },
      {
        title: "DUV multi-patterning을 유지한다",
        push: "검증된 공정",
        gain: "기존 장비와 공정 경험을 활용할 수 있습니다.",
        cost: "단계 수와 overlay 오차, cycle time이 늘어날 수 있습니다.",
        decision: "DUV/EUV는 우열이 아니라 레이어별 비용 대비 효과로 봅니다."
      },
      {
        title: "계측을 더 촘촘히 한다",
        push: "수율 안정화",
        gain: "결함 원인을 빨리 찾고 process window를 좁힐 수 있습니다.",
        cost: "검사 시간과 데이터 처리 부담이 늘어날 수 있습니다.",
        decision: "KLA 같은 계측 자료는 양산 ramp-up을 읽는 핵심 근거입니다."
      }
    ],
    sourceLens: [
      {
        sourceHint: "ASML lithography",
        officialSignal: "파장, 광학, 노광 원리를 설명합니다.",
        engineeringRead: "해상도는 시작점이고 throughput과 defect가 양산성을 결정합니다.",
        question: "이 설명은 연구 수준 원리인가, 양산 장비 조건인가요?"
      },
      {
        sourceHint: "Lam/KLA",
        officialSignal: "식각, 계측, 검사, process control을 설명합니다.",
        engineeringRead: "EUV 뒤에도 패턴 전사와 결함 검출이 맞아야 제품이 됩니다.",
        question: "노광 뒤 어떤 공정과 데이터가 수율을 결정하나요?"
      }
    ]
  }
};

function getConfig(slug: string) {
  return configs[slug] ?? configs["dram-basics"];
}

export function AppliedModeExplorer({ slug, sources }: AppliedModeExplorerProps) {
  const config = getConfig(slug);
  const [tab, setTab] = useState<TabId>("compare");
  const [selectedMetricIndex, setSelectedMetricIndex] = useState(0);
  const [selectedTradeoffIndex, setSelectedTradeoffIndex] = useState(0);
  const selectedMetric = config.metrics[selectedMetricIndex];
  const selectedTradeoff = config.tradeoffs[selectedTradeoffIndex];

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-blue/30 bg-blue/5">
      <div className="border-b border-blue/20 bg-bg0 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue/30 bg-blue/10 px-3 py-1 text-xs font-black text-blue">
            <Gauge size={15} aria-hidden />
            중급 모드
          </span>
          <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-bold text-muted">
            비교하고 판단하기
          </span>
        </div>
        <h2 className="mt-3 text-2xl font-black leading-snug sm:text-3xl">
          {config.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          {config.description}
        </p>
      </div>

      <div className="grid gap-px bg-blue/20 lg:grid-cols-[220px_1fr]">
        <div className="bg-paper p-4">
          <div className="grid gap-2">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`focus-ring rounded-md border px-3 py-3 text-left transition ${
                  tab === item.id
                    ? "border-saffron bg-saffron text-bg0"
                    : "border-line bg-bg3 text-ink hover:border-blue hover:text-blue"
                }`}
              >
                <span className="block text-sm font-black">{item.label}</span>
                <span
                  className={`mt-1 block text-xs leading-5 ${
                    tab === item.id ? "text-bg0/80" : "text-muted"
                  }`}
                >
                  {item.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-paper p-5 sm:p-6">
          {tab === "compare" ? (
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div>
                <p className="flex items-center gap-2 text-sm font-black text-blue">
                  <BarChart3 size={17} aria-hidden />
                  지표를 먼저 분리합니다.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {config.metrics.map((metric, index) => (
                    <button
                      key={metric.label}
                      type="button"
                      onClick={() => setSelectedMetricIndex(index)}
                      className={`focus-ring min-h-[132px] border p-4 text-left transition ${
                        selectedMetricIndex === index
                          ? "border-blue bg-blue/10"
                          : "border-line bg-bg3 hover:border-blue"
                      }`}
                    >
                      <span className="text-xs font-black text-saffron">
                        {metric.label}
                      </span>
                      <span className="mt-1 block text-base font-black leading-snug">
                        {metric.value}
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-muted">
                        {metric.meaning}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="border border-blue/30 bg-blue/10 p-5">
                <p className="flex items-center gap-2 text-sm font-black text-blue">
                  <ZoomIn size={17} aria-hidden />
                  선택한 지표
                </p>
                <h3 className="mt-2 text-2xl font-black">
                  {selectedMetric.label}
                </h3>
                <p className="mt-3 text-base font-bold leading-7">
                  {selectedMetric.value}
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {selectedMetric.meaning}
                </p>
              </div>
              <details className="xl:col-span-2 border border-line bg-surface">
                <summary className="focus-ring flex min-h-12 cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm font-black text-blue">
                  비교표 크게 보기
                  <span className="rounded-full border border-blue/30 bg-blue/10 px-2 py-1 text-[11px] text-blue">
                    click
                  </span>
                </summary>
                <div className="overflow-x-auto border-t border-line bg-paper">
                  <table className="min-w-[760px] w-full border-collapse text-left text-sm">
                    <thead className="bg-bg3">
                      <tr>
                        <th className="border-b border-line p-4 font-black">항목</th>
                        <th className="border-b border-line p-4 font-black">강점</th>
                        <th className="border-b border-line p-4 font-black">한계</th>
                        <th className="border-b border-line p-4 font-black">읽는 법</th>
                      </tr>
                    </thead>
                    <tbody>
                      {config.comparisons.map((row) => (
                        <tr key={row.item} className="align-top">
                          <th className="border-t border-line p-4 font-black">
                            {row.item}
                          </th>
                          <td className="border-t border-line p-4 leading-6 text-muted">
                            {row.strength}
                          </td>
                          <td className="border-t border-line p-4 leading-6 text-muted">
                            {row.limit}
                          </td>
                          <td className="border-t border-line p-4 leading-6 text-muted">
                            {row.readAs}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
          ) : null}

          {tab === "tradeoff" ? (
            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.7fr)]">
              <div>
                <p className="flex items-center gap-2 text-sm font-black text-blue">
                  <SlidersHorizontal size={17} aria-hidden />
                  하나를 밀면 다른 부담이 생깁니다.
                </p>
                <div className="mt-4 grid gap-3">
                  {config.tradeoffs.map((tradeoff, index) => (
                    <button
                      key={tradeoff.title}
                      type="button"
                      onClick={() => setSelectedTradeoffIndex(index)}
                      className={`focus-ring border p-4 text-left transition ${
                        selectedTradeoffIndex === index
                          ? "border-saffron bg-saffron/10"
                          : "border-line bg-bg3 hover:border-saffron"
                      }`}
                    >
                      <span className="text-xs font-black text-blue">
                        {tradeoff.push}
                      </span>
                      <span className="mt-1 block text-lg font-black">
                        {tradeoff.title}
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-muted">
                        {tradeoff.gain}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <article className="border border-saffron/35 bg-saffron/10 p-5">
                <p className="text-sm font-black text-saffron">확대 판단</p>
                <h3 className="mt-2 text-2xl font-black leading-snug">
                  {selectedTradeoff.title}
                </h3>
                <div className="mt-4 grid gap-3">
                  <TradeoffBlock label="얻는 것" text={selectedTradeoff.gain} />
                  <TradeoffBlock label="부담" text={selectedTradeoff.cost} />
                  <TradeoffBlock label="공식 자료 읽는 법" text={selectedTradeoff.decision} />
                </div>
              </article>
            </div>
          ) : null}

          {tab === "source" ? (
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div>
                <p className="flex items-center gap-2 text-sm font-black text-blue">
                  <BookOpenText size={17} aria-hidden />
                  공식 문장을 질문으로 바꿉니다.
                </p>
                <div className="mt-4 grid gap-3">
                  {config.sourceLens.map((lens) => (
                    <article key={lens.sourceHint} className="border border-line bg-bg3 p-4">
                      <p className="text-xs font-black text-saffron">
                        {lens.sourceHint}
                      </p>
                      <h3 className="mt-2 text-lg font-black">
                        {lens.officialSignal}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {lens.engineeringRead}
                      </p>
                      <p className="mt-3 rounded-md border border-blue/25 bg-blue/10 p-3 text-sm font-bold leading-6 text-ink">
                        {lens.question}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
              <div className="border border-line bg-surface p-4">
                <p className="flex items-center gap-2 text-sm font-black text-blue">
                  <ArrowRightLeft size={17} aria-hidden />
                  이 글의 공식 링크
                </p>
                <div className="mt-3 grid gap-2">
                  {sources.slice(0, 5).map((source) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring group border border-line bg-paper p-3 text-sm transition hover:border-blue"
                    >
                      <span className="flex items-start justify-between gap-3 font-black">
                        {source.title}
                        <ExternalLink
                          className="mt-0.5 shrink-0 text-muted group-hover:text-blue"
                          size={15}
                          aria-hidden
                        />
                      </span>
                      <span className="mt-2 block text-xs leading-5 text-muted">
                        {source.usedFor}
                      </span>
                    </a>
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

function TradeoffBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="border border-line bg-paper p-4">
      <p className="text-xs font-black text-blue">{label}</p>
      <p className="mt-2 text-sm leading-7 text-muted">{text}</p>
    </div>
  );
}
