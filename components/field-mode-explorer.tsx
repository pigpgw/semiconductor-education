"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Crosshair,
  ExternalLink,
  Factory,
  FileSearch,
  GitBranch,
  ShieldCheck,
  Target
} from "lucide-react";

type LessonSource = {
  title: string;
  url: string;
  usedFor: string;
};

type FieldModeExplorerProps = {
  slug: string;
  sources: LessonSource[];
};

type TabId = "risk" | "decision" | "evidence";

type Risk = {
  label: string;
  trigger: string;
  impact: string;
  ownerView: string;
};

type Decision = {
  title: string;
  situation: string;
  watch: string[];
  judgment: string;
};

type EvidencePath = {
  source: string;
  signal: string;
  crossCheck: string;
  output: string;
};

type FieldConfig = {
  title: string;
  description: string;
  operatingFrame: string[];
  risks: Risk[];
  decisions: Decision[];
  evidencePaths: EvidencePath[];
};

const tabs: {
  id: TabId;
  label: string;
  description: string;
}[] = [
  {
    id: "risk",
    label: "리스크 맵",
    description: "수율, 열, 전력, 공급 같은 실무 리스크를 클릭해 봅니다."
  },
  {
    id: "decision",
    label: "판단 훈련",
    description: "공식 발표를 보고 어떤 판단 문장으로 바꿀지 연습합니다."
  },
  {
    id: "evidence",
    label: "증거 연결",
    description: "Big 10 자료를 교차 확인해 포트폴리오용 근거로 바꿉니다."
  }
];

