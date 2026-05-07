import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PenLine } from "lucide-react";
import { PracticeDrill } from "@/components/practice-drill";
import { practiceSets } from "@/lib/practice";

export const metadata: Metadata = {
  title: "복습 훈련",
  description:
    "반도체 개념을 기초, 중급, 심화 레벨별 질문과 실무 시나리오로 복습합니다."
};

export default function PracticePage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-normal text-teal">
          Practice
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
          읽은 내용을 말로 설명하고, 실무 기준으로 다시 확인합니다.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          반도체 공부는 글을 읽는 것에서 끝나면 오래 남지 않습니다. 질문에
          답하고, 힌트를 보고, 실무 포인트까지 확인하면서 자기 설명 능력을
          키웁니다.
        </p>
      </section>

      <section className="mt-8 border border-line bg-paper p-5">
        <div className="flex items-center gap-3">
          <PenLine className="text-teal" size={22} aria-hidden />
          <h2 className="text-xl font-black">복습 방법</h2>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <article className="border border-line bg-surface p-4">
            <h3 className="font-black">1. 먼저 말해보기</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              답을 열기 전에 30초 동안 자기 말로 설명합니다.
            </p>
          </article>
          <article className="border border-line bg-surface p-4">
            <h3 className="font-black">2. 실무 포인트 확인</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              단어 정의가 아니라 실제 병목과 제약까지 연결됐는지 봅니다.
            </p>
          </article>
          <article className="border border-line bg-surface p-4">
            <h3 className="font-black">3. 관련 글로 되돌아가기</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              틀린 질문은 관련 교재로 돌아가 한 번 더 읽습니다.
            </p>
          </article>
        </div>
      </section>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="레벨별 복습 이동">
        {practiceSets.map((set) => (
          <a
            key={set.levelId}
            href={`#${set.levelId}`}
            className="focus-ring inline-flex min-h-10 items-center rounded-md border border-line bg-paper px-3 text-sm font-bold hover:border-teal hover:text-teal"
          >
            {set.levelLabel}
          </a>
        ))}
      </nav>

      <div className="mt-10">
        <PracticeDrill sets={practiceSets} />
      </div>

      <section className="mt-10 rounded-2xl border border-line bg-bg0 p-6 text-white">
        <h2 className="text-2xl font-black">복습 후에는 글로 돌아가세요.</h2>
        <p className="mt-3 max-w-3xl leading-8 text-white/80">
          질문에 답하지 못한 부분은 실력이 부족하다는 뜻이 아니라, 다시 읽을
          위치가 분명해졌다는 뜻입니다. 교재, 용어 사전, 로드맵을 오가며 같은
          개념을 여러 깊이로 반복합니다.
        </p>
        <Link
          href="/learn"
          className="focus-ring mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-blue px-4 text-sm font-bold text-bg0 transition hover:bg-teal"
        >
          교재로 돌아가기 <ArrowRight size={17} aria-hidden />
        </Link>
      </section>
    </main>
  );
}
