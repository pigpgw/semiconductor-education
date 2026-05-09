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
import {
  fieldModeTabs,
  getFieldModeConfig,
  type FieldDecision,
  type FieldRisk,
  type FieldTabId,
  type LessonSource
} from "@/lib/lesson-interactions";

type FieldModeExplorerProps = {
  slug: string;
  sources: LessonSource[];
};

export function FieldModeExplorer({ slug, sources }: FieldModeExplorerProps) {
  const config = getFieldModeConfig(slug);
  const [tab, setTab] = useState<FieldTabId>("risk");
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
            {fieldModeTabs.map((item) => (
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
                        FieldRisk {index + 1}
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

function RiskPanel({ risk }: { risk: FieldRisk }) {
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

function DecisionPanel({ decision }: { decision: FieldDecision }) {
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
