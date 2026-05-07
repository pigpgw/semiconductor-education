import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Filter,
  Newspaper,
  Rss,
  SearchCheck,
  ShieldCheck
} from "lucide-react";
import {
  companyTypeLabels,
  crawlPolicyLabels,
  getSourceHost,
  officialSources,
  rssSourceCount,
  sourceCompanyTypes,
  sourceTopics,
  type SourceCompanyType
} from "@/lib/sources";
import { getAllLessons } from "@/lib/content";

export const metadata: Metadata = {
  title: "공식 출처",
  description:
    "반도체 기업 기술블로그와 뉴스룸을 공식 출처 중심으로 모아 학습 관점과 함께 제공합니다."
};

type SourcesPageProps = {
  searchParams?: Promise<{
    type?: string;
    topic?: string;
  }>;
};

function sourceLink({
  type,
  topic
}: {
  type?: SourceCompanyType;
  topic?: string;
}) {
  const params = new URLSearchParams();

  if (type) {
    params.set("type", type);
  }

  if (topic) {
    params.set("topic", topic);
  }

  const query = params.toString();
  return query ? `/sources?${query}` : "/sources";
}

export default async function SourcesPage({ searchParams }: SourcesPageProps) {
  const params = searchParams ? await searchParams : {};
  const selectedType = sourceCompanyTypes.includes(params.type as SourceCompanyType)
    ? (params.type as SourceCompanyType)
    : undefined;
  const selectedTopic = sourceTopics.includes(params.topic ?? "")
    ? params.topic
    : undefined;
  const lessonTitles = new Map(
    getAllLessons().map((lesson) => [lesson.slug, lesson.title])
  );

  const visibleSources = officialSources.filter((source) => {
    const typeMatches = selectedType ? source.companyType === selectedType : true;
    const topicMatches = selectedTopic
      ? source.topics.includes(selectedTopic)
      : true;

    return typeMatches && topicMatches;
  });

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-normal text-teal">
          Sources
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
          반도체 공식 기술블로그를 학습 관점으로 모아 봅니다.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          이 페이지는 뉴스를 복제하지 않습니다. Samsung, SK hynix, ASML,
          TSMC 같은 공식 출처로 이동할 수 있는 링크와, 원문을 읽을 때
          확인해야 할 기술 관점을 함께 제공합니다.
        </p>
      </section>

      <section className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
        {[
          { label: "공식 출처", value: officialSources.length, unit: "개" },
          { label: "분야", value: sourceCompanyTypes.length, unit: "개" },
          { label: "주제 태그", value: sourceTopics.length, unit: "개" },
          { label: "RSS/API 후보", value: rssSourceCount, unit: "개" }
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

      <section className="mt-10 border-y border-line py-6" aria-label="출처 필터">
        <div className="mb-5 flex items-center gap-2 text-sm font-black text-teal">
          <Filter size={18} aria-hidden />
          공식 출처 필터
        </div>
        <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
          <div>
            <h2 className="text-sm font-black">분야</h2>
            <div className="mt-3 flex flex-wrap gap-2 lg:grid">
              <Link
                href={sourceLink({ topic: selectedTopic })}
                className={`focus-ring min-h-10 rounded-md border px-3 py-2 text-sm font-bold ${
                  !selectedType
                    ? "border-blue bg-blue text-bg0"
                    : "border-line bg-paper text-ink hover:border-teal hover:text-teal"
                }`}
              >
                전체
              </Link>
              {sourceCompanyTypes.map((type) => (
                <Link
                  key={type}
                  href={sourceLink({ type, topic: selectedTopic })}
                  className={`focus-ring min-h-10 rounded-md border px-3 py-2 text-sm font-bold ${
                    selectedType === type
                      ? "border-blue bg-blue text-bg0"
                      : "border-line bg-paper text-ink hover:border-teal hover:text-teal"
                  }`}
                >
                  {companyTypeLabels[type]}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-black">주제</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={sourceLink({ type: selectedType })}
                className={`focus-ring min-h-10 rounded-md border px-3 py-2 text-sm font-bold ${
                  !selectedTopic
                    ? "border-blue bg-blue text-bg0"
                    : "border-line bg-paper text-ink hover:border-teal hover:text-teal"
                }`}
              >
                전체
              </Link>
              {sourceTopics.map((topic) => (
                <Link
                  key={topic}
                  href={sourceLink({ type: selectedType, topic })}
                  className={`focus-ring min-h-10 rounded-md border px-3 py-2 text-sm font-bold ${
                    selectedTopic === topic
                      ? "border-blue bg-blue text-bg0"
                      : "border-line bg-paper text-ink hover:border-teal hover:text-teal"
                  }`}
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8" aria-label="공식 출처 목록">
        {visibleSources.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {visibleSources.map((source) => (
              <article
                key={source.id}
                className="flex min-h-[320px] flex-col border border-line bg-paper p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-black text-teal">
                    {companyTypeLabels[source.companyType]}
                  </span>
                  <span className="rounded-full border border-line bg-bg3 px-3 py-1 text-xs font-bold text-muted">
                    {crawlPolicyLabels[source.crawlPolicy]}
                  </span>
                  <span className="rounded-full border border-line bg-bg3 px-3 py-1 text-xs font-bold text-muted">
                    {source.language.toUpperCase()}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-black">{source.name}</h2>
                <p className="mt-1 text-sm font-bold text-muted">
                  {getSourceHost(source.url)}
                </p>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {source.note}
                </p>
                <div className="mt-4 border-t border-line pt-4">
                  <h3 className="flex items-center gap-2 text-sm font-black">
                    <SearchCheck className="text-teal" size={17} aria-hidden />
                    읽을 관점
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {source.readFor}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {source.topics.map((topic) => (
                    <Link
                      key={topic}
                      href={sourceLink({ type: selectedType, topic })}
                      className="focus-ring rounded-md border border-line bg-bg3 px-2.5 py-1 text-xs font-bold text-muted hover:border-teal hover:text-teal"
                    >
                      {topic}
                    </Link>
                  ))}
                </div>
                <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue px-4 text-sm font-black text-bg0 hover:bg-teal"
                    >
                      공식 사이트로 이동
                      <ExternalLink size={16} aria-hidden />
                    </a>
                    {source.feedUrl ? (
                      <a
                        href={source.feedUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line px-4 text-sm font-black text-muted hover:border-teal hover:text-teal"
                      >
                        RSS 피드
                        <Rss size={16} aria-hidden />
                      </a>
                    ) : null}
                  </div>
                  <p className="text-xs font-bold text-muted/70">
                    확인일 {source.verifiedAt}
                  </p>
                </div>
                {source.relatedLessons.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
                    {source.relatedLessons.map((slug) => (
                      <Link
                        key={slug}
                        href={`/learn/${slug}`}
                        className="focus-ring inline-flex min-h-8 items-center gap-1 rounded-md border border-line px-2.5 text-xs font-bold text-muted hover:border-teal hover:text-teal"
                      >
                        {lessonTitles.get(slug) ?? "관련 글"}
                        <ArrowRight size={13} aria-hidden />
                      </Link>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-line bg-paper p-8">
            <h2 className="text-xl font-black">조건에 맞는 출처가 없습니다.</h2>
            <p className="mt-3 text-muted">
              필터를 초기화하거나 다른 분야와 주제를 선택해 주세요.
            </p>
            <Link
              href="/sources"
              className="focus-ring mt-5 inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm font-bold hover:border-teal hover:text-teal"
            >
              전체 출처 보기
            </Link>
          </div>
        )}
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          {
            icon: ShieldCheck,
            title: "복제하지 않음",
            body: "원문 본문과 이미지를 저장하지 않고 제목, 링크, 출처, 학습 관점만 관리합니다."
          },
          {
            icon: Rss,
            title: "자동 수집은 후순위",
            body: "먼저 수동 큐레이션으로 품질 기준을 만들고, 공식 RSS/API가 있을 때만 메타데이터를 수집합니다."
          },
          {
            icon: Newspaper,
            title: "교재로 연결",
            body: "뉴스 제목을 소비하게 만들기보다 DRAM, HBM, EUV 같은 교재 글로 돌아오게 설계합니다."
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
