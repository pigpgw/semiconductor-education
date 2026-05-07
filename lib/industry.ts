import { officialSources } from "@/lib/sources";

export type IndustryUpdateStatus = "curated" | "lesson-linked" | "watching";

export type IndustryUpdate = {
  id: string;
  title: string;
  sourceId: string;
  sourceName: string;
  url: string;
  sourceType: string;
  publishedAt?: string;
  curatedAt: string;
  level: "기초" | "중급" | "심화";
  category: string;
  status: IndustryUpdateStatus;
  tags: string[];
  summary: string;
  whyItMatters: string;
  readFor: string[];
  relatedLessons: string[];
};

export const industryStatusLabels: Record<IndustryUpdateStatus, string> = {
  curated: "검토 완료",
  "lesson-linked": "교재 연결",
  watching: "관찰 중"
};

export const industryUpdates: IndustryUpdate[] = [
  {
    id: "sk-hynix-12-layer-hbm3e",
    title: "SK hynix 12단 HBM3E 양산 발표",
    sourceId: "sk-hynix-newsroom",
    sourceName: "SK hynix Newsroom",
    url: "https://news.skhynix.com/sk-hynix-begins-volume-production-of-the-world-first-12-layer-hbm3e/",
    sourceType: "보도자료",
    publishedAt: "2024-09-26",
    curatedAt: "2026-05-07",
    level: "심화",
    category: "HBM/AI 메모리",
    status: "lesson-linked",
    tags: ["HBM3E", "12-Hi", "TSV", "MR-MUF", "AI Memory"],
    summary:
      "HBM은 단순히 빠른 DRAM이 아니라 적층, TSV, 열 방출, 고객 검증이 함께 맞아야 하는 AI 메모리 제품입니다.",
    whyItMatters:
      "12단 적층은 용량을 키우면서도 패키지 두께와 열 문제를 제어해야 하므로 HBM 글의 실무 관점을 보강합니다.",
    readFor: [
      "8단에서 12단으로 갈 때 용량과 두께가 어떻게 trade-off가 되는가",
      "TSV와 MR-MUF가 성능보다 신뢰성 문제와 어떻게 연결되는가",
      "양산 발표에서 고객 공급 시점과 검증 문구를 어떻게 분리해 읽을 것인가"
    ],
    relatedLessons: ["hbm-ai-memory"]
  },
  {
    id: "samsung-hbm-product-lineup",
    title: "Samsung HBM 제품군과 AI/HPC 사용 맥락",
    sourceId: "samsung-semiconductor-tech-blog",
    sourceName: "Samsung Semiconductor",
    url: "https://semiconductor.samsung.com/us/dram/hbm/",
    sourceType: "제품 페이지",
    curatedAt: "2026-05-07",
    level: "중급",
    category: "HBM/AI 메모리",
    status: "lesson-linked",
    tags: ["HBM", "HBM3E", "HPC", "Bandwidth", "Stack"],
    summary:
      "HBM 제품 페이지는 세대명보다 용량, 속도, 적층 수를 함께 보면서 AI 서버가 왜 넓은 대역폭을 요구하는지 읽어야 합니다.",
    whyItMatters:
      "학습자는 제품명을 외우기보다 HBM이 GPU 가까이에 놓이는 이유와 제품 스펙이 병목 완화로 이어지는 구조를 이해할 수 있습니다.",
    readFor: [
      "HBM3E, HBM3, HBM2E 같은 세대명이 무엇을 비교하기 위한 기준인가",
      "capacity, speed, stack 항목을 HBM 글의 memory wall 설명과 어떻게 연결할 것인가",
      "제품 페이지의 성능 문구와 실제 시스템 병목을 어떻게 구분할 것인가"
    ],
    relatedLessons: ["hbm-ai-memory"]
  },
  {
    id: "samsung-euv-dram-scaling",
    title: "Samsung EUV와 DRAM 미세화",
    sourceId: "samsung-semiconductor-tech-blog",
    sourceName: "Samsung Semiconductor",
    url: "https://semiconductor.samsung.com/technologies/euv/",
    sourceType: "기술 페이지",
    curatedAt: "2026-05-07",
    level: "중급",
    category: "공정/미세화",
    status: "lesson-linked",
    tags: ["EUV", "DRAM Scaling", "DUV", "Patterning", "Yield"],
    summary:
      "EUV는 더 짧은 파장으로 미세 패턴을 그리는 기술이지만, 학습에서는 공정 수 감소와 결함 관리까지 함께 봐야 합니다.",
    whyItMatters:
      "EUV 글에서 DUV/EUV 차이를 설명할 때 파장 숫자만 제시하면 얕습니다. multi-patterning 감소, 생산성, defect 관점이 함께 필요합니다.",
    readFor: [
      "193nm DUV와 13.5nm EUV의 차이가 해상도와 공정 단계에 어떤 영향을 주는가",
      "single patterning이 생산성이나 결함 관리와 어떻게 연결되는가",
      "DRAM 미세화에서 EUV가 모든 문제를 해결하는 기술은 아닌 이유는 무엇인가"
    ],
    relatedLessons: ["euv-dram-scaling"]
  },
  {
    id: "asml-euv-systems",
    title: "ASML EUV 시스템과 High-NA 전환",
    sourceId: "asml-stories",
    sourceName: "ASML",
    url: "https://www.asml.com/en/products/euv-lithography-systems",
    sourceType: "제품/기술 페이지",
    curatedAt: "2026-05-07",
    level: "심화",
    category: "공정/장비",
    status: "lesson-linked",
    tags: ["EUV", "High-NA", "Lithography", "NA", "Throughput"],
    summary:
      "ASML 자료는 EUV를 노광 장비 하나가 아니라 광원, 반사 광학계, stage, vacuum, throughput이 결합된 시스템으로 보게 합니다.",
    whyItMatters:
      "DRAM과 로직 공정의 미세화는 장비 해상도만으로 설명되지 않습니다. High-NA와 생산성, 결함, 비용을 함께 읽어야 합니다.",
    readFor: [
      "NA가 커지면 해상도는 좋아지지만 장비와 공정 복잡도는 어떻게 달라지는가",
      "EUV light source, mirror, vacuum이 왜 기존 DUV 장비보다 까다로운가",
      "High-NA가 future memory node와 연결될 때 남는 병목은 무엇인가"
    ],
    relatedLessons: ["euv-dram-scaling"]
  },
  {
    id: "tsmc-3dfabric-platform",
    title: "TSMC 3DFabric과 고성능 패키징",
    sourceId: "tsmc-technology",
    sourceName: "TSMC",
    url: "https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/3DFabric.htm",
    sourceType: "기술 플랫폼",
    curatedAt: "2026-05-07",
    level: "심화",
    category: "패키징/시스템",
    status: "curated",
    tags: ["3DFabric", "CoWoS", "SoIC", "Chiplet", "Advanced Packaging"],
    summary:
      "AI 반도체 성능은 칩 내부 공정뿐 아니라 칩렛, 인터포저, HBM 연결 같은 패키징 구조에서 크게 좌우됩니다.",
    whyItMatters:
      "HBM을 이해하려면 메모리 칩만 보지 않고 GPU, interposer, substrate, packaging capacity까지 시스템으로 봐야 합니다.",
    readFor: [
      "advanced packaging이 단순 후공정이 아니라 성능과 비용을 결정하는 이유는 무엇인가",
      "CoWoS, SoIC, InFO가 모두 같은 문제를 푸는 기술인지 구분할 수 있는가",
      "HBM 수요가 파운드리 패키징 병목과 어떻게 연결되는가"
    ],
    relatedLessons: ["hbm-ai-memory"]
  },
  {
    id: "lam-conductor-etch",
    title: "Lam Research conductor etch 기술 발표",
    sourceId: "lam-research-newsroom",
    sourceName: "Lam Research",
    url: "https://newsroom.lamresearch.com/2025-02-19-Lam-Research-Unveils-Industrys-Most-Advanced-Conductor-Etch-Technology-to-Date",
    sourceType: "보도자료",
    publishedAt: "2025-02-19",
    curatedAt: "2026-05-07",
    level: "심화",
    category: "식각/공정",
    status: "watching",
    tags: ["Etch", "Conductor", "Process Complexity", "Scaling", "Equipment"],
    summary:
      "식각은 포토 공정에서 그린 패턴을 실제 재료 구조로 옮기는 단계이므로, 미세화가 진행될수록 장비와 공정 제어가 더 중요해집니다.",
    whyItMatters:
      "EUV만 알면 회로가 완성된다고 착각하기 쉽습니다. 실제 양산에서는 노광 이후 식각, 증착, 계측이 함께 맞아야 합니다.",
    readFor: [
      "노광 다음 단계에서 식각 공정이 어떤 병목을 만들 수 있는가",
      "conductor etch가 배선과 집적도 문제와 어떻게 연결되는가",
      "장비 발표를 읽을 때 성능 수치보다 어떤 공정 제약을 먼저 봐야 하는가"
    ],
    relatedLessons: ["euv-dram-scaling"]
  },
  {
    id: "applied-dram-scaling-materials",
    title: "Applied Materials DRAM scaling 재료 공학 발표",
    sourceId: "applied-materials-newsroom",
    sourceName: "Applied Materials",
    url: "https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-introduces-materials-engineering-solutions/",
    sourceType: "보도자료",
    publishedAt: "2021-05-05",
    curatedAt: "2026-05-07",
    level: "심화",
    category: "DRAM/재료",
    status: "curated",
    tags: ["DRAM Scaling", "Materials Engineering", "Capacitor", "Patterning", "PPACt"],
    summary:
      "DRAM scaling은 셀을 작게 만드는 문제를 넘어 capacitor, hard mask, 배선 재료 같은 재료 공학 문제로 확장됩니다.",
    whyItMatters:
      "DRAM 글에서 capacitor가 작아질수록 생기는 한계를 설명할 때 장비와 재료 선택까지 연결할 수 있습니다.",
    readFor: [
      "DRAM capacitor hole이 깊고 좁아질 때 어떤 제조 문제가 커지는가",
      "재료 공학이 성능, 전력, 면적, 비용, 출시 시점과 어떻게 연결되는가",
      "제품 세대 경쟁 뒤에 공정 소재 경쟁이 숨어 있는 이유는 무엇인가"
    ],
    relatedLessons: ["dram-basics", "euv-dram-scaling"]
  },
  {
    id: "kla-process-control-yield",
    title: "KLA process control과 수율 관점",
    sourceId: "kla-newsroom",
    sourceName: "KLA",
    url: "https://www.kla.com/",
    sourceType: "공식 사이트",
    curatedAt: "2026-05-07",
    level: "심화",
    category: "계측/수율",
    status: "watching",
    tags: ["Yield", "Inspection", "Metrology", "Defect", "Process Control"],
    summary:
      "수율은 좋은 설계와 장비만으로 결정되지 않습니다. 결함을 빨리 찾고 공정을 제어하는 계측 체계가 양산성을 좌우합니다.",
    whyItMatters:
      "공정 글을 실무 레벨로 올리려면 '만들 수 있다'와 '반복해서 높은 수율로 만들 수 있다'를 구분해야 합니다.",
    readFor: [
      "inspection과 metrology가 불량 분석과 수율 개선에 어떻게 쓰이는가",
      "선단 공정일수록 defect budget이 왜 민감해지는가",
      "양산성 관점에서 기술 발표를 읽을 때 확인해야 할 문구는 무엇인가"
    ],
    relatedLessons: ["euv-dram-scaling"]
  }
];

export const industryCategories = Array.from(
  new Set(industryUpdates.map((update) => update.category))
).sort();

export const industryLevels = Array.from(
  new Set(industryUpdates.map((update) => update.level))
);

export const industryStatuses = Array.from(
  new Set(industryUpdates.map((update) => update.status))
);

export function formatIndustryDate(date?: string) {
  if (!date) {
    return "상시 업데이트";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(`${date}T00:00:00+09:00`));
}

export function getIndustryUpdateById(id: string) {
  return industryUpdates.find((update) => update.id === id);
}

export function getNextIndustryUpdate(id: string) {
  const currentIndex = industryUpdates.findIndex((update) => update.id === id);

  if (currentIndex < 0) {
    return undefined;
  }

  return industryUpdates[currentIndex + 1];
}

export function getIndustrySource(sourceId: string) {
  return officialSources.find((source) => source.id === sourceId);
}
