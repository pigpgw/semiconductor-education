import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Cpu,
  Database,
  Factory,
  Github,
  Layers3,
  Microscope,
  Rocket,
  SlidersHorizontal
} from "lucide-react";
import { getAllLessons } from "@/lib/content";
import { roadmap } from "@/lib/roadmap";

const tracks = [
  {
    label: "Track 01",
    title: "반도체 기초 원리",
    description: "전기 신호, 트랜지스터, 메모리 역할을 처음부터 연결합니다.",
    icon: Cpu,
    tone: "text-teal",
    bg: "bg-teal/10",
    border: "after:bg-teal",
    tags: ["전기 신호", "MOSFET", "0과 1", "메모리"]
  },
  {
    label: "Track 02",
    title: "메모리 반도체",
    description: "DRAM, NAND, refresh, HBM을 용도와 구조로 비교합니다.",
    icon: Database,
    tone: "text-blue",
    bg: "bg-blue/10",
    border: "after:bg-blue",
    tags: ["DRAM", "NAND", "HBM", "대역폭"]
  },
  {
    label: "Track 03",
    title: "공정과 미세화",
    description: "DUV와 EUV, 패터닝, 수율, 생산성을 함께 봅니다.",
    icon: Factory,
    tone: "text-saffron",
    bg: "bg-saffron/10",
    border: "after:bg-saffron",
    tags: ["EUV", "패터닝", "수율", "노광"]
  },
  {
    label: "Track 04",
    title: "패키징과 시스템",
    description: "TSV, 적층, 열, 전력처럼 칩 밖의 병목까지 읽습니다.",
    icon: Layers3,
    tone: "text-purple",
    bg: "bg-purple/10",
    border: "after:bg-purple",
    tags: ["TSV", "적층", "열", "AI 서버"]
  },
  {
    label: "Track 05",
    title: "실무 관점",
    description: "공식 자료를 기술 주장, 근거, 제약 조건으로 나눠 봅니다.",
    icon: Microscope,
    tone: "text-berry",
    bg: "bg-berry/10",
    border: "after:bg-berry",
    tags: ["양산성", "고객 검증", "로드맵", "면접"]
  }
];

const references = [
  "Samsung Semiconductor",
  "SK hynix Newsroom",
  "공식 출처",
  "MDX 교재"
];

