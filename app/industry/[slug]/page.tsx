import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileSearch,
  ShieldCheck,
  Tags
} from "lucide-react";
import { getAllLessons } from "@/lib/content";
import {
  formatIndustryDate,
  getIndustrySource,
  getIndustryUpdateById,
  getNextIndustryUpdate,
  industryStatusLabels,
  industryUpdates,
  type IndustryUpdate
} from "@/lib/industry";
import { getSourceHost } from "@/lib/sources";

type IndustryDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return industryUpdates.map((update) => ({
    slug: update.id
  }));
}

export async function generateMetadata({
  params
}: IndustryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const update = getIndustryUpdateById(slug);

  if (!update) {
    return {
      title: "산업 업데이트를 찾을 수 없습니다"
    };
  }

  return {
    title: `${update.title} 해설 노트`,
    description: update.summary
  };
}

function buildReadingNotes(update: IndustryUpdate) {
  const primaryTags = update.tags.slice(0, 3).join(", ");

  return [
    {
      label: "원문에서 먼저 볼 것",
      text: `${update.sourceType}의 제목보다 ${primaryTags} 같은 키워드가 어떤 병목을 풀기 위해 쓰였는지 확인합니다.`
    },
    {
      label: "교재로 돌아올 지점",
      text:
        update.relatedLessons.length > 0
          ? "원문을 읽은 뒤 연결된 교재 글로 돌아와 구조, 용어, 트레이드오프를 다시 정리합니다."
          : "원문을 읽은 뒤 같은 주제의 교재 글 후보가 필요한지 기록합니다."
    },
    {
      label: "주의할 점",
      text: "공식 자료라도 제품 홍보 문구와 엔지니어링 의미는 분리합니다. 이 노트는 원문을 복제하지 않고 읽을 질문과 학습 연결만 남깁니다."
    }
  ];
}

