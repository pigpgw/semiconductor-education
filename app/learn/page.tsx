import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { getAllLessons, getLessonFilters } from "@/lib/content";
import { getLevelByLabel } from "@/lib/levels";

export const metadata: Metadata = {
  title: "교재",
  description: "DRAM, NAND/SSD, HBM, EUV 중심 반도체 교재 목록"
};

type LearnPageProps = {
  searchParams?: Promise<{
    level?: string;
    category?: string;
  }>;
};

function filterLink({
  level,
  category
}: {
  level?: string;
  category?: string;
}) {
  const params = new URLSearchParams();

  if (level) {
    params.set("level", level);
  }

  if (category) {
    params.set("category", category);
  }

  const query = params.toString();
  return query ? `/learn?${query}` : "/learn";
}

export default async function LearnPage({ searchParams }: LearnPageProps) {
  const params = searchParams ? await searchParams : {};
  const lessons = getAllLessons();
  const filters = getLessonFilters();
  const selectedLevel = params.level;
  const selectedCategory = params.category;

  const visibleLessons = lessons.filter((lesson) => {
    const levelMatches = selectedLevel ? lesson.level === selectedLevel : true;
    const categoryMatches = selectedCategory
      ? lesson.category === selectedCategory
      : true;

    return levelMatches && categoryMatches;
  });
  const selectedLevelInfo = selectedLevel ? getLevelByLabel(selectedLevel) : undefined;

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-normal text-teal">
          Learn
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
          반도체 핵심 글을 난이도와 주제로 찾아 읽습니다.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          첫 공개 버전은 DRAM, DRAM 제품군 비교, NAND/SSD, HBM, EUV
          글로 시작합니다. 모든 글은 쉬운 비유에서 출발해 산업 키워드와
          공식 출처까지 연결합니다.
        </p>
      </section>

      <section className="mt-8 border-y border-line py-5" aria-label="글 필터">
        <div className="mb-5 flex flex-col gap-3 border border-line bg-paper p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-black">내 수준에 맞게 읽기</h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              {selectedLevelInfo
                ? selectedLevelInfo.readingMode
                : "레벨을 모르겠다면 8개 질문으로 시작점을 먼저 찾을 수 있습니다."}
            </p>
          </div>
          <Link
            href="/level"
            className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md border border-line px-4 text-sm font-bold hover:border-teal hover:text-teal"
          >
            내 레벨 찾기
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-black">난이도</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={filterLink({ category: selectedCategory })}
                className={`focus-ring min-h-10 rounded-md border px-3 py-2 text-sm font-bold ${
                  !selectedLevel
                    ? "border-blue bg-blue text-bg0"
                    : "border-line bg-paper text-ink hover:border-teal hover:text-teal"
                }`}
              >
                전체
              </Link>
              {filters.levels.map((level) => (
                <Link
                  key={level}
                  href={filterLink({ level, category: selectedCategory })}
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
            <h2 className="text-sm font-black">주제</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={filterLink({ level: selectedLevel })}
                className={`focus-ring min-h-10 rounded-md border px-3 py-2 text-sm font-bold ${
                  !selectedCategory
                    ? "border-blue bg-blue text-bg0"
                    : "border-line bg-paper text-ink hover:border-teal hover:text-teal"
                }`}
              >
                전체
              </Link>
              {filters.categories.map((category) => (
                <Link
                  key={category}
                  href={filterLink({ level: selectedLevel, category })}
                  aria-current={
                    selectedCategory === category ? "true" : undefined
                  }
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
        </div>
      </section>

      <section className="mt-8" aria-label="교재 글 목록">
        {visibleLessons.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {visibleLessons.map((lesson) => (
              <ArticleCard key={lesson.slug} lesson={lesson} />
            ))}
          </div>
        ) : (
          <div className="border border-line bg-paper p-8">
            <h2 className="text-xl font-black">조건에 맞는 글이 없습니다.</h2>
            <p className="mt-3 text-muted">
              필터를 초기화하거나 다른 난이도와 주제를 선택해 주세요.
            </p>
            <Link
              href="/learn"
              className="focus-ring mt-5 inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm font-bold hover:border-teal hover:text-teal"
            >
              전체 글 보기
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
