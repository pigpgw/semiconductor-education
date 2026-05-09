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
import {
  appliedModeTabs,
  getAppliedModeConfig,
  type AppliedTabId,
  type LessonSource
} from "@/lib/lesson-interactions";

type AppliedModeExplorerProps = {
  slug: string;
  sources: LessonSource[];
};

export function AppliedModeExplorer({ slug, sources }: AppliedModeExplorerProps) {
  const config = getAppliedModeConfig(slug);
  const [tab, setTab] = useState<AppliedTabId>("compare");
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
            {appliedModeTabs.map((item) => (
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
