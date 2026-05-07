import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonMiniVisual } from "@/components/technical-visual";
import type { LessonSummary } from "@/lib/content";

export function ArticleCard({ lesson }: { lesson: LessonSummary }) {
  return (
    <article className="flex min-h-[420px] flex-col border border-line bg-paper p-4 transition hover:-translate-y-0.5 hover:shadow-soft">
      <LessonMiniVisual slug={lesson.slug} />
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <DifficultyBadge level={lesson.level} />
        <span className="rounded-full border border-line px-3 py-1 text-xs font-bold text-muted">
          {lesson.category}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-black leading-snug">
        <Link href={`/learn/${lesson.slug}`} className="focus-ring rounded-sm">
          {lesson.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 leading-7 text-muted">{lesson.description}</p>
      <div className="mt-5 flex flex-col gap-3 border-t border-line pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-2 font-semibold text-muted">
          <CalendarDays size={16} aria-hidden />
          {lesson.publishedAt}
        </span>
        <Link
          href={`/learn/${lesson.slug}`}
          className="focus-ring inline-flex min-h-10 items-center gap-2 self-start rounded-md font-bold text-teal hover:text-ink sm:self-auto"
        >
          읽기 <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </article>
  );
}
