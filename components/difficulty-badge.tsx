const levelStyle: Record<string, string> = {
  기초: "border-teal/30 bg-teal/10 text-teal",
  중급: "border-saffron/30 bg-saffron/10 text-saffron",
  심화: "border-berry/30 bg-berry/10 text-berry"
};

export function DifficultyBadge({ level }: { level: string }) {
  return (
    <span
      className={`inline-flex min-h-7 items-center rounded-full border px-3 text-xs font-black ${
        levelStyle[level] ?? "border-line bg-surface text-muted"
      }`}
    >
      {level}
    </span>
  );
}