export default function HomePage() {
  const lessons = getAllLessons();
  const featuredLesson = lessons.find((lesson) => lesson.slug === "hbm-ai-memory") ?? lessons[0];

  return (
    <main className="overflow-hidden bg-bg0">
      <section className="relative border-b border-line/70 px-5 pb-12 pt-12 text-center sm:px-6 md:pb-16 md:pt-20 lg:px-8">
        <div className="technical-hero-bg" aria-hidden />
        <div className="relative mx-auto max-w-4xl">
          <p className="mb-6 inline-flex min-h-8 items-center gap-2 rounded-full border border-teal/25 bg-teal/10 px-4 text-xs font-bold text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
            로그인 없는 반도체 학습 오픈소스 프로젝트
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-normal sm:text-5xl md:text-6xl">
            반도체를 처음부터
            <br />
            <span className="bg-gradient-to-r from-blue to-teal bg-clip-text text-transparent">
              실무 관점까지 읽히게
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            중학생도 시작할 수 있는 쉬운 설명에서 출발해 DRAM, HBM, EUV처럼
            삼성전자와 SK하이닉스 기술 자료에 자주 나오는 키워드를 구조와
            트레이드오프까지 연결합니다.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/level"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue px-6 text-sm font-black text-bg0 transition hover:bg-teal"
            >
              <SlidersHorizontal size={18} aria-hidden />
              내 레벨 찾기
            </Link>
            <Link
              href="/learn"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line bg-bg3 px-6 text-sm font-bold text-ink transition hover:border-white/20"
            >
              <BookOpen size={18} aria-hidden />
              교재 읽기
            </Link>
            <a
              href="https://github.com/pigpgw/semiconductor-education"
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line bg-bg3 px-6 text-sm font-bold text-ink transition hover:border-white/20"
            >
              <Github size={18} aria-hidden />
              GitHub
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted/60">
              참고 자료 출처
            </span>
            {references.map((reference) => (
              <span
                key={reference}
                className="rounded-md border border-line bg-bg2 px-3 py-1.5 text-xs font-semibold text-muted"
              >
                {reference}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-px grid max-w-5xl grid-cols-2 gap-px overflow-hidden border-y border-line bg-line sm:rounded-xl sm:border md:grid-cols-4">
        {[
          { value: "3", unit: "단계", label: "레벨 진단" },
          { value: String(lessons.length), unit: "편", label: "핵심 글" },
          { value: String(roadmap.length), unit: "단계", label: "로드맵" },
          { value: "0", unit: "원", label: "무료 학습" }
        ].map((stat) => (
          <div key={stat.label} className="bg-bg0 px-5 py-7 text-center">
            <div className="text-3xl font-black tracking-normal">
              {stat.value}
              <span className="ml-1 text-lg text-blue">{stat.unit}</span>
            </div>
            <div className="mt-1 text-xs font-semibold text-muted/70">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Curriculum"
          title="5개의 학습 트랙"
          description="기존 MVP 내용을 유지하면서, 사용자가 어디서 시작할지 더 빠르게 고를 수 있게 정리했습니다."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {tracks.map((track) => {
            const Icon = track.icon;

            return (
              <article
                key={track.label}
                className={`relative flex min-h-[250px] flex-col overflow-hidden rounded-xl border border-line bg-paper p-5 transition after:absolute after:inset-x-0 after:top-0 after:h-0.5 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-soft ${track.border}`}
              >
                <p className={`text-[10px] font-black uppercase tracking-[0.18em] ${track.tone}`}>
                  {track.label}
                </p>
                <div className={`mt-4 grid h-11 w-11 place-items-center rounded-lg ${track.bg}`}>
                  <Icon className={track.tone} size={22} aria-hidden />
                </div>
                <h2 className="mt-4 text-lg font-black">{track.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{track.description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-line bg-bg3 px-2.5 py-1 text-[11px] font-semibold text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Divider />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Doc Design"
          title="문서형 학습 경험"
          description="사이드바 프리뷰, 핵심 콜아웃, 짧은 기술 블록으로 본문 진입 부담을 낮춥니다."
        />
        <div className="mt-8 overflow-hidden rounded-xl border border-line bg-paper md:grid md:grid-cols-[220px_1fr]">
          <aside className="border-b border-line bg-bg0 p-5 md:border-b-0 md:border-r">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-muted/60">
              핵심 글
            </p>
            <div className="mt-3 grid gap-1">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.slug}
                  href={`/learn/${lesson.slug}`}
                  className={`focus-ring flex min-h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold transition ${
                    lesson.slug === featuredLesson.slug
                      ? "bg-blue/10 text-blue"
                      : "text-muted hover:bg-bg2 hover:text-ink"
                  }`}
                >
                  <span className="h-1 w-1 rounded-full bg-current opacity-60" aria-hidden />
                  {lesson.category}
                </Link>
              ))}
            </div>
            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.18em] text-muted/60">
              보조 도구
            </p>
            <div className="mt-3 grid gap-1">
              {[
                { href: "/roadmap", label: "학습 로드맵" },
                { href: "/glossary", label: "용어 사전" },
                { href: "/practice", label: "복습 질문" }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring flex min-h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-muted transition hover:bg-bg2 hover:text-ink"
                >
                  <span className="h-1 w-1 rounded-full bg-current opacity-60" aria-hidden />
                  {item.label}
                </Link>
              ))}
            </div>
          </aside>
          <article className="p-6 sm:p-8">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-muted/60">
              {featuredLesson.level} · {featuredLesson.category}
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-normal sm:text-3xl">
              {featuredLesson.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-muted sm:text-base">
              {featuredLesson.description}
            </p>
            <div className="mt-6 rounded-r-xl border-l-4 border-blue bg-blue/10 p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.12em] text-blue">
                핵심 개념
              </p>
              <p className="mt-2 text-sm leading-7 text-muted">
                쉬운 결론으로 시작한 뒤 실제 구조, 트레이드오프, 공식 자료
                근거, 체크 질문 순서로 깊이를 올립니다.
              </p>
            </div>
            <pre className="mt-5 overflow-x-auto rounded-lg border border-line bg-bg0 p-4 text-xs leading-7 text-muted">
              <code>{`// 글 하나의 읽기 흐름
beginner: 한 줄 결론 + 쉬운 비유
applied: 구조 + 비교표 + 용도
field: 병목 + 수율 + 패키징 + 고객 검증`}</code>
            </pre>
          </article>
        </div>
      </section>

      <Divider />

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Roadmap"
          title="처음부터 실무 관점까지"
          description="현재 MVP의 6단계 로드맵을 타임라인 형태로 보여줍니다."
        />
        <div className="mt-9 grid gap-0">
          {roadmap.map((item, index) => (
            <article
              key={item.step}
              className="grid grid-cols-[64px_24px_1fr] gap-x-4 sm:grid-cols-[84px_28px_1fr]"
            >
              <div className="pt-1 text-right">
                <p className="text-2xl font-black leading-none text-muted/50">{item.step}</p>
                <p className="mt-1 text-[10px] font-bold text-muted/50">
                  Step
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span
                  className={`mt-1 h-3 w-3 rounded-full ${
                    index === 0 ? "bg-teal shadow-[0_0_0_5px_rgba(0,212,164,0.12)]" : "bg-blue shadow-[0_0_0_5px_rgba(77,142,255,0.12)]"
                  }`}
                  aria-hidden
                />
                <span
                  className={`my-2 w-px flex-1 ${
                    index === roadmap.length - 1 ? "bg-transparent" : "bg-line"
                  }`}
                  aria-hidden
                />
              </div>
              <div className="pb-9">
                <h2 className="text-base font-black">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Divider />

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-6 lg:px-8">
        <SectionHeader tag="Latest Docs" title="최근 작성된 문서" />
        <div className="mt-8 overflow-hidden rounded-xl border border-line">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.slug}
              href={`/learn/${lesson.slug}`}
              className="focus-ring flex min-h-16 items-start gap-4 border-b border-line bg-paper px-5 py-4 transition last:border-b-0 hover:bg-bg2 sm:items-center"
            >
              <span
                className={`rounded-md border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.06em] ${
                  index === 0
                    ? "border-teal/20 bg-teal/10 text-teal"
                    : index === 1
                      ? "border-blue/20 bg-blue/10 text-blue"
                      : "border-saffron/20 bg-saffron/10 text-saffron"
                }`}
              >
                {index === 0 ? "New" : index === 1 ? "Core" : "Deep"}
              </span>
              <span className="min-w-0 flex-1 text-sm font-bold sm:text-base">
                {lesson.title}
              </span>
              <span className="hidden text-xs font-semibold text-muted sm:inline">
                {lesson.category}
              </span>
              <ArrowRight className="text-muted" size={16} aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="technical-panel relative overflow-hidden rounded-xl border border-white/15 bg-paper px-6 py-11 text-center shadow-soft sm:px-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/60 to-transparent" aria-hidden />
          <Rocket className="mx-auto text-teal" size={32} aria-hidden />
          <h2 className="mt-5 text-2xl font-black tracking-normal sm:text-3xl">
            바로 읽고, 자기 수준에 맞게 이어갑니다.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-muted sm:text-base">
            로그인 없이 레벨을 고르고, 핵심 글 3편부터 읽은 뒤 로드맵과 복습
            질문으로 이해를 확인합니다.
          </p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/level"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue px-6 text-sm font-black text-bg0 transition hover:bg-teal"
            >
              학습 시작하기 <ArrowRight size={17} aria-hidden />
            </Link>
            <a
              href="https://github.com/pigpgw/semiconductor-education"
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line bg-bg3 px-6 text-sm font-bold text-ink transition hover:border-white/20"
            >
              GitHub에서 보기 <Github size={17} aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeader({
  tag,
  title,
  description
}: {
  tag: string;
  title: string;
  description?: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue">
        {tag}
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-normal sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function Divider() {
  return <hr className="mx-5 border-0 border-t border-line sm:mx-6 lg:mx-8" />;
}
