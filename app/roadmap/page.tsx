import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  contentQualityGate,
  depthMatrix,
  portfolioArtifacts
} from "@/lib/curriculum";
import { roadmap } from "@/lib/roadmap";

export const metadata: Metadata = {
  title: "학습 로드맵",
  description: "기초부터 AI 메모리까지 이어지는 반도체 학습 로드맵"
};

export default function RoadmapPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-normal text-teal">
          Roadmap
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
          반도체를 어디서 시작하고 어디까지 깊게 볼지 정리합니다.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          첫 MVP는 메모리 반도체를 중심축으로 잡되, Big 10 공식 출처를 따라
          기초 개념에서 DRAM, NAND, HBM, 공정, 장비, 수율, 패키징,
          AI 인프라까지 이어지는 흐름입니다.
        </p>
      </section>

      <section className="mt-10 grid gap-5">
        {roadmap.map((stage) => (
          <article
            key={stage.title}
            className="grid gap-5 border border-line bg-paper p-5 md:grid-cols-[220px_1fr]"
          >
            <div>
              <p className="text-sm font-black text-saffron">
                STEP {stage.step}
              </p>
              <h2 className="mt-2 text-xl font-black">{stage.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {stage.description}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {stage.items.map((item) => (
                <div key={item} className="flex gap-3 border border-line p-4">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-teal"
                    size={18}
                    aria-hidden
                  />
                  <span className="text-sm font-semibold leading-6">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-normal text-teal">
            Depth matrix
          </p>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            같은 주제를 세 깊이로 다시 읽게 설계합니다.
          </h2>
          <p className="mt-3 leading-8 text-muted">
            기초, 중급, 심화는 서로 다른 교재가 아닙니다. 한 주제를 큰 그림,
            구조, 트레이드오프, 출처 검증 순서로 깊게 파고드는 읽기 방식입니다.
          </p>
        </div>
        <div className="mt-6 overflow-x-auto border border-line bg-paper">
          <table className="min-w-[760px] w-full border-collapse text-left text-sm">
            <thead className="bg-surface">
              <tr>
                <th className="border-b border-line p-4 font-black">층위</th>
                <th className="border-b border-line p-4 font-black">기초</th>
                <th className="border-b border-line p-4 font-black">중급</th>
                <th className="border-b border-line p-4 font-black">심화</th>
              </tr>
            </thead>
            <tbody>
              {depthMatrix.map((row) => (
                <tr key={row.layer} className="align-top">
                  <th className="border-t border-line p-4 font-black text-ink">
                    {row.layer}
                  </th>
                  <td className="border-t border-line p-4 leading-6 text-muted">
                    {row.basic}
                  </td>
                  <td className="border-t border-line p-4 leading-6 text-muted">
                    {row.applied}
                  </td>
                  <td className="border-t border-line p-4 leading-6 text-muted">
                    {row.field}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-2">
        <article className="border border-line bg-paper p-5">
          <h2 className="text-2xl font-black">포트폴리오 증거 설계</h2>
          <div className="mt-5 grid gap-4">
            {portfolioArtifacts.map((artifact) => (
              <div key={artifact.title} className="border border-line bg-surface p-4">
                <h3 className="font-black">{artifact.title}</h3>
                <p className="mt-2 text-sm font-bold text-teal">
                  {artifact.evidence}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {artifact.appeal}
                </p>
              </div>
            ))}
          </div>
        </article>
        <article className="border border-line bg-paper p-5">
          <h2 className="text-2xl font-black">콘텐츠 품질 게이트</h2>
          <ul className="mt-5 grid gap-3">
            {contentQualityGate.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-teal"
                  size={18}
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-10 rounded-2xl border border-line bg-bg0 p-6 text-white">
        <h2 className="text-2xl font-black">MVP에서는 어디까지 완성하나요?</h2>
        <p className="mt-3 max-w-3xl leading-8 text-white/80">
          전체 지도를 먼저 보여주고, DRAM/HBM/EUV 3편만 깊게 완성합니다.
          얇은 글을 많이 만드는 대신, 공식 출처와 현업 키워드가 살아 있는
          대표 글로 신뢰를 만듭니다.
        </p>
        <Link
          href="/learn"
          className="focus-ring mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-blue px-4 text-sm font-bold text-bg0 transition hover:bg-teal"
        >
          핵심 3편 읽기 <ArrowRight size={17} aria-hidden />
        </Link>
      </section>
    </main>
  );
}
