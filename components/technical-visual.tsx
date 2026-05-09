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

function MiniNandVisual() {
  return (
    <div className="grid h-full content-center gap-3" aria-label="3D NAND stack mini visual">
      <div className="mx-auto grid w-28 gap-1">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className={`h-3 border border-line ${
              index % 2 === 0 ? "bg-teal/15" : "bg-blue/10"
            }`}
          />
        ))}
      </div>
      <div className="mx-auto grid w-44 grid-cols-8 gap-1">
        {Array.from({ length: 24 }).map((_, index) => (
          <span
            key={index}
            className={`h-4 border border-line ${
              index % 5 === 0 ? "bg-saffron/20" : "bg-paper"
            }`}
          />
        ))}
      </div>
      <div className="grid grid-cols-[1fr_48px] items-center gap-3">
        <SignalLine className="bg-saffron/70" />
        <div className="grid h-10 place-items-center border border-teal/40 bg-teal/10 text-[10px] font-black text-teal">
          SSD
        </div>
      </div>
    </div>
  );
}

function NandStorageVisual({ mode }: { mode: VisualMode }) {
  if (mode === "mini") {
    return <MiniNandVisual />;
  }

  return (
    <div className="grid gap-4" aria-label="NAND stack, SSD controller, endurance trade-off visual">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_230px]">
        <div className="grid gap-4 border border-line bg-bg0 p-4">
          <div className="grid gap-4 md:grid-cols-[150px_1fr] md:items-center">
            <div className="grid gap-1">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className={`h-4 border border-line ${
                    index % 3 === 0 ? "bg-teal/15" : "bg-paper"
                  }`}
                >
                  {index === 1 ? (
                    <span className="ml-2 text-[10px] font-black text-teal">
                      3D NAND layers
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="grid gap-3">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 48 }).map((_, index) => (
                  <span
                    key={index}
                    className={`h-5 border border-line ${
                      index % 7 === 0 ? "bg-saffron/25" : "bg-bg3"
                    }`}
                  />
                ))}
              </div>
              <div className="grid gap-2 sm:grid-cols-[1fr_150px] sm:items-center">
                <SignalLine className="bg-saffron/70" />
                <div className="border border-blue/40 bg-blue/10 p-3 text-center text-xs font-black text-blue">
                  SSD controller
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <VisualLabel>ECC</VisualLabel>
                <VisualLabel>Wear leveling</VisualLabel>
                <VisualLabel>NVMe/SATA</VisualLabel>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          <TradeoffCard
            label="Capacity"
            gain="층 수와 셀당 비트 수를 늘려 저장 밀도를 키웁니다."
            cost="공정 균일도와 셀 상태 구분이 더 어려워집니다."
          />
          <TradeoffCard
            label="Controller"
            gain="NAND를 실제 SSD 제품처럼 안정적으로 관리합니다."
            cost="오류 정정, 주소 매핑, 캐싱 정책이 성능과 수명을 좌우합니다."
          />
          <TradeoffCard
            label="Endurance"
            gain="많은 데이터를 저렴하게 오래 보관할 수 있습니다."
            cost="쓰기 수명과 workload 조건을 함께 확인해야 합니다."
          />
        </div>
      </div>
    </div>
  );
}

