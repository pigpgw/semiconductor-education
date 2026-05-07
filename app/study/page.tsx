import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LockKeyholeOpen } from "lucide-react";
import { LocalStudyPanel } from "@/components/local-study-panel";

export const metadata: Metadata = {
  title: "로컬 학습 관리",
  description:
    "로그인 없이 현재 브라우저에만 저장되는 반도체 학습 체크리스트와 노트입니다."
};

export default function StudyPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-normal text-teal">
          Study
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
          로그인 없이 진도와 노트를 현재 브라우저에만 남깁니다.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          지방이나 오프라인 교육 접근이 어려운 학습자도 계정 생성 없이 바로
          시작할 수 있어야 합니다. 이 페이지는 서버 저장 없이 체크리스트와
          노트 템플릿만 제공합니다.
        </p>
      </section>

      <section className="mt-8 border border-line bg-paper p-5">
        <div className="flex items-center gap-3">
          <LockKeyholeOpen className="text-teal" size={22} aria-hidden />
          <h2 className="text-xl font-black">개인정보를 요구하지 않습니다.</h2>
        </div>
        <p className="mt-3 max-w-3xl leading-8 text-muted">
          이 기능은 이름, 이메일, 학교, 지역을 입력받지 않습니다. 다른 기기와
          동기화되지 않는 대신, 계정과 인증 없이 바로 쓸 수 있습니다.
        </p>
      </section>

      <div className="mt-10">
        <LocalStudyPanel />
      </div>

      <section className="mt-10 border border-line bg-ink p-6 text-white">
        <h2 className="text-2xl font-black">다른 기기에서 이어 보려면</h2>
        <p className="mt-3 max-w-3xl leading-8 text-white/80">
          노트 복사 버튼으로 학습 노트를 복사해 개인 메모 앱에 저장하세요.
          계정 없는 정책을 유지하기 위해 서버 동기화는 제공하지 않습니다.
        </p>
        <Link
          href="/practice"
          className="focus-ring mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-4 text-sm font-bold text-ink transition hover:bg-teal hover:text-white"
        >
          복습으로 이동 <ArrowRight size={17} aria-hidden />
        </Link>
      </section>
    </main>
  );
}
