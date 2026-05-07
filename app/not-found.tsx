import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black">페이지를 찾을 수 없습니다.</h1>
      <p className="mt-4 leading-8 text-muted">
        주소가 바뀌었거나 아직 작성되지 않은 교재입니다.
      </p>
      <Link
        href="/learn"
        className="focus-ring mt-6 inline-flex min-h-11 items-center rounded-md bg-ink px-4 text-sm font-bold text-white hover:bg-teal"
      >
        교재 목록으로 이동
      </Link>
    </main>
  );
}
