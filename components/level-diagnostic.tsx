"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { getRecommendedLevel } from "@/lib/levels";

const questions = [
  {
    id: "computer",
    question: "CPU, 메모리, 저장장치가 각각 무슨 일을 하는지 설명할 수 있나요?",
    answers: [
      { label: "아직 어렵다", score: 0 },
      { label: "대략 구분한다", score: 1 },
      { label: "예시로 설명할 수 있다", score: 2 }
    ]
  },
  {
    id: "electricity",
    question: "전압, 전류, 저항, 스위치 개념이 익숙한가요?",
    answers: [
      { label: "처음부터 필요하다", score: 0 },
      { label: "말은 알지만 연결은 약하다", score: 1 },
      { label: "회로 예시로 이해한다", score: 2 }
    ]
  },
  {
    id: "transistor",
    question: "MOSFET이나 트랜지스터를 스위치 관점으로 설명할 수 있나요?",
    answers: [
      { label: "거의 모른다", score: 0 },
      { label: "스위치라는 감각만 있다", score: 1 },
      { label: "게이트/소스/드레인까지 안다", score: 2 }
    ]
  },
  {
    id: "memory",
    question: "DRAM, NAND, HBM의 차이를 용도 기준으로 구분할 수 있나요?",
    answers: [
      { label: "이름만 들어봤다", score: 0 },
      { label: "DRAM과 SSD 차이는 안다", score: 1 },
      { label: "HBM까지 연결해 설명한다", score: 2 }
    ]
  },
  {
    id: "bandwidth",
    question: "대역폭, 지연 시간, 데이터 이동 병목을 구분해서 생각할 수 있나요?",
    answers: [
      { label: "용어부터 필요하다", score: 0 },
      { label: "빠르다는 차이만 안다", score: 1 },
      { label: "AI 병목과 연결한다", score: 2 }
    ]
  },
  {
    id: "packaging",
    question: "TSV, 적층, 패키징이 HBM 성능과 제조 난이도에 왜 중요한지 감이 있나요?",
    answers: [
      { label: "처음 듣는다", score: 0 },
      { label: "쌓는 구조라고 안다", score: 1 },
      { label: "열·수율까지 연결한다", score: 2 }
    ]
  },
  {
    id: "process",
    question: "EUV, 패터닝, 수율이 왜 공정 경쟁력과 연결되는지 감이 있나요?",
    answers: [
      { label: "처음 듣는다", score: 0 },
      { label: "미세화와 관련 있다고 안다", score: 1 },
      { label: "복잡도와 생산성까지 연결한다", score: 2 }
    ]
  },
  {
    id: "industry",
    question: "공식 기술 자료를 읽을 때 주장, 근거, 실무 제약을 분리해서 보나요?",
    answers: [
      { label: "아직은 용어 해석이 먼저다", score: 0 },
      { label: "장단점을 찾으려고 한다", score: 1 },
      { label: "실무 판단 기준을 비교한다", score: 2 }
    ]
  }
];

type Answers = Record<string, number>;

export function LevelDiagnostic() {
  const [answers, setAnswers] = useState<Answers>({});

  const answeredCount = Object.keys(answers).length;
  const score = Object.values(answers).reduce((sum, value) => sum + value, 0);
  const recommendedLevel = useMemo(() => getRecommendedLevel(score), [score]);
  const complete = answeredCount === questions.length;

  return (
    <section className="border border-line bg-paper p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-black text-teal">자가 레벨 진단</p>
          <h2 className="mt-2 text-2xl font-black">
            8개 질문으로 시작점을 찾습니다.
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setAnswers({})}
          className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-line px-3 text-sm font-bold text-muted hover:border-teal hover:text-teal"
        >
          <RotateCcw size={16} aria-hidden />
          초기화
        </button>
      </div>

      <div className="mt-6 grid gap-5">
        {questions.map((item, index) => (
          <fieldset key={item.id} className="border border-line p-4">
            <legend className="px-1 text-sm font-black">
              {index + 1}. {item.question}
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {item.answers.map((answer) => {
                const selected = answers[item.id] === answer.score;

                return (
                  <label
                    key={answer.label}
                    className={`flex min-h-12 cursor-pointer items-center rounded-md border px-3 text-sm font-bold transition ${
                      selected
                        ? "border-blue bg-blue text-bg0"
                        : "border-line bg-surface text-ink hover:border-teal"
                    }`}
                  >
                    <input
                      type="radio"
                      name={item.id}
                      value={answer.score}
                      checked={selected}
                      onChange={() =>
                        setAnswers((current) => ({
                          ...current,
                          [item.id]: answer.score
                        }))
                      }
                      className="sr-only"
                    />
                    {answer.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-6 border border-line bg-surface p-5" aria-live="polite">
        <p className="text-sm font-black text-muted">
          답변 {answeredCount}/{questions.length} · 현재 점수 {score}/16
        </p>
        <h3 className="mt-2 text-xl font-black">
          {complete
            ? `${recommendedLevel.badge} · ${recommendedLevel.label}부터 시작하세요.`
            : "모든 질문에 답하면 추천 레벨이 나옵니다."}
        </h3>
        <p className="mt-3 leading-7 text-muted">
          {complete
            ? recommendedLevel.description
            : "답을 고르는 동안에도 임시 추천은 계산됩니다. 부담 없이 현재 상태에 가장 가까운 답을 고르면 됩니다."}
        </p>
        <Link
          href={recommendedLevel.href}
          className="focus-ring mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-blue px-4 text-sm font-bold text-bg0 hover:bg-teal"
        >
          {recommendedLevel.label} 글 보기 <ArrowRight size={17} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