const configs: Record<string, FieldConfig> = {
  "dram-basics": {
    title: "DRAM 고급 모드: 셀 구조를 제품·수율·고객 검증으로 연결합니다.",
    description:
      "Samsung DRAM과 SK hynix 메모리 자료를 읽은 뒤, DRAM을 단순 작업 메모리가 아니라 셀 안정성, refresh, 전력, 시스템 검증의 균형으로 판단합니다.",
    operatingFrame: [
      "셀을 작게 만들수록 용량과 원가 경쟁력은 좋아지지만 전하 저장 여유가 줄어듭니다.",
      "Refresh와 sensing margin은 전력, 지연 시간, 고온 신뢰성과 함께 봐야 합니다.",
      "DDR, LPDDR, GDDR, HBM은 같은 DRAM 계열이지만 고객 시스템의 병목이 다릅니다."
    ],
    risks: [
      {
        label: "Cell margin",
        trigger: "셀 면적 축소와 커패시터 전하 감소",
        impact: "read/write 안정성, refresh 부담, 고온 동작 리스크 증가",
        ownerView: "소자·공정·제품팀은 셀 구조와 sensing 조건을 함께 봅니다."
      },
      {
        label: "Power budget",
        trigger: "대역폭 상승, refresh 증가, I/O 확장",
        impact: "서버 전력, 모바일 배터리, 패키지 열 설계 부담",
        ownerView: "제품 기획과 시스템 검증은 성능 숫자보다 전력당 성능을 같이 봅니다."
      },
      {
        label: "Customer validation",
        trigger: "새 세대 DRAM 또는 새 폼팩터 적용",
        impact: "CPU/GPU/보드/펌웨어 조합에서 안정성 검증 기간 증가",
        ownerView: "양산 발표와 실제 고객 채택 사이의 검증 단계를 구분합니다."
      }
    ],
    decisions: [
      {
        title: "새 DRAM 세대 발표를 읽을 때",
        situation: "공식 자료가 속도, 용량, 전력 개선을 동시에 말합니다.",
        watch: ["어떤 시스템용 제품인가", "대역폭과 전력 중 무엇이 핵심인가", "기존 세대 대비 고객 검증 조건은 무엇인가"],
        judgment:
          "좋은 답은 '더 빠르다'가 아니라 '이 제품은 특정 시스템의 메모리 병목을 줄이되 전력·검증 비용을 함께 관리한다'입니다."
      },
      {
        title: "DRAM과 NAND를 비교할 때",
        situation: "학습자가 둘 다 메모리라서 같은 역할로 이해합니다.",
        watch: ["휘발성 여부", "latency와 bandwidth", "저장 비용과 endurance"],
        judgment:
          "DRAM은 작업 중 데이터 이동을, NAND는 장기 저장을 담당한다는 계층 구조로 설명해야 합니다."
      }
    ],
    evidencePaths: [
      {
        source: "Samsung DRAM",
        signal: "DRAM 제품군과 용도를 공식 분류로 확인",
        crossCheck: "SK hynix Semiconductor 101의 volatile/non-volatile 구분과 대조",
        output: "DRAM은 작업 메모리이며 제품군은 시스템 병목별로 갈라진다는 설명"
      },
      {
        source: "Micron memory/SSD 발표",
        signal: "DRAM과 NAND/SSD가 데이터센터에서 서로 다른 병목을 담당",
        crossCheck: "Samsung/SK 자료의 메모리 계층 설명과 연결",
        output: "메모리 계층 비교표와 공식 발표 해석 노트"
      }
    ]
  },
  "hbm-ai-memory": {
    title: "HBM 고급 모드: AI 메모리를 양산·패키징·공급 capacity로 판단합니다.",
    description:
      "Samsung, SK hynix, Micron의 HBM 발표와 TSMC 3DFabric 자료를 함께 읽고, bandwidth 숫자를 열·수율·패키지 capacity·고객 검증으로 확장합니다.",
    operatingFrame: [
      "HBM의 가치는 bandwidth 숫자만이 아니라 GPU 가까이에 놓이는 패키징 구조에서 나옵니다.",
      "적층 수가 늘면 용량은 커지지만 열, warpage, known good die, 스택 수율 리스크가 커집니다.",
      "AI 서버 성능은 HBM 공급, interposer capacity, GPU 패키지, 냉각, 고객 검증이 함께 맞아야 나옵니다."
    ],
    risks: [
      {
        label: "Thermal path",
        trigger: "DRAM die 적층과 높은 대역폭 동작",
        impact: "성능 유지, 장기 신뢰성, 패키지 냉각 설계 난이도 증가",
        ownerView: "패키징·시스템팀은 bandwidth와 열 경로를 한 묶음으로 봅니다."
      },
      {
        label: "Stack yield",
        trigger: "여러 die, TSV, base die, interposer 결합",
        impact: "하나의 결함이 고가 패키지 전체 가치에 영향을 줄 수 있음",
        ownerView: "양산 관점에서는 die 품질과 패키지 수율을 동시에 관리합니다."
      },
      {
        label: "Supply capacity",
        trigger: "AI 서버 수요 급증과 고급 패키징 병목",
        impact: "제품 스펙이 좋아도 납기, 고객 채택, 매출 인식이 제한될 수 있음",
        ownerView: "산업 자료는 기술 발표와 공급 가능성을 분리해서 읽습니다."
      }
    ],
    decisions: [
      {
        title: "HBM 신제품 발표를 읽을 때",
        situation: "공식 자료가 적층 수, bandwidth, AI 성능 기여를 강조합니다.",
        watch: ["몇 단 적층인가", "GPU와 어떤 패키지로 연결되는가", "열과 고객 검증 언급이 있는가"],
        judgment:
          "고급 해석은 '대역폭 증가'에서 멈추지 않고 '패키징과 공급 capacity가 성능을 실제 AI 서버로 바꾸는 조건'까지 말합니다."
      },
      {
        title: "HBM과 CXL/SSD 계층을 비교할 때",
        situation: "AI 데이터가 HBM 안에만 머문다고 오해하기 쉽습니다.",
        watch: ["자주 쓰는 데이터와 덜 자주 쓰는 데이터", "latency 계층", "용량 확장 비용"],
        judgment:
          "HBM은 가장 가까운 고대역폭 계층이고, 나머지 메모리/스토리지 계층은 용량과 비용 병목을 나눠 맡습니다."
      }
    ],
    evidencePaths: [
      {
        source: "Samsung/SK hynix/Micron HBM",
        signal: "TSV, stacked DRAM, AI/HPC bandwidth 강조",
        crossCheck: "TSMC 3DFabric의 2.5D/3D integration 자료와 연결",
        output: "HBM은 메모리 제품이면서 고급 패키징 제품이라는 판단 문장"
      },
      {
        source: "SK hynix AI memory 자료",
        signal: "Memory wall과 AI data movement 문제 제시",
        crossCheck: "NVIDIA 같은 시스템 자료는 수요 맥락으로만 보조 확인",
        output: "AI 병목은 연산 성능보다 데이터 이동 계층 설계까지 포함한다는 설명"
      }
    ]
  },
  "euv-dram-scaling": {
    title: "EUV 고급 모드: 장비 도입이 아니라 공정 통합 역량으로 판단합니다.",
    description:
      "Samsung EUV, ASML lithography, Lam Research etch, KLA metrology 자료를 교차해 EUV를 해상도, throughput, defect, etch transfer, yield learning으로 읽습니다.",
    operatingFrame: [
      "EUV의 13.5nm 파장은 시작점이고, 양산에서는 throughput과 defect 관리가 실제 성과를 가릅니다.",
      "노광으로 패턴을 만든 뒤 식각, 증착, 계측이 맞아야 실제 구조와 수율이 나옵니다.",
      "EUV는 모든 레이어에 쓰는 만능 도구가 아니라 효과가 큰 레이어를 선택하는 비용·수율 판단입니다."
    ],
    risks: [
      {
        label: "Mask/resist defect",
        trigger: "EUV mask, resist, particle, stochastic defect",
        impact: "미세 결함이 수율과 고객 신뢰성으로 확대될 수 있음",
        ownerView: "공정 통합팀은 장비 성능보다 defect budget을 더 민감하게 봅니다."
      },
      {
        label: "Etch transfer",
        trigger: "노광 패턴을 실제 막질로 옮기는 후속 식각",
        impact: "profile, CD uniformity, line roughness가 전기적 특성을 흔듦",
        ownerView: "Lam 같은 식각 자료를 함께 봐야 EUV가 제품 구조로 이어집니다."
      },
      {
        label: "Yield learning",
        trigger: "새 레이어, 새 장비, 새 defect mode 도입",
        impact: "양산 ramp-up 속도와 원가 경쟁력에 직접 영향",
        ownerView: "KLA 같은 계측/검사 자료는 수율 학습 속도를 읽는 근거입니다."
      }
    ],
    decisions: [
      {
        title: "EUV 적용 발표를 읽을 때",
        situation: "공식 자료가 13.5nm, single patterning, 생산성 개선을 말합니다.",
        watch: ["어느 레이어에 적용됐는가", "multi-patterning을 얼마나 줄였는가", "defect와 계측 전략이 보이는가"],
        judgment:
          "고급 해석은 '더 작게 그린다'가 아니라 '공정 단계, overlay, defect, yield learning을 함께 줄이는 통합 선택'입니다."
      },
      {
        title: "ASML 자료와 Samsung 자료를 연결할 때",
        situation: "ASML은 장비 원리를, Samsung은 DRAM 양산 적용을 말합니다.",
        watch: ["장비 원리와 제품 적용의 차이", "throughput", "공정 통합 책임"],
        judgment:
          "장비 원리 자료는 가능성을 설명하고, 제품 양산 자료는 수율과 고객 공급 조건을 보여줍니다."
      }
    ],
    evidencePaths: [
      {
        source: "ASML lithography",
        signal: "EUV optics, wavelength, lithography principle",
        crossCheck: "Samsung EUV DRAM 양산 자료의 생산성·수율 표현과 연결",
        output: "EUV는 해상도 기술이면서 양산 공정 통합 기술이라는 설명"
      },
      {
        source: "Lam Research / KLA",
        signal: "Etch, metrology, inspection, process control",
        crossCheck: "EUV 이후 패턴 전사와 결함 검출이 수율을 결정한다는 맥락 보강",
        output: "노광-식각-계측-수율을 하나의 흐름으로 보는 고급 공정 해석"
      }
    ]
  }
};

