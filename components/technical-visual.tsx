type LessonVisualProps = {
  slug?: string;
};

function SignalLine({ className = "" }: { className?: string }) {
  return (
    <div className={`h-1 rounded-full bg-teal/70 ${className}`} aria-hidden />
  );
}

function DramCellVisual() {
  return (
    <div className="grid h-full content-center gap-4" aria-hidden>
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

function HbmStackVisual() {
  return (
    <div className="relative h-full min-h-[220px]" aria-hidden>
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

function EuvBeamVisual() {
  return (
    <div className="grid h-full min-h-[220px] content-center gap-5" aria-hidden>
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

export function LessonMiniVisual({ slug }: LessonVisualProps) {
  const visual =
    slug === "hbm-ai-memory" ? (
      <HbmStackVisual />
    ) : slug === "euv-dram-scaling" ? (
      <EuvBeamVisual />
    ) : (
      <DramCellVisual />
    );

  return (
    <div className="h-36 overflow-hidden rounded-xl border border-line bg-surface p-3">
      {visual}
    </div>
  );
}

export function LessonTechnicalVisual({ slug }: LessonVisualProps) {
  const config =
    slug === "hbm-ai-memory"
      ? {
          title: "HBM은 여러 DRAM 다이를 쌓고 넓게 연결해 병목을 줄입니다.",
          caption: "적층 구조, TSV, 열 방출, 수율을 함께 봐야 합니다.",
          visual: <HbmStackVisual />
        }
      : slug === "euv-dram-scaling"
        ? {
            title: "EUV는 더 미세한 패턴을 더 적은 복잡도로 만들기 위한 공정입니다.",
            caption: "짧은 파장만이 아니라 생산성, 결함, 수율까지 연결됩니다.",
            visual: <EuvBeamVisual />
          }
        : {
            title: "DRAM은 작은 셀에 전하를 저장하고 주기적으로 유지합니다.",
            caption: "1T1C, refresh, 대역폭이 작업 메모리의 핵심입니다.",
            visual: <DramCellVisual />
          };

  return (
    <figure className="mt-8 grid gap-5 rounded-2xl border border-line bg-paper p-5 md:grid-cols-[minmax(0,0.95fr)_minmax(260px,0.75fr)] md:items-center">
      <div>
        <p className="text-sm font-black text-teal">Visual first</p>
        <h2 className="mt-2 text-2xl font-black leading-tight">{config.title}</h2>
        <figcaption className="mt-3 leading-7 text-muted">
          {config.caption}
        </figcaption>
      </div>
      <div className="min-h-[240px] border border-line bg-surface p-4">
        {config.visual}
      </div>
    </figure>
  );
}
