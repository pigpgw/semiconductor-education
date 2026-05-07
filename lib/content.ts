import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { slugifyHeading } from "@/lib/format";

const lessonsDirectory = path.join(process.cwd(), "content", "lessons");

type Source = {
  title: string;
  url: string;
};

type LessonFrontmatter = {
  title: string;
  description: string;
  level: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  learningGoals: string[];
  prerequisites: string[];
  sources: Source[];
};

export type Lesson = LessonFrontmatter & {
  slug: string;
  content: string;
};

export type LessonSummary = Omit<Lesson, "content">;

function assertString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid frontmatter field: ${field}`);
  }

  return value;
}

function assertStringArray(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
    throw new Error(`Invalid frontmatter field: ${field}`);
  }

  return value;
}

function assertSources(value: unknown): Source[] {
  if (
    !Array.isArray(value) ||
    !value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "title" in item &&
        "url" in item &&
        typeof item.title === "string" &&
        item.title.trim().length > 0 &&
        typeof item.url === "string" &&
        URL.canParse(item.url)
    )
  ) {
    throw new Error("Invalid frontmatter field: sources");
  }

  return value;
}

function parseLesson(fileName: string): Lesson {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(lessonsDirectory, fileName);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);

  const lesson: Lesson = {
    slug,
    title: assertString(data.title, "title"),
    description: assertString(data.description, "description"),
    level: assertString(data.level, "level"),
    category: assertString(data.category, "category"),
    tags: assertStringArray(data.tags, "tags"),
    publishedAt: assertString(data.publishedAt, "publishedAt"),
    updatedAt: assertString(data.updatedAt, "updatedAt"),
    learningGoals: assertStringArray(data.learningGoals, "learningGoals"),
    prerequisites: assertStringArray(data.prerequisites, "prerequisites"),
    sources: assertSources(data.sources),
    content
  };

  return lesson;
}

export const getAllLessons = cache((): Lesson[] => {
  const files = fs
    .readdirSync(lessonsDirectory)
    .filter((file) => file.endsWith(".mdx"));

  return files
    .map(parseLesson)
    .sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
});

export function getLessonBySlug(slug: string) {
  return getAllLessons().find((lesson) => lesson.slug === slug);
}

export function getNextLesson(slug: string) {
  const lessons = getAllLessons();
  const index = lessons.findIndex((lesson) => lesson.slug === slug);

  if (index === -1) {
    return undefined;
  }

  return lessons[index + 1];
}

export function getLessonFilters() {
  const lessons = getAllLessons();

  return {
    levels: Array.from(new Set(lessons.map((lesson) => lesson.level))).sort(),
    categories: Array.from(new Set(lessons.map((lesson) => lesson.category))).sort()
  };
}

export function extractHeadings(content: string) {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const title = line.replace(/^##\s+/, "").trim();

      return {
        title,
        id: slugifyHeading(title)
      };
    });
}
