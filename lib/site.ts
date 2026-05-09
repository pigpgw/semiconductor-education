export const siteConfig = {
  name: "Semiconductor Education",
  title: "Semiconductor Education",
  description:
    "기초부터 실무 관점까지 읽는 반도체 오픈소스 문서입니다.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://semiconductor-education.vercel.app",
  repository: "https://github.com/pigpgw/semiconductor-education",
  locale: "ko_KR",
  keywords: [
    "반도체",
    "반도체 교육",
    "DRAM",
    "HBM",
    "EUV",
    "NAND",
    "SK하이닉스",
    "삼성전자",
    "semiconductor",
    "open source"
  ]
};
