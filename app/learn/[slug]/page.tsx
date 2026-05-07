import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  ExternalLink,
  FileSearch,
  Target
} from "lucide-react";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { mdxComponents } from "@/components/mdx-components";
import { LessonTechnicalVisual } from "@/components/technical-visual";
import {
  extractHeadings,
  getAllLessons,
  getLessonBySlug,
  getNextLesson
} from "@/lib/content";
import { levels } from "@/lib/levels";

type LessonPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllLessons().map((lesson) => ({
    slug: lesson.slug
  }));
}

export async function generateMetadata({
  params
}: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    return {
      title: "글을 찾을 수 없습니다"
    };
  }

  return {
    title: lesson.title,
    description: lesson.description
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  const headings = extractHeadings(lesson.content);
  const nextLesson = getNextLesson(lesson.slug);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
      <Link
        href="/learn"
        className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-md text-sm font-bold text-muted hover:text-teal"
      >
        <ArrowLeft size={17} aria-hidden /> 교재 목록
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="min-w-0">
          <header className="border-b border-line pb-8">
            <div className="flex flex-wrap items-center gap-2">
              <DifficultyBadge level={lesson.level} />
              <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-bold text-muted">
                {lesson.category}
              </span>
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
              {lesson.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              {lesson.description}
            </p>
            <dl className="mt-6 grid gap-3 text-sm text-muted sm:grid-cols-2">
              <div>
                <dt className="font-black text-ink">학습 목표</dt>
                <dd className="mt-2">
                  <ul className="space-y-1">
                    {lesson.learningGoals.map((goal) => (
                      <li key={goal}>{goal}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="font-black text-ink">선수 지식</dt>
                <dd className="mt-2">
                  <ul className="space-y-1">
                    {lesson.prerequisites.map((prerequisite) => (
                      <li key={prerequisite}>{prerequisite}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </header>

          <section className="mt-8 overflow-hidden rounded-xl border border-line bg-paper">
            <div className="border-b border-line bg-bg0 p-5 sm:p-6">
              <p className="text-sm font-black text-teal">90초 요약</p>
              <h2 className="mt-2 max-w-3xl text-2xl font-black leading-snug sm:text-3xl">
                {lesson.quickSummary.conclusion}
              </h2>
            </div>
            <div className="grid gap-px bg-line md:grid-cols-2">
              <SummaryBlock
                icon={<BookOpenCheck size={18} aria-hidden />}
                label="먼저 알아야 할 말"
              >
                <div className="flex flex-wrap gap-2">
                  {lesson.quickSummary.keyTerms.map((term) => (
                    <Link
                      key={term}
                      href={`/glossary#${encodeURIComponent(term)}`}
                      className="focus-ring rounded-md border border-line bg-bg3 px-2.5 py-1 text-xs font-bold text-ink hover:border-teal hover:text-teal"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </SummaryBlock>
              <SummaryBlock
                icon={<FileSearch size={18} aria-hidden />}
                label="현업 키워드"
              >
                <div className="flex flex-wrap gap-2">
                  {lesson.quickSummary.fieldKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-md border border-line bg-bg3 px-2.5 py-1 text-xs font-bold text-muted"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </SummaryBlock>
              <SummaryBlock
                icon={<Target size={18} aria-hidden />}
                label="읽고 나면"
              >
                <p className="text-sm leading-7 text-muted">
                  {lesson.quickSummary.outcome}
                </p>
              </SummaryBlock>
              <SummaryBlock
                icon={<ExternalLink size={18} aria-hidden />}
                label="공식 출처"
              >
                <ul className="grid gap-2">
                  {lesson.sources.slice(0, 2).map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-teal"
                      >
                        {source.title}
                        <ExternalLink size={14} aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </SummaryBlock>
            </div>
          </section>

          <LessonTechnicalVisual slug={lesson.slug} />

          <section className="mt-8 border border-line bg-paper p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-black text-teal">레벨별 읽기 안내</p>
                <h2 className="mt-2 text-2xl font-black">
                  한 글을 세 가지 깊이로 읽습니다.
                </h2>
              </div>
              <Link
                href="/glossary"
                className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md border border-line px-4 text-sm font-bold hover:border-teal hover:text-teal"
              >
                용어 사전
              </Link>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {levels.map((level) => (
                <article key={level.id} className="border border-line bg-surface p-4">
                  <p className="text-xs font-black text-saffron">{level.badge}</p>
                  <h3 className="mt-2 text-base font-black">{level.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {lesson.readingGuide[level.id]}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 border border-line bg-surface p-5">
            <p className="text-sm font-black text-teal">공식 자료 해석</p>
            <h2 className="mt-2 text-2xl font-black">
              원문을 그대로 외우지 않고, 판단 기준으로 바꿉니다.
            </h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <InterpretationItem
                label="공식 자료의 주장"
                text={lesson.sourceInterpretation.officialClaim}
              />
              <InterpretationItem
                label="엔지니어링 의미"
                text={lesson.sourceInterpretation.engineeringMeaning}
              />
              <InterpretationItem
                label="읽을 때 던질 질문"
                text={lesson.sourceInterpretation.readerQuestion}
              />
              <InterpretationItem
                label="최신성 메모"
                text={lesson.sourceInterpretation.freshnessNote}
              />
            </div>
          </section>

          <div className="article-prose mt-8">
            <MDXRemote
              source={lesson.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm]
                }
              }}
            />
          </div>

          <section className="mt-12 border-t border-line pt-8">
            <h2 className="text-2xl font-black">공식 출처</h2>
            <ul className="mt-4 grid gap-3">
              {lesson.sources.map((source) => (
                <li key={source.url} className="border border-line bg-paper p-4">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex min-h-9 items-center gap-2 text-sm font-black hover:text-teal"
                  >
                    {source.title}
                    <ExternalLink size={16} aria-hidden />
                  </a>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {source.usedFor}
                  </p>
                  <p className="mt-2 text-xs font-bold text-muted/70">
                    확인일{" "}
                    <time dateTime={source.checkedAt}>{source.checkedAt}</time>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {nextLesson ? (
            <nav
              className="mt-10 border border-line bg-paper p-5"
              aria-label="다음 글"
            >
              <p className="text-sm font-black text-teal">다음 글</p>
              <Link
                href={`/learn/${nextLesson.slug}`}
                className="focus-ring mt-2 inline-flex min-h-11 items-center gap-2 text-lg font-black hover:text-teal"
              >
                {nextLesson.title} <ArrowRight size={18} aria-hidden />
              </Link>
            </nav>
          ) : null}

          <section className="mt-10 border border-line bg-surface p-5">
            <p className="text-sm font-black text-teal">읽은 뒤 복습</p>
            <h2 className="mt-2 text-2xl font-black">
              이 글을 자기 말로 설명할 수 있는지 확인하세요.
            </h2>
            <p className="mt-3 leading-7 text-muted">
              답을 외우는 대신 “왜 그런 구조가 필요한가”, “실무에서는 어떤
              제약이 생기는가”를 말로 설명해 봅니다.
            </p>
            <Link
              href="/practice"
              className="focus-ring mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-blue px-4 text-sm font-bold text-bg0 hover:bg-teal"
            >
              복습 문제 풀기 <ArrowRight size={17} aria-hidden />
            </Link>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 border-l border-line pl-5">
            <h2 className="text-sm font-black">이 글의 흐름</h2>
            <nav className="mt-4" aria-label="본문 목차">
              <ol className="space-y-3">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className="focus-ring block rounded-sm text-sm font-semibold leading-6 text-muted hover:text-teal"
                    >
                      {heading.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </aside>
      </div>
    </main>
  );
}

function InterpretationItem({ label, text }: { label: string; text: string }) {
  return (
    <div className="border border-line bg-paper p-4">
      <h3 className="text-sm font-black">{label}</h3>
      <p className="mt-2 text-sm leading-7 text-muted">{text}</p>
    </div>
  );
}

function SummaryBlock({
  icon,
  label,
  children
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-paper p-5">
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-teal">
        {icon}
        {label}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