function MiniDramFamilyVisual() {
  return (
    <div className="grid h-full content-center gap-3" aria-label="DRAM family comparison mini visual">
      <div className="grid grid-cols-4 gap-2">
        {["DDR", "LP", "GD", "HBM"].map((label, index) => (
          <div
            key={label}
            className={`grid h-14 place-items-center border text-[10px] font-black ${
              index === 3
                ? "border-teal/40 bg-teal/15 text-teal"
                : index === 1
                  ? "border-saffron/40 bg-saffron/15 text-saffron"
                  : "border-line bg-paper text-muted"
            }`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[48px_1fr_48px] items-center gap-2">
        <div className="grid h-10 place-items-center border border-line bg-bg3 text-[10px] font-black text-muted">
          CPU
        </div>
        <SignalLine />
        <div className="grid h-10 place-items-center border border-blue/40 bg-blue/10 text-[10px] font-black text-blue">
          GPU
        </div>
      </div>
      <div className="grid grid-cols-8 gap-1">
        {Array.from({ length: 24 }).map((_, index) => (
          <span
            key={index}
            className={`h-3 border border-line ${
              index % 4 === 0 ? "bg-teal/20" : "bg-bg3"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function DramFamilyVisual({ mode }: { mode: VisualMode }) {
  if (mode === "mini") {
    return <MiniDramFamilyVisual />;
  }

  return (
    <div className="grid gap-4" aria-label="DDR, LPDDR, GDDR, HBM system placement visual">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_230px]">
        <div className="grid gap-4 border border-line bg-bg0 p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="border border-line bg-paper p-3">
              <p className="text-xs font-black text-teal">CPU system memory</p>
              <div className="mt-3 grid grid-cols-[64px_1fr] items-center gap-3">
                <div className="grid h-14 place-items-center border border-blue/40 bg-blue/10 text-xs font-black text-blue">
                  CPU
                </div>
                <div className="grid gap-2">
                  <SignalLine />
                  <div className="grid grid-cols-3 gap-2">
                    {["UDIMM", "SODIMM", "RDIMM"].map((label) => (
                      <div key={label} className="border border-line bg-bg3 p-2 text-center text-[10px] font-black text-muted">
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-saffron/35 bg-saffron/10 p-3">
              <p className="text-xs font-black text-saffron">Low-power platform</p>
              <div className="mt-3 grid grid-cols-[74px_1fr] items-center gap-3">
                <div className="grid h-16 place-items-center border border-line bg-bg3 text-xs font-black text-muted">
                  SoC
                </div>
                <div className="grid gap-2">
                  {["LPDDR", "thin package", "power modes"].map((label) => (
                    <div key={label} className="rounded-md border border-saffron/25 bg-paper px-2 py-1 text-[11px] font-bold text-muted">
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border border-line bg-paper p-3">
              <p className="text-xs font-black text-blue">Graphics board</p>
              <div className="mt-3 grid grid-cols-[74px_1fr] items-center gap-3">
                <div className="grid h-16 place-items-center border border-blue/40 bg-blue/10 text-xs font-black text-blue">
                  GPU
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-7 border border-line bg-bg3" />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-[11px] font-bold text-muted">GDDR around GPU</p>
            </div>
            <div className="border border-teal/35 bg-teal/10 p-3">
              <p className="text-xs font-black text-teal">AI package</p>
              <div className="mt-3 grid grid-cols-[84px_1fr] items-center gap-3">
                <div className="grid h-16 place-items-center border border-blue/40 bg-blue/10 text-xs font-black text-blue">
                  Accelerator
                </div>
                <div className="grid gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="h-4 border border-teal/30 bg-paper" />
                  ))}
                  <div className="h-1 bg-teal" />
                </div>
              </div>
              <p className="mt-2 text-[11px] font-bold text-muted">
                HBM stack + TSV + interposer
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          <TradeoffCard
            label="DDR"
            gain="범용 시스템 메모리와 서버 확장성에 강합니다."
            cost="최고 대역폭보다 호환성, 용량, 안정성이 중요합니다."
          />
          <TradeoffCard
            label="LPDDR / GDDR"
            gain="저전력 또는 GPU 주변 대역폭에 맞춰 최적화됩니다."
            cost="패키지 위치와 전력/열 조건이 제품 선택을 제한합니다."
          />
          <TradeoffCard
            label="HBM"
            gain="AI/HPC의 데이터 이동 병목을 크게 줄일 수 있습니다."
            cost="TSV, 적층, interposer, 수율과 고객 검증 부담이 큽니다."
          />
        </div>
      </div>
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
  if (slug === "dram-family-comparison") {
    return {
      title: "DRAM 제품군은 같은 셀에서 출발하지만 시스템 위치와 병목이 다릅니다.",
      caption:
        "CPU 주메모리, 모바일 SoC, GPU 보드, AI 패키지 안에서 메모리가 어디에 붙는지 비교하면 DDR, LPDDR, GDDR, HBM의 차이가 보입니다.",
      highlights: [
        { label: "구조", text: "DDR module / LPDDR package / GDDR board / HBM stack" },
        { label: "병목", text: "전력, 대역폭, 폼팩터, 패키징" },
        { label: "실무 판단", text: "시스템 위치와 고객 검증" }
      ],
      visual: <DramFamilyVisual mode={mode} />
    };
  }

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

  if (slug === "nand-ssd-storage") {
    return {
      title: "NAND는 셀 적층, SSD 컨트롤러, 오류 정정을 함께 봐야 저장장치가 됩니다.",
      caption:
        "전원이 꺼져도 남는 메모리라는 큰 장점 뒤에 3D 적층, 셀당 비트 수, 내구성, 컨트롤러 관리가 함께 따라옵니다.",
      highlights: [
        { label: "구조", text: "3D NAND layers + cell array" },
        { label: "병목", text: "오류 정정, 내구성, 주소 관리" },
        { label: "실무 판단", text: "용량, 전력, 수율, workload" }
      ],
      visual: <NandStorageVisual mode={mode} />
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
    <figure className="mt-8 grid gap-5 rounded-2xl border border-line bg-paper p-5 md:grid-cols-[minmax(0,0.95fr)_minmax(300px,0.85fr)] md:items-center">
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
    </figure>
  );
}
