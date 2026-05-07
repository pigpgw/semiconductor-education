import { existsSync } from "node:fs";
import { chromium } from "playwright-core";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const macChromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const linuxChromePath = "/usr/bin/google-chrome";

function getLaunchOptions() {
  if (process.env.CHROME_PATH) {
    return { executablePath: process.env.CHROME_PATH };
  }

  if (process.platform === "darwin" && existsSync(macChromePath)) {
    return { executablePath: macChromePath };
  }

  if (process.platform === "linux" && existsSync(linuxChromePath)) {
    return { executablePath: linuxChromePath };
  }

  return { channel: "chrome" };
}

const pages = [
  "/",
  "/level",
  "/roadmap",
  "/glossary",
  "/sources",
  "/industry",
  "/learn",
  "/study",
  "/practice",
  "/learn/dram-basics",
  "/learn/hbm-ai-memory",
  "/learn/euv-dram-scaling"
];

const widths = [360, 390, 768, 1280];
const failures = [];

const browser = await chromium.launch({
  ...getLaunchOptions(),
  headless: true
});

for (const pagePath of pages) {
  for (const width of widths) {
    const page = await browser.newPage({
      viewport: {
        width,
        height: 1200
      }
    });

    const consoleErrors = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    const response = await page.goto(`${baseUrl}${pagePath}`, {
      waitUntil: "domcontentloaded"
    });

    await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});

    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
      bodyClientWidth: document.body.clientWidth
    }));

    const overflow =
      metrics.scrollWidth > metrics.clientWidth + 1 ||
      metrics.bodyScrollWidth > metrics.bodyClientWidth + 1;

    if (!response || !response.ok() || overflow || consoleErrors.length > 0) {
      failures.push({
        pagePath,
        width,
        status: response?.status(),
        metrics,
        consoleErrors
      });
    }

    await page.close();
  }
}

await browser.close();

if (failures.length > 0) {
  console.error(JSON.stringify({ ok: false, failures }, null, 2));
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      baseUrl,
      pages: pages.length,
      widths
    },
    null,
    2
  )
);
