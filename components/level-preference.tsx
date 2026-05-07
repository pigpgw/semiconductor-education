"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { levels } from "@/lib/levels";

const storageKey = "semiconductor-education-level";

export function LevelPreference() {
  const [selectedLevel, setSelectedLevel] = useState("");

  useEffect(() => {
    setSelectedLevel(window.localStorage.getItem(storageKey) ?? "");
  }, []);

  const selected = useMemo(
    () => levels.find((level) => level.label === selectedLevel),
    [selectedLevel]
  );

  function updateLevel(value: string) {
    setSelectedLevel(value);

    if (value) {
      window.localStorage.setItem(storageKey, value);
      return;
    }

    window.localStorage.removeItem(storageKey);
  }

  return (
    <div className="flex flex-col gap-2 border-t border-line pt-3 text-sm md:flex-row md:items-center md:border-t-0 md:pt-0">
      <label
        htmlFor="site-level"
        className="inline-flex min-h-10 items-center gap-2 font-black text-muted"
      >
        <SlidersHorizontal size={16} aria-hidden />
        내 레벨
      </label>
      <select
        id="site-level"
        value={selectedLevel}
        onChange={(event) => updateLevel(event.target.value)}
        className="focus-ring min-h-10 rounded-md border border-line bg-paper px-3 text-sm font-bold text-ink"
      >
        <option value="">미설정</option>
        {levels.map((level) => (
          <option key={level.id} value={level.label}>
            {level.label}
          </option>
        ))}
      </select>
      <Link
        href={selected?.href ?? "/level"}
        className="focus-ring inline-flex min-h-10 items-center justify-center rounded-md border border-line px-3 text-sm font-bold text-muted hover:border-teal hover:text-teal"
      >
        {selected ? "맞춤 글" : "진단"}
      </Link>
      <span className="text-xs font-semibold text-muted">
        로그인 없이 저장
      </span>
    </div>
  );
}
