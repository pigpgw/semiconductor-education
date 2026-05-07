import type { ReactNode } from "react";
import { CheckCircle2, Lightbulb, Wrench } from "lucide-react";
import { slugifyHeading } from "@/lib/format";

function childrenToText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(childrenToText).join("");
  }

  return "";
}

function OneLine({ children }: { children: ReactNode }) {
  return (
    <div className="border border-teal/25 bg-teal/10 p-5">
      <div className="flex items-center gap-2 text-sm font-black text-teal">
        <Lightbulb size={18} aria-hidden />
        한 줄 결론
      </div>
      <div className="mt-3 text-lg font-extrabold leading-8 text-ink">
        {children}
      </div>
    </div>
  );
}

function Term({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <aside className="border border-line bg-paper p-5">
      <div className="flex items-center gap-2 text-sm font-black text-saffron">
        <Wrench size={18} aria-hidden />
        용어 설명
      </div>
      <h3 className="mt-2 text-lg font-black">{title}</h3>
      <div className="mt-2 text-sm leading-7 text-muted">{children}</div>
    </aside>
  );
}

function splitItems(value: string[] | string | undefined) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    return value
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function IndustryKeywords({ items }: { items?: string[] | string }) {
  const keywords = splitItems(items);

  return (
    <div className="border border-line bg-surface p-5">
      <h3 className="text-base font-black">현업 키워드</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {keywords.map((item) => (
          <span
            key={item}
            className="rounded-full border border-line bg-paper px-3 py-1 text-sm font-bold text-ink"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function CheckQuestions({ questions }: { questions?: string[] | string }) {
  const items = splitItems(questions);

  return (
    <section className="border border-line bg-paper p-5">
      <h3 className="flex items-center gap-2 text-base font-black">
        <CheckCircle2 className="text-teal" size={19} aria-hidden />
        체크 질문
      </h3>
      <ol className="mt-3 space-y-2 pl-5">
        {items.map((question) => (
          <li key={question} className="font-semibold leading-7">
            {question}
          </li>
        ))}
      </ol>
    </section>
  );
}

export const mdxComponents = {
  h2: ({ children }: { children: ReactNode }) => {
    const title = childrenToText(children);
    const id = slugifyHeading(title);

    return <h2 id={id}>{children}</h2>;
  },
  h3: ({ children }: { children: ReactNode }) => {
    const title = childrenToText(children);
    const id = slugifyHeading(title);

    return <h3 id={id}>{children}</h3>;
  },
  OneLine,
  Term,
  IndustryKeywords,
  CheckQuestions
};
