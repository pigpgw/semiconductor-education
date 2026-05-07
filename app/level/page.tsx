import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPinned, MonitorCheck } from "lucide-react";
import { LevelDiagnostic } from "@/components/level-diagnostic";
import { learningPaths } from "@/lib/learning-paths";
import { levels } from "@/lib/levels";

export const metadata: Metadata = {
  title: "내 레벨 찾기",
  description:
    "반도체 학습자의 현재 이해도를 기초, 중급, 심화 3단계로 진단하고 알맞은 읽기 방식을 제안합니다."
};

export default function LevelPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-normal text-teal">
          Level guide
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
          쉽게 시작하되, 실무 판단까지 올라가는 3단계 학습입니다.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          같은 글도 독자의 배경에 따라 다르게 읽혀야 합니다. 이 사이트는
          비유와 그림으로 시작하고, 구조와 수치, 공정·패키징 제약, 산업
          의사결정까지 단계적으로 연결합니다.
        </p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3" aria-label="레벨 직접 선택">
        {levels.map((level) => (
          <article key={level.id} className="border border-line bg-paper p-5">
            <p className="text-sm font-black text-saffron">{level.badge}</p>
            <h2 className="mt-2 text-xl font-black">
              {level.label}: {level.title}
            </h2>
            <p className="mt-3 min-h-[104px] leading-7 text-muted">
              {level.description}
            </p>
            <h3 className="mt-5 text-sm font-black">이런 사람에게 맞습니다</h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
              {level.selfCheck.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link
              href={level.href}
              className="focus-ring mt-5 inline-flex min-h-11 items-center gap-2 rounded-md border border-line px-4 text-sm font-bold hover:border-teal hover:text-teal"
            >
              이 레벨로 읽기 <ArrowRight size={17} aria-hidden />
            </Link>
          </article>
        ))}
      </section>

      <div className="mt-10">
        <LevelDiagnostic />
      </div>

      <section className="mt-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-normal text-teal">
            Learning paths
          </p>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            사람마다 다른 출발점을 학습 경로로 바꿉니다.
          </h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {learningPaths.map((path) => (
            <article key={path.audience} className="border border-line bg-paper p-5">
              <h3 className="text-xl font-black">{path.audience}</h3>
              <p className="mt-2 text-sm font-bold text-teal">{path.goal}</p>
              <ol className="mt-4 space-y-2 pl-5 text-sm leading-6 text-muted">
                {path.route.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <article className="border border-line bg-paper p-5">
          <div className="flex items-center gap-3">
            <MonitorCheck className="text-teal" size={22} aria-hidden />
            <h2 className="text-xl font-black">온라인 자율 학습 기준</h2>
          </div>
          <p className="mt-4 leading-8 text-muted">
            오프라인 반도체 교육을 듣기 어려운 지역 학습자도 같은 출발선에
            설 수 있도록, 각 글은 선수지식·용어·체크 질문·공식 출처를 함께
            제공합니다. 시간표를 맞추지 못해도 자기 속도로 읽고 복습할 수
            있어야 합니다.
          </p>
        </article>
        <article className="border border-line bg-paper p-5">
          <div className="flex items-center gap-3">
            <MapPinned className="text-saffron" size={22} aria-hidden />
            <h2 className="text-xl font-black">실무 레벨까지 가는 방식</h2>
          </div>
          <p className="mt-4 leading-8 text-muted">
            쉬운 설명만 남기지 않습니다. HBM을 읽을 때는 TSV와 대역폭에서
            끝내지 않고, 열·수율·패키징·고객 검증으로 이어집니다. EUV도
            짧은 파장에서 멈추지 않고 패터닝 단계, 생산성, 양산성을 함께 봅니다.
          </p>
        </article>
      </section>
    </main>
  );
}
