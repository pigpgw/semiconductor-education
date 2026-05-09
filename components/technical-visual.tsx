import type { ReactNode } from "react";

type LessonVisualProps = {
  slug?: string;
};

type VisualMode = "mini" | "detail";

type VisualConfig = {
  title: string;
  caption: string;
  highlights: {
    label: string;
    text: string;
  }[];
  visual: ReactNode;
};

function SignalLine({ className = "" }: { className?: string }) {
  return (
    <div className={`h-1 rounded-full bg-teal/70 ${className}`} aria-hidden />
  );
}

function VisualLabel({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-bg3 px-2 py-1 text-[11px] font-black uppercase tracking-[0.08em] text-muted">
      {children}
    </span>
  );
}

function TradeoffCard({
  label,
  gain,
  cost
}: {
  label: string;
  gain: string;
  cost: string;
}) {
  return (
    <div className="border border-line bg-paper p-3">
      <p className="text-xs font-black text-teal">{label}</p>
      <p className="mt-2 text-sm font-bold leading-6">{gain}</p>
      <p className="mt-1 text-xs leading-5 text-muted">{cost}</p>
    </div>
  );
}

function HighlightChip({ label, text }: { label: string; text: string }) {
  return (
    <div className="border border-line bg-bg3 p-3">
      <p className="text-xs font-black text-saffron">{label}</p>
      <p className="mt-1 text-sm font-bold leading-6 text-muted">{text}</p>
    </div>
  );
}

function MiniDramVisual() {
  return (
    <div className="grid h-full content-center gap-4" aria-label="DRAM 1T1C mini visual">
      <div className="grid grid-cols-[1fr_72px] items-center gap-4">
        <div className="grid gap-2">
          <SignalLine />
          <SignalLine className="w-3/4" />
          <SignalLine className="w-1/2 bg-saffron/70" />
        </div>
        <div className="grid aspect-square place-items-center border border-line bg-bg3">
          <div className="h-10 w-10 rounded-full border-4 border-teal bg-teal/10" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className={`h-8 border border-line ${
              index % 3 === 0 ? "bg-teal/10" : "bg-paper"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function DramCellVisual({ mode }: { mode: VisualMode }) {
  if (mode === "mini") {
    return <MiniDramVisual />;
  }

  return (
    <div className="grid gap-4" aria-label="DRAM 1T1C, refresh, bandwidth trade-off visual">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_230px]">
        <div className="border border-line bg-bg0 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <VisualLabel>Word line</VisualLabel>
            <VisualLabel>Bit line</VisualLabel>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_118px] sm:items-center">
            <div className="grid gap-3">
              {["row select", "sense path", "I/O path"].map((line, index) => (
                <div key={line} className="grid grid-cols-[80px_1fr] items-center gap-3">
                  <span className="text-xs font-bold text-muted">{line}</span>
                  <SignalLine
                    className={
                      index === 2 ? "w-3/5 bg-saffron/70" : index === 1 ? "w-4/5" : ""
                    }
                  />
                </div>
              ))}
            </div>
            <div className="grid place-items-center border border-teal/40 bg-teal/10 p-4">
              <div className="grid h-20 w-20 place-items-center rounded-full border-4 border-teal bg-bg3 text-center text-xs font-black leading-4">
                1T1C
                <span className="block font-bold text-muted">cell</span>
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-4 gap-2">
            {Array.from({ length: 16 }).map((_, index) => (
              <div
                key={index}
                className={`h-9 border border-line ${
                  index % 5 === 0 ? "bg-teal/15" : "bg-paper"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="grid gap-3">
          <TradeoffCard
            label="Cell area"
            gain="작게 만들수록 용량이 늘어납니다."
            cost="전하 여유가 줄어 sensing과 refresh 부담이 커집니다."
          />
          <TradeoffCard
            label="Refresh"
            gain="데이터 유지 신뢰성을 확보합니다."
            cost="전력과 대기 시간이 늘어날 수 있습니다."
          />
          <TradeoffCard
            label="I/O width"
            gain="대역폭을 키워 작업 메모리 병목을 줄입니다."
            cost="패키지, 보드, 전력 설계 부담이 커집니다."
          />
        </div>
      </div>
    </div>
  );
}

function MiniHbmVisual() {
  return (
    <div className="relative h-full min-h-[132px]" aria-label="HBM stack mini visual">
      <div className="absolute inset-x-6 bottom-0 h-10 border border-blue/30 bg-bg0" />
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="absolute left-1/2 h-9 w-[72%] -translate-x-1/2 border border-line bg-paper shadow-sm"
          style={{ bottom: `${48 + index * 24}px` }}
        >
          <div className="mx-auto h-full w-1/2 border-x border-teal/40 bg-teal/10" />
        </div>
      ))}
      <div className="absolute bottom-5 left-1/2 h-[168px] w-px -translate-x-1/2 bg-teal" />
      <div className="absolute bottom-5 left-[36%] h-[146px] w-px bg-teal/50" />
      <div className="absolute bottom-5 right-[36%] h-[146px] w-px bg-teal/50" />
    </div>
  );
}

