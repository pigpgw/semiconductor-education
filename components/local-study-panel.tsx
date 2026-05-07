"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clipboard, RotateCcw } from "lucide-react";
import { noteTemplate, studyTasks } from "@/lib/study";

const progressKey = "semiconductor-education-study-progress";
const noteKey = "semiconductor-education-study-note";

type Progress = Record<string, boolean>;

export function LocalStudyPanel() {
  const [progress, setProgress] = useState<Progress>({});
  const [note, setNote] = useState(noteTemplate);
  const [copyState, setCopyState] = useState("노트 복사");

  useEffect(() => {
    const savedProgress = window.localStorage.getItem(progressKey);
    const savedNote = window.localStorage.getItem(noteKey);

    if (savedProgress) {
      setProgress(JSON.parse(savedProgress) as Progress);
    }

    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  const completedCount = useMemo(
    () => studyTasks.filter((task) => progress[task.id]).length,
    [progress]
  );
  const percent = Math.round((completedCount / studyTasks.length) * 100);

  function updateTask(id: string, checked: boolean) {
    const next = {
      ...progress,
      [id]: checked
    };

    setProgress(next);
    window.localStorage.setItem(progressKey, JSON.stringify(next));
  }

  function updateNote(value: string) {
    setNote(value);
    window.localStorage.setItem(noteKey, value);
  }

  function resetLocalData() {
    setProgress({});
    setNote(noteTemplate);
    setCopyState("노트 복사");
    window.localStorage.removeItem(progressKey);
    window.localStorage.removeItem(noteKey);
  }

  async function copyNote() {
    await window.navigator.clipboard.writeText(note);
    setCopyState("복사됨");
    window.setTimeout(() => setCopyState("노트 복사"), 1400);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="border border-line bg-paper p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-black text-teal">로컬 진도</p>
            <h2 className="mt-2 text-2xl font-black">계정 없이 현재 브라우저에만 저장합니다.</h2>
          </div>
          <button
            type="button"
            onClick={resetLocalData}
            className="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-line px-3 text-sm font-bold text-muted hover:border-teal hover:text-teal"
          >
            <RotateCcw size={16} aria-hidden />
            초기화
          </button>
        </div>

        <div className="mt-5 border border-line bg-surface p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-black">
              {completedCount}/{studyTasks.length} 완료
            </p>
            <p className="text-sm font-black text-teal">{percent}%</p>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-line">
            <div
              className="h-full bg-teal transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {studyTasks.map((task) => {
            const checked = progress[task.id] ?? false;

            return (
              <article key={task.id} className="border border-line bg-surface p-4">
                <label className="flex cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => updateTask(task.id, event.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-line accent-teal"
                  />
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-black">{task.title}</span>
                      <span className="rounded-full border border-line bg-paper px-2 py-0.5 text-xs font-bold text-muted">
                        {task.level}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-muted">
                      {task.description}
                    </span>
                  </span>
                </label>
                <Link
                  href={task.href}
                  className="focus-ring mt-3 inline-flex min-h-10 items-center rounded-md text-sm font-bold text-teal hover:text-ink"
                >
                  바로 이동
                </Link>
              </article>
            );
          })}
        </div>
      </div>

      <aside className="border border-line bg-paper p-5">
        <div className="flex items-center gap-3">
          <Clipboard className="text-teal" size={21} aria-hidden />
          <h2 className="text-xl font-black">학습 노트</h2>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted">
          서버에 저장하지 않습니다. 현재 브라우저에만 남기고, 필요하면 복사해서
          개인 노트에 붙여 넣습니다.
        </p>
        <textarea
          value={note}
          onChange={(event) => updateNote(event.target.value)}
          className="focus-ring mt-4 min-h-[520px] w-full resize-y rounded-md border border-line bg-surface p-3 font-mono text-xs leading-6 text-ink"
          aria-label="학습 노트"
        />
        <button
          type="button"
          onClick={copyNote}
          className="focus-ring mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-bold text-white hover:bg-teal"
        >
          <CheckCircle2 size={17} aria-hidden />
          {copyState}
        </button>
      </aside>
    </section>
  );
}
