import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { performance } from "node:perf_hooks";

const sourceFile = new URL("../lib/sources.ts", import.meta.url);
const sourceText = readFileSync(sourceFile, "utf8");
const requestTimeoutMs = 20000;
const defaultLimit = 5;

function parseArgs(argv) {
  return argv.reduce(
    (options, arg) => {
      if (arg.startsWith("--limit=")) {
        return {
          ...options,
          limit: Number(arg.slice("--limit=".length))
        };
      }

      if (arg.startsWith("--source=")) {
        return {
          ...options,
          sourceId: arg.slice("--source=".length)
        };
      }

      if (arg === "--strict") {
        return {
          ...options,
          strict: true
        };
      }

      return options;
    },
    { limit: defaultLimit, sourceId: undefined, strict: false }
  );
}

function getField(block, field) {
  return block.match(new RegExp(`${field}: "([^"]+)"`))?.[1];
}

function getArrayField(block, field) {
  const match = block.match(new RegExp(`${field}: \\[([^\\]]*)\\]`));

  if (!match) {
    return [];
  }

  return Array.from(match[1].matchAll(/"([^"]+)"/g)).map(([, value]) => value);
}

function extractOfficialSources(text) {
  const arrayMatch = text.match(
    /export const officialSources: OfficialSource\[\] = \[([\s\S]*?)\];/
  );

  if (!arrayMatch) {
    throw new Error("Could not find officialSources array in lib/sources.ts.");
  }

  return Array.from(arrayMatch[1].matchAll(/\{\n([\s\S]*?)\n {2}\}/g)).map(
    ([, block]) => ({
      id: getField(block, "id"),
      name: getField(block, "name"),
      url: getField(block, "url"),
      feedUrl: getField(block, "feedUrl"),
      crawlPolicy: getField(block, "crawlPolicy"),
      topics: getArrayField(block, "topics")
    })
  );
}

function cleanXmlText(value) {
  if (!value) {
    return undefined;
  }

  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(Number.parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, decimal) =>
      String.fromCodePoint(Number.parseInt(decimal, 10))
    )
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value, maxLength = 320) {
  if (!value || value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 3).trim()}...`;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getTagContent(block, tags) {
  for (const tag of tags) {
    const escapedTag = escapeRegex(tag);
    const match = block.match(
      new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)</${escapedTag}>`, "i")
    );

    if (match) {
      return cleanXmlText(match[1]);
    }
  }

  return undefined;
}

function getLink(block) {
  const tagLink = getTagContent(block, ["link"]);

  if (tagLink) {
    return tagLink;
  }

  return block.match(/<link[^>]+href="([^"]+)"/i)?.[1];
}

function normalizeUrl(value, baseUrl) {
  if (!value) {
    return undefined;
  }

  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return undefined;
  }
}

function normalizeDate(value) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toISOString();
}

function makeCandidateId(sourceId, url) {
  return `${sourceId}-${createHash("sha1").update(url).digest("hex").slice(0, 10)}`;
}

function parseFeedItems(source, xml, limit, fetchedAt) {
  const blocks = Array.from(
    xml.matchAll(/<(item|entry)\b[\s\S]*?<\/\1>/gi),
    (match) => match[0]
  );

  return blocks
    .map((block) => {
      const url = normalizeUrl(getLink(block), source.url);
      const title = getTagContent(block, ["title"]);

      if (!url || !title) {
        return null;
      }

      const publishedAt = normalizeDate(
        getTagContent(block, ["pubDate", "published", "updated", "dc:date"])
      );
      const excerpt = truncate(getTagContent(block, ["description", "summary"]));

      return {
        id: makeCandidateId(source.id, url),
        sourceId: source.id,
        sourceName: source.name,
        title,
        url,
        publishedAt,
        fetchedAt,
        topics: source.topics,
        status: "review-needed",
        excerpt
      };
    })
    .filter(Boolean)
    .slice(0, limit);
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    return await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "semiconductor-education-feed-collector/1.0"
      }
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchWithRetry(url, attempts = 2) {
  let lastError;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await fetchWithTimeout(url);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

async function collectSource(source, limit, fetchedAt) {
  try {
    const response = await fetchWithRetry(source.feedUrl);
    const xml = await response.text();
    const reachable = response.status >= 200 && response.status < 400;
    const feedLike = /<rss|<feed|<rdf:RDF/i.test(xml);
    const items = reachable && feedLike ? parseFeedItems(source, xml, limit, fetchedAt) : [];

    return {
      sourceId: source.id,
      sourceName: source.name,
      feedUrl: source.feedUrl,
      ok: reachable && feedLike && items.length > 0,
      status: response.status,
      finalUrl: response.url,
      itemCount: items.length,
      items
    };
  } catch (error) {
    return {
      sourceId: source.id,
      sourceName: source.name,
      feedUrl: source.feedUrl,
      ok: false,
      itemCount: 0,
      items: [],
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

const startedAt = performance.now();
const options = parseArgs(process.argv.slice(2));
const limit = Number.isFinite(options.limit) && options.limit > 0 ? options.limit : defaultLimit;
const fetchedAt = new Date().toISOString();
const sources = extractOfficialSources(sourceText)
  .filter((source) => source.crawlPolicy === "rss" && source.feedUrl)
  .filter((source) => !options.sourceId || source.id === options.sourceId);

if (sources.length === 0) {
  console.error(
    JSON.stringify(
      {
        ok: false,
        reason: options.sourceId
          ? `No RSS source found for ${options.sourceId}.`
          : "No RSS sources found."
      },
      null,
      2
    )
  );
  process.exit(1);
}

const sourcesWithItems = await Promise.all(
  sources.map((source) => collectSource(source, limit, fetchedAt))
);
const failures = sourcesWithItems.filter((source) => !source.ok);
const items = sourcesWithItems.flatMap((source) => source.items);
const ok = items.length > 0 && (!options.strict || failures.length === 0);
const report = {
  ok,
  partial: failures.length > 0,
  fetchedAt,
  sourceCount: sourcesWithItems.length,
  itemCount: items.length,
  limitPerSource: limit,
  durationMs: Math.round(performance.now() - startedAt),
  failures,
  sources: sourcesWithItems,
  items
};

if (!ok) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(report, null, 2));
