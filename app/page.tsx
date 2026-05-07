import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Github,
  Layers3,
  Route,
  SlidersHorizontal
} from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { HomeTechnicalVisual } from "@/components/technical-visual";
import { getAllLessons } from "@/lib/content";
import { levels } from "@/lib/levels";

const principles = [
  {
    title: "쉬운 문장",
    body: "처음 보는 사람도 핵심을 잡도록 한 문단에 하나의 판단만 담습니다."
  },
  {
    title: "현업 키워드",
    body: "DRAM, HBM, TSV, EUV처럼 실제 산업 문맥에서 쓰이는 말을 피하지 않습니다."
  },
  {
    title: "공식 출처",
    body: "삼성반도체와 SK하이닉스 공식 자료를 우선 근거로 연결합니다."
  },
  {
    title: "로그인 없음",
    body: "계정 생성 없이 바로 읽고, 레벨 선택은 현재 브라우저에만 저장합니다."
  }
];

export default function HomePage() {
  const lessons = getAllLessons();

  return (
    <main>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:py-20 lg:px-8">
          <div>
            <p className="mb-4 inline-flex min-h-9 items-center rounded-full border border-line px-3 text-sm font-semibold text-teal">
              Memory-first semiconductor textbook
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-5xl md:text-6xl">
              반도체를 처음부터, 현업 키워드까지 읽히게 설명합니다.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              초보자는 큰 흐름을 잡고, 포트폴리오를 보는 사람은 반도체 지식의
              구조화 능력을 확인할 수 있는 온라인 교재입니다. 기초, 중급,
              심화 중 자기 레벨을 고르고 같은 주제를 다른 깊이로 읽습니다.
              로그인 없이 바로 시작합니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/level"
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-bold text-white transition hover:bg-teal"
              >
                내 레벨 찾기 <SlidersHorizontal size={18} aria-hidden />
              </Link>
              <Link
                href="/learn"
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-line bg-paper px-5 text-sm font-bold text-ink transition hover:border-teal hover:text-teal"
              >
                교재 읽기 <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                href="/roadmap"
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-line bg-paper px-5 text-sm font-bold text-ink transition hover:border-teal hover:text-teal"
              >
                로드맵 보기 <Route size={18} aria-hidden />
              </Link>
              <a
                href="https://github.com/pigpgw/semiconductor-education"
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-line bg-paper px-5 text-sm font-bold text-ink transition hover:border-teal hover:text-teal"
              >
                GitHub <Github size={18} aria-hidden />
              </a>
            </div>
          </div>

          <div className="grid content-start gap-4">
            <HomeTechnicalVisual />
            <div className="border border-line bg-surface p-5">
              <div className="flex items-center gap-3">
                <BookOpen className="text-teal" size={22} aria-hidden />
                <h2 className="text-base font-extrabold">MVP 학습 구성</h2>
              </div>
              <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="border border-line bg-paper p-4">
                  <dt className="text-2xl font-black">3</dt>
                  <dd className="mt-1 text-xs font-semibold text-muted">
                    완성 글
                  </dd>
                </div>
                <div className="border border-line bg-paper p-4">
                  <dt className="text-2xl font-black">6</dt>
                  <dd className="mt-1 text-xs font-semibold text-muted">
                    로드맵 단계
                  </dd>
                </div>
                <div className="border border-line bg-paper p-4">
                  <dt className="text-2xl font-black">MDX</dt>
                  <dd className="mt-1 text-xs font-semibold text-muted">
                    콘텐츠
                  </dd>
                </div>
              </dl>
            </div>
            <div className="border border-line bg-paper p-5">
              <div className="flex items-center gap-3">
                <Layers3 className="text-saffron" size={22} aria-hidden />
                <h2 className="text-base font-extrabold">첫 공개 주제</h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm font-semibold text-muted">
                <li>DRAM: 셀 구조, 휘발성, refresh</li>
                <li>HBM: TSV, 적층, memory wall</li>
                <li>EUV: 파장, 패터닝, 미세화 한계</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-teal">
              Level-based learning
            </p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              3단계로 깊이를 조절합니다.
            </h2>
          </div>
          <Link
            href="/level"
            className="focus-ring inline-flex min-h-11 items-center gap-2 self-start rounded-md border border-line bg-paper px-4 text-sm font-bold hover:border-teal hover:text-teal sm:self-auto"
          >
            진단하기 <ArrowRight size={17} aria-hidden />
          </Link>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {levels.map((level) => (
            <article key={level.id} className="border border-line bg-paper p-5">
              <p className="text-sm font-black text-saffron">{level.badge}</p>
              <h3 className="mt-2 text-xl font-black">
                {level.label}: {level.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{level.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-teal">
              Core lessons
            </p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              먼저 읽을 핵심 3편
            </h2>
          </div>
          <Link
            href="/learn"
            className="focus-ring inline-flex min-h-11 items-center gap-2 self-start rounded-md border border-line bg-paper px-4 text-sm font-bold hover:border-teal hover:text-teal sm:self-auto"
          >
            전체 글 보기 <ArrowRight size={17} aria-hidden />
          </Link>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {lessons.map((lesson) => (
            <ArticleCard key={lesson.slug} lesson={lesson} />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black sm:text-3xl">글쓰기 기준</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-4">
            {principles.map((principle) => (
              <article key={principle.title} className="border border-line p-5">
                <h3 className="text-lg font-extrabold">{principle.title}</h3>
                <p className="mt-3 leading-7 text-muted">{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
