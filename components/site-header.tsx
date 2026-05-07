"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/level", label: "레벨" },
  { href: "/roadmap", label: "로드맵" },
  { href: "/learn", label: "교재" },
  { href: "/practice", label: "복습" },
  { href: "/glossary", label: "용어사전" }
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
    <header className="sticky top-0 z-40 border-b border-line bg-bg0/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-2.5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link
          href="/"
          className="focus-ring inline-flex min-h-10 shrink-0 items-center gap-3 self-start rounded-md text-sm font-black"
        >
          <span className="grid h-8 w-8 grid-cols-3 gap-0.5 rounded-lg border border-white/20 bg-bg3 p-1.5">
            {Array.from({ length: 9 }).map((_, index) => (
              <span
                key={index}
                className={`rounded-[2px] ${
                  index === 1 || index === 4 ? "bg-teal" : "bg-blue/70"
                }`}
                aria-hidden
              />
            ))}
          </span>
          <span className="tracking-normal">
            Semiconductor <span className="text-blue">Education</span>
          </span>
        </Link>

        <nav
          className="no-scrollbar -mx-5 flex w-[calc(100%+2.5rem)] flex-nowrap items-center gap-1 overflow-x-auto px-5 pb-1 text-sm font-bold sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 lg:mx-0 lg:w-auto lg:justify-end lg:px-0 lg:pb-0"
          aria-label="주요 탐색"
        >
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`focus-ring inline-flex min-h-10 shrink-0 items-center rounded-md px-3 transition ${
                  active
                    ? "bg-bg3 text-ink"
                    : "text-muted hover:bg-bg3 hover:text-ink"
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
            className="focus-ring inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-line bg-bg3 px-4 text-xs font-bold text-muted transition hover:border-white/20 hover:text-ink"
          >
            <Github size={17} aria-hidden />
            GitHub ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
