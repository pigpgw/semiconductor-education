import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Filter,
  Newspaper,
  Radio,
  ShieldCheck
} from "lucide-react";
import { getAllLessons } from "@/lib/content";
import { feedReviewQueue } from "@/lib/feed-review";
import {
  formatIndustryDate,
  getIndustrySource,
  industryCategories,
  industryLevels,
  industryStatusLabels,
  industryStatuses,
  industryUpdates,
  type IndustryUpdate,
  type IndustryUpdateStatus
} from "@/lib/industry";
import { getSourceHost } from "@/lib/sources";

export const metadata: Metadata = {
  title: "산업 업데이트",
  description:
    "반도체 공식 기술 발표와 뉴스룸 글을 교재와 연결해 읽는 수동 큐레이션 목록"
};

type IndustryPageProps = {
  searchParams?: Promise<{
    category?: string;
    level?: string;
    status?: string;
  }>;
};

function industryLink({
  category,
  level,
  status
}: {
  category?: string;
  level?: string;
  status?: IndustryUpdateStatus;
}) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (level) {
    params.set("level", level);
  }

  if (status) {
    params.set("status", status);
  }

  const query = params.toString();
  return query ? `/industry?${query}` : "/industry";
}

export default async function IndustryPage({ searchParams }: IndustryPageProps) {
  const params = searchParams ? await searchParams : {};
  const selectedCategory = industryCategories.includes(params.category ?? "")
    ? params.category
    : undefined;
  const selectedLevel = industryLevels.includes(
    params.level as IndustryUpdate["level"]
  )
    ? (params.level as IndustryUpdate["level"])
    : undefined;
  const selectedStatus = industryStatuses.includes(
    params.status as IndustryUpdateStatus
  )
    ? (params.status as IndustryUpdateStatus)
    : undefined;

  const lessonTitles = new Map(
    getAllLessons().map((lesson) => [lesson.slug, lesson.title])
  );

  const visibleUpdates = industryUpdates.filter((update) => {
    const categoryMatches = selectedCategory
      ? update.category === selectedCategory
      : true;
    const levelMatches = selectedLevel ? update.level === selectedLevel : true;
    const statusMatches = selectedStatus
      ? update.status === selectedStatus
      : true;

    return categoryMatches && levelMatches && statusMatches;
  });

  const linkedCount = industryUpdates.filter(
    (update) => update.status === "lesson-linked"
  ).length;
  const reviewNeededCount = feedReviewQueue.filter(
    (candidate) => candidate.status === "review-needed"
  ).length;
  const sourceCount = new Set(industryUpdates.map((update) => update.sourceId)).size;

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-normal text-teal">
          Industry
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
          공식 기술 발표를 교재로 돌아오게 큐레이션합니다.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          이 페이지는 실시간 뉴스 복제본이 아닙니다. 반도체 기업과 장비사의
          공식 글을 골라서 원문 링크, 읽을 관점, 관련 교재를 연결합니다.
          자동 크롤러보다 학습 가치와 출처 신뢰를 먼저 봅니다.
        </p>
      </section>

      <section className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "큐레이션", value: industryUpdates.length, unit: "개" },
          { label: "공식 출처", value: sourceCount, unit: "개" },
          { label: "교재 연결", value: linkedCount, unit: "개" },
          { label: "검토 대기", value: reviewNeededCount, unit: "개" },
          { label: "본문 저장", value: 0, unit: "건" }
        ].map((item) => (
          <div key={item.label} className="bg-bg0 px-5 py-6 text-center">
            <div className="text-3xl font-black">
              {item.value}
              <span className="ml-1 text-lg text-blue">{item.unit}</span>
            </div>
            <div className="mt-1 text-xs font-semibold text-muted/70">
              {item.label}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10 border-y border-line py-6" aria-label="산업 업데이트 필터">
        <div className="mb-5 flex items-center gap-2 text-sm font-black text-teal">
          <Filter size={18} aria-hidden />
          업데이트 필터
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          <div>
            <h2 className="text-sm font-black">주제</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={industryLink({
                  level: selectedLevel,
                  status: selectedStatus
                })}
                className={`focus-ring min-h-10 rounded-md border px-3 py-2 text-sm font-bold ${
                  !selectedCategory
                    ? "border-blue bg-blue text-bg0"
                    : "border-line bg-paper text-ink hover:border-teal hover:text-teal"
                }`}
              >
                전체
              </Link>
              {industryCategories.map((category) => (
                <Link
                  key={category}
                  href={industryLink({
                    category,
                    level: selectedLevel,
                    status: selectedStatus
                  })}
                  aria-current={selectedCategory === category ? "true" : undefined}
                  className={`focus-ring min-h-10 rounded-md border px-3 py-2 text-sm font-bold ${
                    selectedCategory === category
                      ? "border-blue bg-blue text-bg0"
                      : "border-line bg-paper text-ink hover:border-teal hover:text-teal"
                  }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-black">난이도</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={industryLink({
                  category: selectedCategory,
                  status: selectedStatus
                })}
                className={`focus-ring min-h-10 rounded-md border px-3 py-2 text-sm font-bold ${
                  !selectedLevel
                    ? "border-blue bg-blue text-bg0"
                    : "border-line bg-paper text-ink hover:border-teal hover:text-teal"
                }`}
              >
                전체
              </Link>
              {industryLevels.map((level) => (
                <Link
                  key={level}
                  href={industryLink({
                    category: selectedCategory,
                    level,
                    status: selectedStatus
                  })}
                  aria-current={selectedLevel === level ? "true" : undefined}
                  className={`focus-ring min-h-10 rounded-md border px-3 py-2 text-sm font-bold ${
                    selectedLevel === level
                      ? "border-blue bg-blue text-bg0"
                      : "border-line bg-paper text-ink hover:border-teal hover:text-teal"
                  }`}
                >
                  {level}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-black">상태</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={industryLink({
                  category: selectedCategory,
                  level: selectedLevel
                })}
                className={`focus-ring min-h-10 rounded-md border px-3 py-2 text-sm font-bold ${
                  !selectedStatus
                    ? "border-blue bg-blue text-bg0"
                    : "border-line bg-paper text-ink hover:border-teal hover:text-teal"
                }`}
              >
                전체
              </Link>
              {industryStatuses.map((status) => (
                <Link
                  key={status}
                  href={industryLink({
                    category: selectedCategory,
                    level: selectedLevel,
                    status
                  })}
                  aria-current={selectedStatus === status ? "true" : undefined}
                  className={`focus-ring min-h-10 rounded-md border px-3 py-2 text-sm font-bold ${
                    selectedStatus === status
                      ? "border-blue bg-blue text-bg0"
                      : "border-line bg-paper text-ink hover:border-teal hover:text-teal"
                  }`}
                >
                  {industryStatusLabels[status]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8" aria-label="산업 업데이트 목록">
        {visibleUpdates.length > 0 ? (
          <div className="grid gap-5">
            {visibleUpdates.map((update) => {
              const source = getIndustrySource(update.sourceId);

              return (
                <article key={update.id} className="border border-line bg-paper p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-black text-teal">
                      {industryStatusLabels[update.status]}
                    </span>
                    <span className="rounded-full border border-line bg-bg3 px-3 py-1 text-xs font-bold text-muted">
                      {update.level}
                    </span>
                    <span className="rounded-full border border-line bg-bg3 px-3 py-1 text-xs font-bold text-muted">
                      {update.category}
                    </span>
                    <span className="rounded-full border border-line bg-bg3 px-3 py-1 text-xs font-bold text-muted">
                      {update.sourceType}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_280px]">
                    <div>
                      <p className="text-sm font-bold text-muted">
                        {update.sourceName} · {formatIndustryDate(update.publishedAt)}
                      </p>
                      <h2 className="mt-2 text-2xl font-black leading-snug">
                        <Link
                          href={`/industry/${update.id}`}
                          className="focus-ring rounded-sm hover:text-teal"
                        >
                          {update.title}
                        </Link>
                      </h2>
                      <p className="mt-4 text-base leading-8 text-muted">
                        {update.summary}
                      </p>

                      <div className="mt-5 border-l-4 border-blue bg-blue/10 p-4">
                        <h3 className="flex items-center gap-2 text-sm font-black text-blue">
                          <CheckCircle2 size={17} aria-hidden />
                          왜 중요한가
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-muted">
                          {update.whyItMatters}
                        </p>
                      </div>

                      <div className="mt-5">
                        <h3 className="flex items-center gap-2 text-sm font-black">
                          <BookOpen className="text-teal" size={17} aria-hidden />
                          읽을 질문
                        </h3>
                        <ul className="mt-3 grid gap-2 text-sm leading-7 text-muted">
                          {update.readFor.map((question) => (
                            <li key={question} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                              <span>{question}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link
                        href={`/industry/${update.id}`}
                        className="focus-ring mt-5 inline-flex min-h-11 items-center gap-2 rounded-md border border-line px-4 text-sm font-black hover:border-teal hover:text-teal"
                      >
                        해설 노트 보기
                        <ArrowRight size={16} aria-hidden />
                      </Link>
                    </div>

                    <aside className="border border-line bg-bg0 p-4">
                      <h3 className="flex items-center gap-2 text-sm font-black">
                        <ShieldCheck className="text-teal" size={17} aria-hidden />
                        출처
                      </h3>
                      <p className="mt-2 text-sm font-bold text-muted">
                        {getSourceHost(update.url)}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-muted">
                        확인일 {update.curatedAt}
                        {source ? ` · ${source.note}` : ""}
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

                      <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                        {update.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-line bg-bg3 px-2.5 py-1 text-xs font-bold text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {update.relatedLessons.length > 0 ? (
                        <div className="mt-5 border-t border-line pt-4">
                          <h3 className="text-sm font-black">관련 교재</h3>
                          <div className="mt-3 grid gap-2">
                            {update.relatedLessons.map((slug) => (
                              <Link
                                key={slug}
                                href={`/learn/${slug}`}
                                className="focus-ring inline-flex min-h-10 items-center justify-between gap-2 rounded-md border border-line px-3 text-sm font-bold text-muted hover:border-teal hover:text-teal"
                              >
                                {lessonTitles.get(slug) ?? "관련 글"}
                                <ArrowRight size={15} aria-hidden />
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </aside>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="border border-line bg-paper p-8">
            <h2 className="text-xl font-black">조건에 맞는 업데이트가 없습니다.</h2>
            <p className="mt-3 text-muted">
              필터를 초기화하거나 다른 주제, 난이도, 상태를 선택해 주세요.
            </p>
            <Link
              href="/industry"
              className="focus-ring mt-5 inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm font-bold hover:border-teal hover:text-teal"
            >
              전체 업데이트 보기
            </Link>
          </div>
        )}
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          {
            icon: Newspaper,
            title: "뉴스 복제 아님",
            body: "원문 전체를 저장하지 않고 공식 링크, 학습 메모, 관련 교재만 관리합니다."
          },
          {
            icon: Radio,
            title: "실시간보다 신뢰",
            body: "자동 수집은 후순위입니다. 먼저 사람이 읽고 학습 가치가 있는 항목만 올립니다."
          },
          {
            icon: ShieldCheck,
            title: "출처 정책 유지",
            body: "비공식 루머와 출처 없는 요약은 제외하고 공식 기업/기관 자료만 연결합니다."
          }
        ].map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.title} className="border border-line bg-bg0 p-5">
              <Icon className="text-teal" size={22} aria-hidden />
              <h2 className="mt-4 text-xl font-black">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
