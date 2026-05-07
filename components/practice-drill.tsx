"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { PracticeSet } from "@/lib/practice";

type OpenState = Record<string, boolean>;

export function PracticeDrill({ sets }: { sets: PracticeSet[] }) {
  const [openAnswers, setOpenAnswers] = useState<OpenState>({});

  function toggleAnswer(id: string) {
    setOpenAnswers((current) => ({
      ...current,
      [id]: !current[id]
    }));
  }

  return (
    <div className="grid gap-10">
      {sets.map((set) => (
        <section key={set.levelId} id={set.levelId} className="scroll-mt-28">
          <div className="border-b border-line pb-4">
            <p className="text-sm font-black text-saffron">{set.levelLabel}</p>
            <h2 className="mt-2 text-2xl font-black">{set.title}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted">
              {set.description}
            </p>
          </div>

          <div className="mt-5 grid gap-4">
            {set.questions.map((question, index) => {
              const id = `${set.levelId}-${index}`;
              const open = openAnswers[id] ?? false;

              return (
                <article key={question.question} className="border border-line bg-paper p-5">
                  <p className="text-sm font-black text-teal">
                    Question {index + 1}
                  </p>
                  <h3 className="mt-2 text-xl font-black">{question.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    힌트: {question.hint}
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleAnswer(id)}
                    aria-expanded={open}
                    className="focus-ring mt-4 inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm font-bold hover:border-teal hover:text-teal"
                  >
                    {open ? "답 숨기기" : "답 확인하기"}
                  </button>

                  {open ? (
                    <div className="mt-4 grid gap-3 border-t border-line pt-4 md:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-black">핵심 답</h4>
                        <p className="mt-2 text-sm leading-7 text-muted">
                          {question.answer}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-black">실무 포인트</h4>
                        <p className="mt-2 text-sm leading-7 text-muted">
                          {question.fieldPoint}
                        </p>
                      </div>
                      <Link
                        href={question.relatedLesson.href}
                        className="focus-ring inline-flex min-h-10 items-center gap-2 self-start rounded-md text-sm font-bold text-teal hover:text-ink md:col-span-2"
                      >
                        관련 글: {question.relatedLesson.title}
                        <ArrowRight size={16} aria-hidden />
                      </Link>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {set.scenarios.map((scenario) => (
              <article key={scenario.title} className="border border-line bg-surface p-5">
                <p className="text-sm font-black text-teal">Scenario</p>
                <h3 className="mt-2 text-xl font-black">{scenario.title}</h3>
                <p className="mt-3 leading-7 text-muted">{scenario.prompt}</p>
                <ul className="mt-4 grid gap-2">
                  {scenario.checkpoints.map((checkpoint) => (
                    <li key={checkpoint} className="flex gap-3 text-sm leading-6 text-muted">
                      <CheckCircle2
                        className="mt-0.5 shrink-0 text-teal"
                        size={17}
                        aria-hidden
                      />
                      {checkpoint}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
