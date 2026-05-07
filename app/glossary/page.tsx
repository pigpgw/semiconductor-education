import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlossaryBrowser } from "@/components/glossary-browser";
import { glossary, glossaryCategories } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "용어 사전",
  description:
    "반도체 기초부터 실무 레벨까지 이어지는 핵심 용어를 쉬운 설명과 현업 사용 맥락으로 정리합니다."
};

export default function GlossaryPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-normal text-teal">
          Glossary
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
          모르는 용어에서 멈추지 않도록 쉬운 말과 실무 맥락을 같이 둡니다.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          단어 뜻만 외우면 금방 막힙니다. 그래서 각 용어는 초보자 설명,
          현업에서 쓰이는 의미, 같이 보면 좋은 관련어를 함께 제공합니다.
        </p>
      </section>

      <GlossaryBrowser terms={glossary} categories={glossaryCategories} />

      <section className="mt-10 rounded-2xl border border-line bg-bg0 p-6 text-white">
        <h2 className="text-2xl font-black">용어를 읽고 바로 글로 돌아가세요.</h2>
        <p className="mt-3 max-w-3xl leading-8 text-white/80">
          용어 사전은 별도 암기장이 아니라 교재를 읽는 보조 장치입니다.
          단어 하나를 이해했다면 DRAM, HBM, EUV 글에서 그 용어가 어떤
          문제를 해결하는지 다시 확인하는 것이 좋습니다.
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
