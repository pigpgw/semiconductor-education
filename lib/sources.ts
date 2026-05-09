export type SourceCompanyType =
  | "memory"
  | "foundry"
  | "equipment"
  | "metrology"
  | "standards"
  | "industry"
  | "research";

export type SourceKind =
  | "newsroom"
  | "tech-blog"
  | "technology-page"
  | "product-page"
  | "standards"
  | "industry-data"
  | "research-library";

export type SourceRecommendedLevel = "basic" | "applied" | "field";

export type CrawlPolicy = "manual" | "rss" | "metadata-only";

export type OfficialSource = {
  id: string;
  name: string;
  companyType: SourceCompanyType;
  sourceKind: SourceKind;
  recommendedLevel: SourceRecommendedLevel;
  url: string;
  feedUrl?: string;
  feedIncludeKeywords?: string[];
  feedExcludeKeywords?: string[];
  language: "ko" | "en" | "multi";
  crawlPolicy: CrawlPolicy;
  refreshCadence: string;
  evidenceType: string;
  useCases: string[];
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
  standards: "표준/규격",
  industry: "산업 데이터",
  research: "연구"
};

export const sourceKindLabels: Record<SourceKind, string> = {
  newsroom: "뉴스룸",
  "tech-blog": "기술 블로그",
  "technology-page": "기술 페이지",
  "product-page": "제품 페이지",
  standards: "표준 문서",
  "industry-data": "산업 데이터",
  "research-library": "연구 자료실"
};