export default async function IndustryDetailPage({
  params
}: IndustryDetailPageProps) {
  const { slug } = await params;
  const update = getIndustryUpdateById(slug);

  if (!update) {
    notFound();
  }

  const source = getIndustrySource(update.sourceId);
  const nextUpdate = getNextIndustryUpdate(update.id);
  const lessonTitles = new Map(
    getAllLessons().map((lesson) => [lesson.slug, lesson.title])
  );
  const readingNotes = buildReadingNotes(update);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
      <Link
        href="/industry"
        className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-md text-sm font-bold text-muted hover:text-teal"
      >
        <ArrowLeft size={17} aria-hidden /> 산업 업데이트
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="min-w-0">
          <header className="border-b border-line pb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-black text-teal">
                {industryStatusLabels[update.status]}
              </span>
              <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-bold text-muted">
                {update.level}
              </span>
              <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-bold text-muted">
                {update.category}
              </span>
              <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-bold text-muted">
                {update.sourceType}
              </span>
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
              {update.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              {update.summary}
            </p>
            <dl className="mt-6 grid gap-3 text-sm text-muted sm:grid-cols-3">
              <div>
                <dt className="font-black text-ink">출처</dt>
                <dd className="mt-1">{update.sourceName}</dd>
              </div>
              <div>
                <dt className="font-black text-ink">발행일</dt>
                <dd className="mt-1">{formatIndustryDate(update.publishedAt)}</dd>
              </div>
              <div>
                <dt className="font-black text-ink">확인일</dt>
                <dd className="mt-1">{formatIndustryDate(update.curatedAt)}</dd>
              </div>
            </dl>
          </header>

          <section className="mt-8 overflow-hidden rounded-xl border border-line bg-line">
            <div className="border-b border-line bg-bg0 p-5 sm:p-6">
              <p className="text-sm font-black text-teal">해설 노트</p>
              <h2 className="mt-2 max-w-3xl text-2xl font-black leading-snug sm:text-3xl">
                원문을 읽기 전에 판단 기준부터 잡습니다.
              </h2>
            </div>
            <div className="grid gap-px bg-line md:grid-cols-3">
              <InfoBlock icon={<CheckCircle2 size={18} aria-hidden />} label="왜 중요한가">
                <p className="text-sm leading-7 text-muted">{update.whyItMatters}</p>
              </InfoBlock>
              <InfoBlock icon={<Tags size={18} aria-hidden />} label="알아야 할 용어">
                <div className="flex flex-wrap gap-2">
                  {update.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-line bg-bg3 px-2.5 py-1 text-xs font-bold text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </InfoBlock>
              <InfoBlock icon={<FileSearch size={18} aria-hidden />} label="원문 위치">
                <a
                  href={update.url}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center gap-1 text-sm font-black text-muted hover:text-teal"
                >
                  {getSourceHost(update.url)}
                  <ExternalLink size={14} aria-hidden />
                </a>
              </InfoBlock>
            </div>
          </section>

          <section className="mt-8 border border-line bg-paper p-5">
            <h2 className="flex items-center gap-2 text-2xl font-black">
              <BookOpen className="text-teal" size={22} aria-hidden />
              원문을 읽으며 던질 질문
            </h2>
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted">
              {update.readFor.map((question) => (
                <li key={question} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            {readingNotes.map((note) => (
              <article key={note.label} className="border border-line bg-bg0 p-5">
                <h2 className="text-base font-black">{note.label}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{note.text}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 border border-line bg-surface p-5">
            <p className="text-sm font-black text-teal">출처 정책</p>
            <h2 className="mt-2 text-2xl font-black">
              이 페이지는 원문 본문을 저장하지 않습니다.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Semiconductor Education은 공식 자료의 제목, URL, 날짜, 학습
              질문만 관리합니다. 자세한 제품 설명과 회사 발표 문장은 원문에서
              확인하고, 사이트 안에서는 교재와 연결되는 해석 기준만 제공합니다.
            </p>
          </section>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <section className="border border-line bg-paper p-4">
            <h2 className="flex items-center gap-2 text-sm font-black">
              <ShieldCheck className="text-teal" size={17} aria-hidden />
              공식 출처
            </h2>
            <p className="mt-3 text-sm font-bold text-muted">{update.sourceName}</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              {source?.note ?? "공식 출처 원문을 기준으로 확인합니다."}
            </p>
            <a
              href={update.url}
              target="_blank"
              rel="noreferrer"
              className="focus-ring mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-blue px-4 text-sm font-black text-bg0 hover:bg-teal"
            >
              원문으로 이동
              <ExternalLink size={16} aria-hidden />
            </a>
            {source ? (
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="focus-ring mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-line px-4 text-sm font-black hover:border-teal hover:text-teal"
              >
                출처 허브 원문
                <ExternalLink size={16} aria-hidden />
              </a>
            ) : null}
          </section>

          {update.relatedLessons.length > 0 ? (
            <section className="border border-line bg-bg0 p-4">
              <h2 className="text-sm font-black">관련 교재</h2>
              <div className="mt-3 grid gap-2">
                {update.relatedLessons.map((lessonSlug) => (
                  <Link
                    key={lessonSlug}
                    href={`/learn/${lessonSlug}`}
                    className="focus-ring inline-flex min-h-11 items-center justify-between gap-2 rounded-md border border-line px-3 text-sm font-bold text-muted hover:border-teal hover:text-teal"
                  >
                    {lessonTitles.get(lessonSlug) ?? "관련 글"}
                    <ArrowRight size={15} aria-hidden />
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="border border-line bg-bg0 p-4">
            <h2 className="text-sm font-black">다음에 볼 업데이트</h2>
            {nextUpdate ? (
              <Link
                href={`/industry/${nextUpdate.id}`}
                className="focus-ring mt-3 inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-md border border-line px-3 text-sm font-bold text-muted hover:border-teal hover:text-teal"
              >
                {nextUpdate.title}
                <ArrowRight size={15} aria-hidden />
              </Link>
            ) : (
              <Link
                href="/industry"
                className="focus-ring mt-3 inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-md border border-line px-3 text-sm font-bold text-muted hover:border-teal hover:text-teal"
              >
                전체 업데이트 보기
                <ArrowRight size={15} aria-hidden />
              </Link>
            )}
          </section>
        </aside>
      </div>
    </main>
  );
}

function InfoBlock({
  children,
  icon,
  label
}: {
  children: ReactNode;
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className="bg-paper p-5">
      <h3 className="flex items-center gap-2 text-sm font-black text-teal">
        {icon}
        {label}
      </h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}
