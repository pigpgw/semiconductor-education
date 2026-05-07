import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-bg0">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p className="font-semibold">
          Semiconductor Education. 로그인 없이 바로 읽는 반도체 학습 노트.
        </p>
        <p>
          <Link className="font-bold hover:text-teal" href="/industry">
            산업 업데이트
          </Link>{" "}
          ·{" "}
          <Link className="font-bold hover:text-teal" href="/sources">
            공식 출처
          </Link>{" "}
          · 계정 없음 · 쿠키 기반 인증 없음 · MIT License · 2026
        </p>
      </div>
    </footer>
  );
}