function HbmStackVisual({ mode }: { mode: VisualMode }) {
  if (mode === "mini") {
    return <MiniHbmVisual />;
  }

  return (
    <div className="grid gap-4" aria-label="HBM stack, TSV, package trade-off visual">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_230px]">
        <div className="relative min-h-[310px] border border-line bg-bg0 p-4">
          <div className="absolute bottom-4 left-4 right-4 h-12 border border-blue/40 bg-blue/10">
            <span className="absolute left-3 top-3 text-xs font-black text-blue">
              Interposer / package
            </span>
          </div>
          <div className="absolute bottom-16 left-[18%] h-10 w-[64%] border border-saffron/40 bg-saffron/10">
            <span className="absolute left-3 top-2 text-xs font-black text-saffron">
              Base die
            </span>
          </div>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="absolute left-1/2 h-9 w-[70%] -translate-x-1/2 border border-line bg-paper"
              style={{ bottom: `${108 + index * 27}px` }}
            >
              <span className="absolute left-3 top-2 text-xs font-bold text-muted">
                DRAM die {index + 1}
              </span>
              <div className="mx-auto grid h-full w-24 grid-cols-3 gap-3">
                <span className="border-x border-teal/50 bg-teal/10" />
                <span className="border-x border-teal/50 bg-teal/10" />
                <span className="border-x border-teal/50 bg-teal/10" />
              </div>
            </div>
          ))}
          <div className="absolute bottom-[104px] left-1/2 h-[172px] w-px -translate-x-1/2 bg-teal" />
          <div className="absolute bottom-[104px] left-[40%] h-[156px] w-px bg-teal/60" />
          <div className="absolute bottom-[104px] right-[40%] h-[156px] w-px bg-teal/60" />
          <div className="absolute right-5 top-5 rounded-md border border-teal/30 bg-teal/10 px-2 py-1 text-xs font-black text-teal">
            TSV vertical paths
          </div>
        </div>
        <div className="grid gap-3">
          <TradeoffCard
            label="Bandwidth"
            gain="연산기 가까이에 넓은 데이터 길을 둡니다."
            cost="용량 확장보다 고대역폭 집중에 최적화됩니다."
          />
          <TradeoffCard
            label="Thermal"
            gain="짧은 연결로 전력 효율을 개선할 수 있습니다."
            cost="쌓인 다이의 열 방출과 warpage 제어가 어려워집니다."
          />
          <TradeoffCard
            label="Yield"
            gain="AI 패키지 성능을 크게 끌어올립니다."
            cost="다이, TSV, 패키지, 고객 검증이 모두 수율 변수입니다."
          />
        </div>
      </div>
    </div>
  );
}

