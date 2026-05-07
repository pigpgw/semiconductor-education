import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookMarked } from "lucide-react";
import { DifficultyBadge } from "@/components/difficulty-badge";
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

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="용어 카테고리">
        {glossaryCategories.map((category) => (
          <a
            key={category}
            href={`#${category}`}
            className="focus-ring inline-flex min-h-10 items-center rounded-md border border-line bg-paper px-3 text-sm font-bold hover:border-teal hover:text-teal"
          >
            {category}
          </a>
        ))}
      </nav>

      <div className="mt-10 grid gap-10">
        {glossaryCategories.map((category) => {
          const terms = glossary.filter((item) => item.category === category);

          return (
            <section key={category} id={category}>
              <div className="flex items-center gap-3 border-b border-line pb-3">
                <BookMarked className="text-teal" size={22} aria-hidden />
                <h2 className="text-2xl font-black">{category}</h2>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {terms.map((item) => (
                  <article key={item.term} className="border border-line bg-paper p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <DifficultyBadge level={item.level} />
                      <span className="rounded-full border border-line px-3 py-1 text-xs font-bold text-muted">
                        {item.english}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-black">{item.term}</h3>
                    <p className="mt-3 leading-7 text-muted">{item.simple}</p>
                    <div className="mt-4 border-t border-line pt-4">
                      <h4 className="text-sm font-black">실무에서는</h4>
                      <p className="mt-2 text-sm leading-7 text-muted">
                        {item.fieldUse}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.related.map((related) => (
                        <span
                          key={related}
                          className="rounded-full bg-surface px-3 py-1 text-xs font-bold text-muted"
                        >
                          {related}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-10 border border-line bg-ink p-6 text-white">
        <h2 className="text-2xl font-black">용어를 읽고 바로 글로 돌아가세요.</h2>
        <p className="mt-3 max-w-3xl leading-8 text-white/80">
          용어 사전은 별도 암기장이 아니라 교재를 읽는 보조 장치입니다.
          단어 하나를 이해했다면 DRAM, HBM, EUV 글에서 그 용어가 어떤
          문제를 해결하는지 다시 확인하는 것이 좋습니다.
        </p>
        <Link
          href="/learn"
          className="focus-ring mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-4 text-sm font-bold text-ink transition hover:bg-teal hover:text-white"
        >
          교재로 돌아가기 <ArrowRight size={17} aria-hidden />
        </Link>
      </section>
    </main>
  );
}