function getConfig(slug: string) {
  return configs[slug] ?? configs["dram-basics"];
}

export function FieldModeExplorer({ slug, sources }: FieldModeExplorerProps) {
  const config = getConfig(slug);
  const [tab, setTab] = useState<TabId>("risk");
  const [selectedRiskIndex, setSelectedRiskIndex] = useState(0);
  const [selectedDecisionIndex, setSelectedDecisionIndex] = useState(0);
  const selectedRisk = config.risks[selectedRiskIndex];
  const selectedDecision = config.decisions[selectedDecisionIndex];

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-berry/30 bg-berry/5">
      <div className="border-b border-berry/20 bg-bg0 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-berry/30 bg-berry/10 px-3 py-1 text-xs font-black text-berry">
            <Factory size={15} aria-hidden />
            고급 모드
          </span>
          <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-bold text-muted">
            현업 판단 훈련
          </span>
        </div>
        <h2 className="mt-3 text-2xl font-black leading-snug sm:text-3xl">
          {config.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          {config.description}
        </p>
      </div>

      <div className="grid gap-px bg-berry/20 lg:grid-cols-[230px_1fr]">
        <div className="bg-paper p-4">
          <div className="grid gap-2">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`focus-ring rounded-md border px-3 py-3 text-left transition ${
                  tab === item.id
                    ? "border-berry bg-berry text-bg0"
                    : "border-line bg-bg3 text-ink hover:border-berry hover:text-berry"
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
          {tab === "risk" ? (
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div>
                <p className="flex items-center gap-2 text-sm font-black text-berry">
                  <AlertTriangle size={17} aria-hidden />
                  실무 리스크를 먼저 분리합니다.
                </p>
                <div className="mt-4 grid gap-3">
                  {config.risks.map((risk, index) => (
                    <button
                      key={risk.label}
                      type="button"
                      onClick={() => setSelectedRiskIndex(index)}
                      className={`focus-ring border p-4 text-left transition ${
                        selectedRiskIndex === index
                          ? "border-berry bg-berry/10"
                          : "border-line bg-bg3 hover:border-berry"
                      }`}
                    >
                      <span className="text-xs font-black text-saffron">
                        Risk {index + 1}
                      </span>
                      <span className="mt-1 block text-lg font-black">
                        {risk.label}
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-muted">
                        {risk.trigger}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <RiskPanel risk={selectedRisk} />
              <div className="xl:col-span-2 grid gap-3 md:grid-cols-3">
                {config.operatingFrame.map((frame) => (
                  <div key={frame} className="border border-line bg-surface p-4">
                    <p className="text-xs font-black text-berry">운영 프레임</p>
                    <p className="mt-2 text-sm leading-7 text-muted">{frame}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {tab === "decision" ? (
            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.7fr)]">
              <div>
                <p className="flex items-center gap-2 text-sm font-black text-berry">
                  <Target size={17} aria-hidden />
                  공식 발표를 판단 문장으로 바꿉니다.
                </p>
                <div className="mt-4 grid gap-3">
                  {config.decisions.map((decision, index) => (
                    <button
                      key={decision.title}
                      type="button"
                      onClick={() => setSelectedDecisionIndex(index)}
                      className={`focus-ring border p-4 text-left transition ${
                        selectedDecisionIndex === index
                          ? "border-berry bg-berry/10"
                          : "border-line bg-bg3 hover:border-berry"
                      }`}
                    >
                      <span className="text-xs font-black text-saffron">
                        판단 상황 {index + 1}
                      </span>
                      <span className="mt-1 block text-lg font-black">
                        {decision.title}
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-muted">
                        {decision.situation}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <DecisionPanel decision={selectedDecision} />
            </div>
          ) : null}

          {tab === "evidence" ? (
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div>
                <p className="flex items-center gap-2 text-sm font-black text-berry">
                  <GitBranch size={17} aria-hidden />
                  한 출처로 끝내지 않고 교차 확인합니다.
                </p>
                <div className="mt-4 grid gap-3">
                  {config.evidencePaths.map((path) => (
                    <article key={path.source} className="border border-line bg-bg3 p-4">
                      <p className="text-xs font-black text-saffron">
                        {path.source}
                      </p>
                      <h3 className="mt-2 text-lg font-black">{path.signal}</h3>
                      <div className="mt-3 grid gap-2 md:grid-cols-[1fr_auto_1fr] md:items-center">
                        <p className="border border-line bg-paper p-3 text-sm leading-6 text-muted">
                          {path.crossCheck}
                        </p>
                        <span className="hidden text-berry md:block">
                          <Crosshair size={18} aria-hidden />
                        </span>
                        <p className="border border-berry/30 bg-berry/10 p-3 text-sm font-bold leading-6">
                          {path.output}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="border border-line bg-surface p-4">
                <p className="flex items-center gap-2 text-sm font-black text-berry">
                  <FileSearch size={17} aria-hidden />
                  현재 글의 공식 링크
                </p>
                <div className="mt-3 grid gap-2">
                  {sources.slice(0, 6).map((source) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring group border border-line bg-paper p-3 text-sm transition hover:border-berry"
                    >
                      <span className="flex items-start justify-between gap-3 font-black">
                        {source.title}
                        <ExternalLink
                          className="mt-0.5 shrink-0 text-muted group-hover:text-berry"
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

function RiskPanel({ risk }: { risk: Risk }) {
  return (
    <article className="border border-berry/35 bg-berry/10 p-5">
      <p className="flex items-center gap-2 text-sm font-black text-berry">
        <ShieldCheck size={17} aria-hidden />
        확대 리스크
      </p>
      <h3 className="mt-2 text-2xl font-black leading-snug">{risk.label}</h3>
      <div className="mt-4 grid gap-3">
        <FieldBlock label="발생 조건" text={risk.trigger} />
        <FieldBlock label="영향" text={risk.impact} />
        <FieldBlock label="현업에서 보는 법" text={risk.ownerView} />
      </div>
    </article>
  );
}

function DecisionPanel({ decision }: { decision: Decision }) {
  return (
    <article className="border border-berry/35 bg-berry/10 p-5">
      <p className="text-sm font-black text-berry">판단 확대</p>
      <h3 className="mt-2 text-2xl font-black leading-snug">{decision.title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{decision.situation}</p>
      <div className="mt-4 border border-line bg-paper p-4">
        <p className="text-xs font-black text-saffron">확인할 것</p>
        <ul className="mt-2 grid gap-2 text-sm leading-6 text-muted">
          {decision.watch.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mt-3 border border-berry/30 bg-bg0 p-4">
        <p className="text-xs font-black text-berry">판단 문장</p>
        <p className="mt-2 text-sm font-bold leading-7">{decision.judgment}</p>
      </div>
    </article>
  );
}

function FieldBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="border border-line bg-paper p-4">
      <p className="text-xs font-black text-saffron">{label}</p>
      <p className="mt-2 text-sm leading-7 text-muted">{text}</p>
    </div>
  );
}
