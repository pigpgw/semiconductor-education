export type SourceCompanyType =
  | "memory"
  | "foundry"
  | "equipment"
  | "metrology"
  | "research";

export type CrawlPolicy = "manual" | "rss" | "metadata-only";

export type OfficialSource = {
  id: string;
  name: string;
  companyType: SourceCompanyType;
  url: string;
  language: "ko" | "en" | "multi";
  crawlPolicy: CrawlPolicy;
  topics: string[];
  readFor: string;
  note: string;
  relatedLessons: string[];
  verifiedAt: string;
};

export const companyTypeLabels: Record<SourceCompanyType, string> = {
  memory: "메모리",
  foundry: "파운드리",
  equipment: "장비",
  metrology: "계측/수율",
  research: "연구"
};

export const crawlPolicyLabels: Record<CrawlPolicy, string> = {
  manual: "수동 큐레이션",
  rss: "RSS/API 우선",
  "metadata-only": "메타데이터만"
};

export const officialSources: OfficialSource[] = [
  {
    id: "samsung-semiconductor-tech-blog",
    name: "Samsung Semiconductor Tech Blog",
    companyType: "memory",
    url: "https://semiconductor.samsung.com/news-events/tech-blog/",
    language: "multi",
    crawlPolicy: "metadata-only",
    topics: ["DRAM", "HBM", "CXL", "SSD", "EUV", "Foundry"],
    readFor:
      "제품 소개 문장을 기술 구조, 고객 요구, 양산 관점으로 분리해 읽습니다.",
    note:
      "DRAM, HBM, EUV처럼 MVP 핵심 글의 공식 근거로 먼저 확인할 출처입니다.",
    relatedLessons: ["dram-basics", "hbm-ai-memory", "euv-dram-scaling"],
    verifiedAt: "2026-05-07"
  },
  {
    id: "sk-hynix-newsroom",
    name: "SK hynix Newsroom",
    companyType: "memory",
    url: "https://news.skhynix.co.kr/",
    language: "ko",
    crawlPolicy: "metadata-only",
    topics: ["HBM", "DRAM", "NAND", "AI Memory", "CXL", "PIM"],
    readFor:
      "AI 메모리 포트폴리오, 시스템 병목, 기술 리더 인터뷰를 산업 맥락으로 읽습니다.",
    note:
      "HBM과 차세대 메모리 계층을 SK하이닉스 관점에서 확인하기 좋은 공식 뉴스룸입니다.",
    relatedLessons: ["hbm-ai-memory", "dram-basics"],
    verifiedAt: "2026-05-07"
  },
  {
    id: "micron-newsroom",
    name: "Micron Newsroom",
    companyType: "memory",
    url: "https://www.micron.com/about/press/news",
    language: "en",
    crawlPolicy: "metadata-only",
    topics: ["DRAM", "NAND", "Data Center", "AI Memory", "SSD"],
    readFor:
      "메모리 제품 발표를 경쟁 구도와 데이터센터 요구 조건 관점으로 읽습니다.",
    note:
      "Samsung, SK hynix 외 메모리 기업의 제품 방향을 비교할 때 활용합니다.",
    relatedLessons: ["dram-basics", "hbm-ai-memory"],
    verifiedAt: "2026-05-07"
  },
  {
    id: "tsmc-technology",
    name: "TSMC Technology",
    companyType: "foundry",
    url: "https://www.tsmc.com/english/dedicatedFoundry/technology",
    language: "en",
    crawlPolicy: "manual",
    topics: ["Process Node", "Advanced Packaging", "3D IC", "OIP"],
    readFor:
      "공정 노드와 패키징 로드맵을 제품 발표가 아니라 제조 플랫폼 관점으로 읽습니다.",
    note:
      "자동 요청은 제한될 수 있어 수동 확인을 우선하고 원문 링크만 제공합니다.",
    relatedLessons: ["euv-dram-scaling", "hbm-ai-memory"],
    verifiedAt: "2026-05-07"
  },
  {
    id: "tsmc-press-center",
    name: "TSMC Press Center",
    companyType: "foundry",
    url: "https://pr.tsmc.com/english/news",
    language: "en",
    crawlPolicy: "manual",
    topics: ["Technology Symposium", "Foundry", "Packaging", "Roadmap"],
    readFor:
      "기술 심포지엄과 공정 발표를 선단 공정 경쟁, 고객 생태계, 패키징 전략으로 읽습니다.",
    note:
      "공식 발표 메타데이터만 연결하고 본문은 원문으로 이동시키는 정책을 적용합니다.",
    relatedLessons: ["euv-dram-scaling"],
    verifiedAt: "2026-05-07"
  },
  {
    id: "intel-newsroom",
    name: "Intel Newsroom",
    companyType: "foundry",
    url: "https://newsroom.intel.com/",
    language: "en",
    crawlPolicy: "metadata-only",
    topics: ["Intel Foundry", "Process Roadmap", "Packaging", "AI PC"],
    readFor:
      "로직 공정, 파운드리 전략, 패키징 발표를 메모리 병목과 비교해 읽습니다.",
    note:
      "메모리 중심 글에서 시스템과 로직 공정 맥락을 보강할 때 참고합니다.",
    relatedLessons: ["euv-dram-scaling", "hbm-ai-memory"],
    verifiedAt: "2026-05-07"
  },
  {
    id: "asml-stories",
    name: "ASML Stories",
    companyType: "equipment",
    url: "https://www.asml.com/en/news/stories",
    language: "en",
    crawlPolicy: "metadata-only",
    topics: ["EUV", "High-NA", "Lithography", "Metrology"],
    readFor:
      "EUV를 장비 이름이 아니라 광원, 마스크, 계측, 생산성 문제로 확장해 읽습니다.",
    note:
      "EUV 심화 글을 장비 생태계까지 넓힐 때 우선 확인할 공식 출처입니다.",
    relatedLessons: ["euv-dram-scaling"],
    verifiedAt: "2026-05-07"
  },
  {
    id: "lam-research-newsroom",
    name: "Lam Research Newsroom",
    companyType: "equipment",
    url: "https://www.lamresearch.com/newsroom/",
    language: "en",
    crawlPolicy: "metadata-only",
    topics: ["Etch", "Deposition", "Wafer Fabrication", "AI-era Process"],
    readFor:
      "식각과 증착이 미세화, 3D 구조, 공정 복잡도와 어떻게 연결되는지 읽습니다.",
    note:
      "EUV 이후 실제 패턴을 만드는 후속 공정의 맥락을 보강하는 출처입니다.",
    relatedLessons: ["euv-dram-scaling"],
    verifiedAt: "2026-05-07"
  },
  {
    id: "applied-materials-newsroom",
    name: "Applied Materials Newsroom",
    companyType: "equipment",
    url: "https://www.appliedmaterials.com/us/en/newsroom.html",
    language: "en",
    crawlPolicy: "metadata-only",
    topics: ["Materials Engineering", "Wiring", "DRAM Scaling", "Patterning"],
    readFor:
      "재료 공학과 배선, 패터닝 발표를 성능과 수율 제약 관점으로 읽습니다.",
    note:
      "공정 미세화가 재료와 장비 혁신까지 연결된다는 점을 설명할 때 활용합니다.",
    relatedLessons: ["dram-basics", "euv-dram-scaling"],
    verifiedAt: "2026-05-07"
  },
  {
    id: "kla-newsroom",
    name: "KLA Newsroom",
    companyType: "metrology",
    url: "https://www.kla.com/newsroom",
    language: "en",
    crawlPolicy: "metadata-only",
    topics: ["Inspection", "Metrology", "Yield", "Process Control"],
    readFor:
      "결함 검사와 계측이 수율, 양산성, 고객 검증으로 이어지는 이유를 읽습니다.",
    note:
      "수율과 defect를 설명할 때 공정 장비 외의 계측 관점을 보강합니다.",
    relatedLessons: ["euv-dram-scaling"],
    verifiedAt: "2026-05-07"
  },
  {
    id: "imec-reading-room",
    name: "imec Reading Room",
    companyType: "research",
    url: "https://www.imec-int.com/en/reading-room",
    language: "en",
    crawlPolicy: "manual",
    topics: ["Sub-2nm", "EUV", "Silicon Photonics", "Advanced Research"],
    readFor:
      "상용 제품 발표와 연구 단계 기술을 구분하고 장기 로드맵 관점으로 읽습니다.",
    note:
      "기존 news URL이 변경되어 reading room을 기준 링크로 관리합니다.",
    relatedLessons: ["euv-dram-scaling"],
    verifiedAt: "2026-05-07"
  }
];

export const sourceCompanyTypes = Array.from(
  new Set(officialSources.map((source) => source.companyType))
);

export const sourceTopics = Array.from(
  new Set(officialSources.flatMap((source) => source.topics))
).sort();

export function getSourceHost(url: string) {
  return new URL(url).host.replace(/^www\./, "");
}
