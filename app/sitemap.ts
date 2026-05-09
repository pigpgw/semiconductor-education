import type { MetadataRoute } from "next";
import { getAllLessons } from "@/lib/content";
import { industryUpdates } from "@/lib/industry";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "",
  "/level",
  "/roadmap",
  "/learn",
  "/glossary",
  "/sources",
  "/industry",
  "/practice",
  "/study"
];

function toUrl(pathname: string) {
  return `${siteConfig.url}${pathname}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const lessonRoutes = getAllLessons().map((lesson) => ({
    url: toUrl(`/learn/${lesson.slug}`),
    lastModified: new Date(lesson.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));
  const industryRoutes = industryUpdates.map((update) => ({
    url: toUrl(`/industry/${update.id}`),
    lastModified: new Date(update.curatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: toUrl(route),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7
    })),
    ...lessonRoutes,
    ...industryRoutes
  ];
}