function MiniEuvVisual() {
  return (
    <div className="grid h-full min-h-[132px] content-center gap-5" aria-label="EUV beam mini visual">
      <div className="mx-auto h-10 w-28 border border-blue/30 bg-bg0" />
      <div className="mx-auto grid w-48 grid-cols-5 gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-20 skew-x-[-16deg] bg-saffron/20">
            <div className="mx-auto h-full w-1 bg-saffron/70" />
          </div>
        ))}
      </div>
      <div className="border border-line bg-paper p-3">
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className={`h-3 ${index % 2 === 0 ? "bg-teal" : "bg-line"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function EuvBeamVisual({ mode }: { mode: VisualMode }) {
  if (mode === "mini") {
    return <MiniEuvVisual />;
  }

  return (
    <div className="grid gap-4" aria-label="DUV multi-patterning and EUV process trade-off visual">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_230px]">
        <div className="grid gap-3 border border-line bg-bg0 p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="border border-line bg-paper p-3">
              <p className="text-xs font-black text-saffron">DUV multi-patterning</p>
              <div className="mt-3 grid gap-2">
                {["Mask 1", "Mask 2", "Mask 3"].map((label, index) => (
                  <div key={label} className="grid grid-cols-[64px_1fr] items-center gap-2">
                    <span className="text-xs font-bold text-muted">{label}</span>
                    <div className="grid grid-cols-8 gap-1">
                      {Array.from({ length: 8 }).map((_, cellIndex) => (
                        <span
                          key={cellIndex}
                          className={`h-5 ${
                            (cellIndex + index) % 3 === 0 ? "bg-saffron/70" : "bg-line"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs leading-5 text-muted">
                반복 노광은 미세화를 돕지만 overlay 오차와 공정 시간이 누적됩니다.
              </p>
            </div>
            <div className="border border-teal/40 bg-teal/10 p-3">
              <p className="text-xs font-black text-teal">EUV selected layers</p>
              <div className="mt-3 grid gap-3">
                <div className="mx-auto h-10 w-28 border border-blue/30 bg-bg0" />
                <div className="mx-auto grid w-full max-w-[220px] grid-cols-5 gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="h-20 skew-x-[-16deg] bg-teal/20">
                      <div className="mx-auto h-full w-1 bg-teal" />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-10 gap-1">
                  {Array.from({ length: 30 }).map((_, index) => (
                    <span
                      key={index}
                      className={`h-3 ${index % 2 === 0 ? "bg-teal" : "bg-bg3"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-muted">
                더 짧은 파장은 일부 레이어의 패터닝 복잡도를 낮출 수 있습니다.
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          <TradeoffCard
            label="Overlay"
            gain="공정 단계를 줄이면 정렬 오차 누적을 줄일 여지가 있습니다."
            cost="EUV도 마스크와 공정 조건 최적화가 필요합니다."
          />
          <TradeoffCard
            label="Defect"
            gain="미세 패턴 구현 가능성을 높입니다."
            cost="결함, resist, 검사 기준을 함께 안정화해야 합니다."
          />
          <TradeoffCard
            label="Throughput"
            gain="일부 레이어에서는 생산 흐름을 단순화할 수 있습니다."
            cost="장비 처리량과 가동률이 양산성의 핵심 변수입니다."
          />
        </div>
      </div>
    </div>
  );
}

function getVisualConfig(slug: string | undefined, mode: VisualMode): VisualConfig {
  if (slug === "hbm-ai-memory") {
    return {
      title: "HBM은 적층, TSV, 패키징을 한 번에 봐야 AI 병목을 설명할 수 있습니다.",
      caption:
        "대역폭을 키우는 구조가 곧 열, 수율, 고객 검증의 부담으로 이어지는 흐름을 함께 보여 줍니다.",
      highlights: [
        { label: "구조", text: "DRAM die + TSV + base die" },
        { label: "병목", text: "GPU와 메모리 사이 데이터 이동" },
        { label: "실무 판단", text: "열, 수율, 패키지 신뢰성" }
      ],
      visual: <HbmStackVisual mode={mode} />
    };
  }

  if (slug === "euv-dram-scaling") {
    return {
      title: "EUV는 짧은 파장 하나가 아니라 패터닝 복잡도와 양산성의 문제입니다.",
      caption:
        "DUV multi-patterning과 EUV 적용 레이어를 비교해 overlay, defect, throughput이 왜 함께 나오는지 연결합니다.",
      highlights: [
        { label: "구조", text: "DUV 반복 노광 vs EUV 선택 적용" },
        { label: "병목", text: "overlay, defect, process time" },
        { label: "실무 판단", text: "수율과 장비 처리량" }
      ],
      visual: <EuvBeamVisual mode={mode} />
    };
  }

  return {
    title: "DRAM은 작은 1T1C 셀, refresh, I/O 대역폭의 균형으로 설명해야 합니다.",
    caption:
      "셀을 작게 만드는 선택이 용량을 늘리지만 전하 유지, sensing, refresh, 패키지 부담으로 이어지는 흐름을 보여 줍니다.",
    highlights: [
      { label: "구조", text: "1 transistor + 1 capacitor" },
      { label: "병목", text: "전하 유지와 sensing margin" },
      { label: "실무 판단", text: "면적, 전력, 대역폭 trade-off" }
    ],
    visual: <DramCellVisual mode={mode} />
  };
}

export function LessonMiniVisual({ slug }: LessonVisualProps) {
  const config = getVisualConfig(slug, "mini");

  return (
    <div className="h-36 overflow-hidden rounded-xl border border-line bg-surface p-3">
      {config.visual}
    </div>
  );
}

export function LessonTechnicalVisual({ slug }: LessonVisualProps) {
  const config = getVisualConfig(slug, "detail");

  return (
    <figure className="mt-8 rounded-2xl border border-line bg-paper p-5">
      <div className="grid gap-5 md:grid-cols-[minmax(0,0.95fr)_minmax(300px,0.85fr)] md:items-center">
        <div>
          <p className="text-sm font-black text-teal">Visual first</p>
          <h2 className="mt-2 text-2xl font-black leading-tight">{config.title}</h2>
          <figcaption className="mt-3 leading-7 text-muted">
            {config.caption}
          </figcaption>
          <div className="mt-5 grid gap-2 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            {config.highlights.map((highlight) => (
              <HighlightChip
                key={highlight.label}
                label={highlight.label}
                text={highlight.text}
              />
            ))}
          </div>
        </div>
        <div className="min-h-[280px] overflow-hidden border border-line bg-surface p-4">
          {config.visual}
        </div>
      </div>
      <details className="mt-4 border border-line bg-surface">
        <summary className="focus-ring flex min-h-12 cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm font-black text-teal">
          그림을 더 크게 펼쳐서 보기
          <span className="rounded-full border border-teal/30 bg-teal/10 px-2 py-1 text-[11px] text-teal">
            click
          </span>
        </summary>
        <div className="border-t border-line bg-bg0 p-4">
          <div className="min-h-[420px] overflow-hidden border border-line bg-surface p-4">
            {config.visual}
          </div>
          <p className="mt-3 text-sm leading-7 text-muted">
            확대 뷰에서는 구조를 먼저 보고, 아래 하이라이트의 병목과 실무 판단을
            다시 연결해 읽습니다.
          </p>
        </div>
      </details>
    </figure>
  );
}