export const sourceLevelLabels: Record<SourceRecommendedLevel, string> = {
  basic: "기초부터",
  applied: "중급부터",
  field: "실무/심화"
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
    sourceKind: "tech-blog",
    recommendedLevel: "applied",
    url: "https://semiconductor.samsung.com/news-events/tech-blog/",
    language: "multi",
    crawlPolicy: "metadata-only",
    refreshCadence: "월 1회 수동 확인",
    evidenceType: "기술 해설과 제품 맥락",
    useCases: ["DRAM/HBM/EUV 기본 근거", "제품군 비교", "학습자용 용어 해석"],
    topics: ["DRAM", "HBM", "CXL", "SSD", "EUV", "Foundry"],
    readFor:
      "제품 소개 문장을 기술 구조, 고객 요구, 양산 관점으로 분리해 읽습니다.",
    note:
      "DRAM, HBM, EUV처럼 MVP 핵심 글의 공식 근거로 먼저 확인할 출처입니다.",
    relatedLessons: ["dram-basics", "hbm-ai-memory", "euv-dram-scaling"],
    verifiedAt: "2026-05-07"
  },
  {
    id: "samsung-global-semiconductor-newsroom",
    name: "Samsung Global Newsroom Semiconductors",
    companyType: "memory",
    sourceKind: "newsroom",
    recommendedLevel: "applied",
    url: "https://news.samsung.com/global/semiconductors-leadership",
    feedUrl: "https://news.samsung.com/global/semiconductors-leadership/feed",
    feedIncludeKeywords: ["semiconductor", "memory", "foundry", "process", "dram", "hbm", "euv", "chip", "ai"],
    feedExcludeKeywords: ["contest", "event", "brand", "campaign"],
    language: "en",
    crawlPolicy: "rss",
    refreshCadence: "주 1회 feed 확인",
    evidenceType: "공식 발표와 리더십 맥락",
    useCases: ["삼성 반도체 발표 추적", "공정/메모리 이슈 선별", "산업 업데이트 후보"],
    topics: ["Semiconductor Leadership", "Foundry", "Memory", "Process"],
    readFor:
      "삼성전자 반도체 리더십 발표를 제품 홍보가 아니라 공정, 소자, 생태계 변화 관점으로 읽습니다.",
    note:
      "Samsung Global Newsroom의 반도체 카테고리와 공식 RSS를 함께 관리하는 출처입니다.",
    relatedLessons: ["dram-basics", "hbm-ai-memory", "euv-dram-scaling"],
    verifiedAt: "2026-05-07"
  },
  {
    id: "sk-hynix-newsroom",
    name: "SK hynix Newsroom",
    companyType: "memory",
    sourceKind: "newsroom",
    recommendedLevel: "applied",
    url: "https://news.skhynix.co.kr/",
    feedUrl: "https://news.skhynix.com/feed/",
    feedIncludeKeywords: ["hbm", "dram", "nand", "memory", "semiconductor", "cxl", "pim", "ai computing", "gpu", "data center"],
    feedExcludeKeywords: ["local economy", "struggling regions", "esg", "sustainability", "scholarship", "donation", "culture", "recruit", "investor", "conference call"],
    language: "ko",
    crawlPolicy: "rss",
    refreshCadence: "주 1회 feed 확인",
    evidenceType: "공식 보도자료와 기술 인터뷰",
    useCases: ["HBM/AI 메모리 추적", "NAND 제품 발표 해석", "기술 리더 인터뷰 큐레이션"],
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
    sourceKind: "newsroom",
    recommendedLevel: "applied",
    url: "https://www.micron.com/about/press/news",
    feedUrl: "https://investors.micron.com/rss/news-releases.xml",
    feedIncludeKeywords: ["dram", "nand", "ssd", "memory", "data center", "hbm", "ai", "qlc", "ddr", "lpddr"],
    feedExcludeKeywords: ["investor conference", "quarterly", "financial", "earnings", "dividend", "stockholder", "shareholder"],
    language: "en",
    crawlPolicy: "rss",
    refreshCadence: "주 1회 feed 확인",
    evidenceType: "제품 발표와 경쟁 제품 맥락",
    useCases: ["DRAM/NAND 경쟁 비교", "QLC/SSD 발표 확인", "데이터센터 메모리 수요 해석"],
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
    sourceKind: "technology-page",
    recommendedLevel: "field",
    url: "https://www.tsmc.com/english/dedicatedFoundry/technology",
    language: "en",
    crawlPolicy: "manual",
    refreshCadence: "분기 1회 수동 확인",
    evidenceType: "공정 플랫폼과 패키징 로드맵",
    useCases: ["파운드리 공정 비교", "advanced packaging 맥락", "HBM 시스템 병목 해석"],
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
    sourceKind: "newsroom",
    recommendedLevel: "field",
    url: "https://pr.tsmc.com/english/news",
    language: "en",
    crawlPolicy: "manual",
    refreshCadence: "월 1회 수동 확인",
    evidenceType: "기술 심포지엄과 공식 발표",
    useCases: ["공정 발표 확인", "패키징 공급 병목 해석", "로드맵 변화 추적"],
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
    sourceKind: "newsroom",
    recommendedLevel: "applied",
    url: "https://newsroom.intel.com/",
    feedUrl: "https://newsroom.intel.com/feed",
    feedIncludeKeywords: ["foundry", "process", "packaging", "semiconductor", "ai", "chip", "wafer", "technology", "computing", "data center"],
    feedExcludeKeywords: ["investor conference", "fireside chat", "corporate", "earnings", "financial"],
    language: "en",
    crawlPolicy: "rss",
    refreshCadence: "주 1회 feed 확인",
    evidenceType: "로직 공정, 패키징, 시스템 발표",
    useCases: ["로직/메모리 병목 비교", "패키징 기술 용어 보강", "AI 시스템 발표 선별"],
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
    sourceKind: "technology-page",
    recommendedLevel: "field",
    url: "https://www.asml.com/en/news/stories",
    language: "en",
    crawlPolicy: "metadata-only",
    refreshCadence: "월 1회 수동 확인",
    evidenceType: "노광 장비와 EUV 시스템 해설",
    useCases: ["EUV/High-NA 개념 보강", "장비 병목 설명", "공정 생산성 질문 만들기"],
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
    sourceKind: "newsroom",
    recommendedLevel: "field",
    url: "https://www.lamresearch.com/newsroom/",
    feedUrl: "https://newsroom.lamresearch.com/press-releases?pagetemplate=rss",
    feedIncludeKeywords: ["etch", "deposition", "wafer", "fabrication", "semiconductor", "process", "3d", "ai", "plasma"],
    feedExcludeKeywords: ["financial results", "conference call", "investor", "quarter", "dividend", "earnings"],
    language: "en",
    crawlPolicy: "rss",
    refreshCadence: "월 1회 feed 확인",
    evidenceType: "식각, 증착, 웨이퍼 공정 장비 발표",
    useCases: ["포토 이후 공정 보강", "3D 구조 제조 난이도 설명", "EUV 후속 공정 연결"],
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
    sourceKind: "newsroom",
    recommendedLevel: "field",
    url: "https://www.appliedmaterials.com/us/en/newsroom.html",
    feedUrl: "https://ir.appliedmaterials.com/rss/news-releases.xml",
    feedIncludeKeywords: ["packaging", "semiconductor", "materials", "wiring", "dram", "patterning", "deposition", "etch", "ai", "advanced"],
    feedExcludeKeywords: ["investor conference", "fireside chat", "financial", "earnings", "dividend"],
    language: "en",
    crawlPolicy: "rss",
    refreshCadence: "월 1회 feed 확인",
    evidenceType: "재료 공학, 배선, 패터닝 발표",
    useCases: ["DRAM scaling 재료 관점", "배선/패키징 제약 설명", "장비 발표 해석"],
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
    sourceKind: "newsroom",
    recommendedLevel: "field",
    url: "https://www.kla.com/newsroom",
    language: "en",
    crawlPolicy: "metadata-only",
    refreshCadence: "월 1회 수동 확인",
    evidenceType: "계측, 검사, process control 관점",
    useCases: ["수율/defect 설명", "양산성 관점 보강", "공정 제어 용어 정리"],
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
    sourceKind: "research-library",
    recommendedLevel: "field",
    url: "https://www.imec-int.com/en/reading-room",
    language: "en",
    crawlPolicy: "manual",
    refreshCadence: "월 1회 수동 확인",
    evidenceType: "연구 단계 기술과 장기 로드맵",
    useCases: ["상용/연구 단계 구분", "sub-2nm/EUV 심화", "장기 기술 방향 보강"],
    topics: ["Sub-2nm", "EUV", "Silicon Photonics", "Advanced Research"],
    readFor:
      "상용 제품 발표와 연구 단계 기술을 구분하고 장기 로드맵 관점으로 읽습니다.",
    note:
      "기존 news URL이 변경되어 reading room을 기준 링크로 관리합니다.",
    relatedLessons: ["euv-dram-scaling"],
    verifiedAt: "2026-05-07"
  },
  {
    id: "kioxia-bics-flash",
    name: "KIOXIA BiCS FLASH Technology",
    companyType: "memory",
    sourceKind: "technology-page",
    recommendedLevel: "applied",
    url: "https://americas.kioxia.com/en-us/business/memory/bics.html",
    language: "en",
    crawlPolicy: "manual",
    refreshCadence: "분기 1회 수동 확인",
    evidenceType: "3D NAND 기술 페이지",
    useCases: ["3D NAND 적층 관점", "NAND layer count 해석", "SSD/UFS 제품 연결"],
    topics: ["NAND", "3D NAND", "SSD", "UFS", "Storage"],
    readFor:
      "3D flash가 층 수 경쟁만이 아니라 수직/수평 scaling, 성능, 전력, 용도별 제품 선택으로 이어지는지 읽습니다.",
    note:
      "NAND를 Samsung/SK hynix 관점에만 묶지 않고 3D flash 산업 전체의 적층 방향으로 비교할 때 활용합니다.",
    relatedLessons: ["nand-ssd-storage"],
    verifiedAt: "2026-05-09"
  },
  {
    id: "jedec-standards",
    name: "JEDEC Standards",
    companyType: "standards",
    sourceKind: "standards",
    recommendedLevel: "field",
    url: "https://www.jedec.org/",
    language: "en",
    crawlPolicy: "manual",
    refreshCadence: "분기 1회 수동 확인",
    evidenceType: "메모리와 스토리지 표준",
    useCases: ["DDR/HBM/LPDDR 기준 확인", "UFS/eMMC/SSD 표준 맥락", "제품명과 규격 분리"],
    topics: ["DDR", "LPDDR", "HBM", "UFS", "SSD", "Memory Standards"],
    readFor:
      "제품 홍보 문구와 산업 표준 용어를 구분하고, DDR/HBM/UFS처럼 여러 회사가 맞춰야 하는 인터페이스 기준을 확인합니다.",
    note:
      "교재가 제품 세대명을 설명할 때 공식 표준과 제조사 제품 발표를 분리해 읽도록 돕는 기준 출처입니다.",
    relatedLessons: ["dram-basics", "hbm-ai-memory", "nand-ssd-storage"],
    verifiedAt: "2026-05-09"
  },
  {
    id: "nvm-express-specifications",
    name: "NVM Express Specifications",
    companyType: "standards",
    sourceKind: "standards",
    recommendedLevel: "applied",
    url: "https://nvmexpress.org/specifications/",
    language: "en",
    crawlPolicy: "manual",
    refreshCadence: "분기 1회 수동 확인",
    evidenceType: "NVMe 인터페이스 규격",
    useCases: ["SSD 인터페이스 이해", "PCIe/NVMe 용어 구분", "컨트롤러와 host 통신 설명"],
    topics: ["NVMe", "SSD", "PCIe", "Storage Interface"],
    readFor:
      "SSD 성능을 NAND 칩만으로 보지 않고 host software, controller, transport, command set이 맞물린 인터페이스 문제로 읽습니다.",
    note:
      "NAND/SSD 글에서 SATA, PCIe, NVMe 차이를 확장할 때 공식 규격 방향을 확인하는 출처입니다.",
    relatedLessons: ["nand-ssd-storage"],
    verifiedAt: "2026-05-09"
  },
  {
    id: "sia-industry-fact-sheet",
    name: "SIA Semiconductor Industry Fact Sheet",
    companyType: "industry",
    sourceKind: "industry-data",
    recommendedLevel: "basic",
    url: "https://www.semiconductors.org/resources/semiconductor-industry-fact-sheet/",
    language: "en",
    crawlPolicy: "manual",
    refreshCadence: "월 1회 수동 확인",
    evidenceType: "산업 규모와 공급망 데이터",
    useCases: ["시장 배경 설명", "공급망/인력 맥락", "포트폴리오 프로젝트 소개 근거"],
    topics: ["Semiconductor Basics", "Supply Chain", "Market", "Workforce"],
    readFor:
      "개별 제품 기술을 산업 규모, 공급망, 인력 수요와 연결해 프로젝트의 교육 필요성을 설명할 때 사용합니다.",
    note:
      "기술 교재가 산업 홍보로 흐르지 않게, 시장 수치와 정책 맥락을 별도 출처로 분리해 관리합니다.",
    relatedLessons: [],
    verifiedAt: "2026-05-09"
  }
];

export const sourceCompanyTypes = Array.from(
  new Set(officialSources.map((source) => source.companyType))
);

export const sourceTopics = Array.from(
  new Set(officialSources.flatMap((source) => source.topics))
).sort();

export const rssSourceCount = officialSources.filter(
  (source) => source.feedUrl
).length;

export function getSourceHost(url: string) {
  return new URL(url).host.replace(/^www\./, "");
}
