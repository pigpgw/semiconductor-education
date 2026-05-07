"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Github } from "lucide-react";
import { LevelPreference } from "@/components/level-preference";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/level", label: "Level" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/learn", label: "Learn" },
  { href: "/study", label: "Study" },
  { href: "/practice", label: "Practice" },
  { href: "/glossary", label: "Glossary" }
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link
          href="/"
          className="focus-ring inline-flex min-h-11 items-center gap-2 self-start rounded-md text-sm font-black"
        >
          <BookOpen className="text-teal" size={20} aria-hidden />
          Semiconductor Education
        </Link>

        <div className="flex flex-col gap-3 md:items-end">
          <nav
            className="flex flex-wrap items-center gap-1 text-sm font-bold"
            aria-label="주요 탐색"
          >
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`focus-ring inline-flex min-h-10 items-center rounded-md px-3 transition ${
                    active
                      ? "bg-ink text-white"
                      : "text-muted hover:bg-surface hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="https://github.com/pigpgw/semiconductor-education"
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-md px-3 text-muted transition hover:bg-surface hover:text-ink"
            >
              <Github size={17} aria-hidden />
              GitHub
            </a>
          </nav>
          <LevelPreference />
        </div>
      </div>
    </header>
  );
}
