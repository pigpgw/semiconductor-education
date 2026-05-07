export type FeedReviewStatus = "review-needed" | "approved" | "dismissed";
export type FeedReviewPriority = "high" | "medium" | "low";
export type FeedReviewPromotion = {
  sourceType: "보도자료" | "기술 페이지" | "제품 페이지" | "기술 플랫폼" | "공식 사이트";
  level: "기초" | "중급" | "심화";
  category: string;
  status: "curated" | "lesson-linked" | "watching";
  tags: string[];
  summary: string;
};

export type FeedReviewCandidate = {
  id: string;
  sourceId: string;
  sourceName: string;
  title: string;
  url: string;
  publishedAt?: string;
  fetchedAt: string;
  status: FeedReviewStatus;
  priority: FeedReviewPriority;
  topics: string[];
  reason: string;
  reviewQuestions: string[];
  suggestedRelatedLessons: string[];
  promotion: FeedReviewPromotion;
};

export const feedReviewStatusLabels: Record<FeedReviewStatus, string> = {
  "review-needed": "검토 필요",
  approved: "승격 후보",
  dismissed: "제외"
};

export const feedReviewPriorityLabels: Record<FeedReviewPriority, string> = {
  high: "높음",
  medium: "보통",
  low: "낮음"
};

export const feedReviewQueue: FeedReviewCandidate[] = [
  {
    id: "sk-hynix-ieee-hbm-award",
    sourceId: "sk-hynix-newsroom",
    sourceName: "SK hynix Newsroom",
    title:
      "SK hynix receives 2026 IEEE Corporate Innovation Award for Driving AI Computing Expansion with HBM",
    url: "https://news.skhynix.com/2026-ieee-awards-recipient/",
    publishedAt: "2026-04-25",
    fetchedAt: "2026-05-07",
    status: "review-needed",
    priority: "high",
    topics: ["HBM", "AI Memory", "Industry Signal"],
    reason:
      "HBM이 AI computing 확장에 기여했다는 공식 인정 사례라 HBM 글의 산업 해석 보강 후보입니다.",
    reviewQuestions: [
      "수상 사실보다 기술적으로 어떤 병목을 풀었다고 설명하는가",
      "HBM, GPU, AI workload 사이의 연결을 초보자에게 어떻게 풀 수 있는가",
      "이미 있는 HBM 양산 업데이트와 내용이 중복되는가"
    ],
    suggestedRelatedLessons: ["hbm-ai-memory"],
    promotion: {
      sourceType: "보도자료",
      level: "심화",
      category: "HBM/AI 메모리",
      status: "watching",
      tags: ["HBM", "AI Computing", "IEEE", "Memory Wall", "Industry Signal"],
      summary:
        "IEEE 수상 발표를 통해 HBM을 단순 고속 메모리가 아니라 AI 연산 확장을 가능하게 한 병목 완화 기술로 읽습니다."
    }
  },
  {
    id: "micron-245tb-6600-ion-ssd",
    sourceId: "micron-newsroom",
    sourceName: "Micron Newsroom",
    title: "Micron 245TB 6600 ION Data Center SSD Ships",
    url: "https://investors.micron.com/news-releases/news-release-details/meiguangyejielingxiande-245tb-6600-ion-shujuzhongxin-ssd",
    publishedAt: "2026-05-06",
    fetchedAt: "2026-05-07",
    status: "review-needed",
    priority: "high",
    topics: ["NAND", "SSD", "Data Center", "AI Storage"],
    reason:
      "NAND/SSD 첫 글에서 DRAM과 저장장치의 역할 차이를 설명할 때 쓸 수 있는 최신 공식 제품 발표 후보입니다.",
    reviewQuestions: [
      "용량, 전력 효율, rack density 중 어떤 지표가 학습 가치가 큰가",
      "AI 데이터센터에서 SSD가 HBM/DRAM과 다른 병목을 푸는 지점은 무엇인가",
      "중국어/번체 발표 대신 영어 원문이나 제품 페이지가 있는지 확인했는가"
    ],
    suggestedRelatedLessons: ["dram-basics"],
    promotion: {
      sourceType: "보도자료",
      level: "중급",
      category: "NAND/스토리지",
      status: "watching",
      tags: ["SSD", "NAND", "QLC", "Data Center", "AI Storage"],
      summary:
        "245TB 데이터센터 SSD 발표를 DRAM/HBM과 다른 저장 계층 병목, rack density, 전력 효율 관점으로 읽는 초안입니다."
    }
  },
  {
    id: "applied-nexx-advanced-packaging",
    sourceId: "applied-materials-newsroom",
    sourceName: "Applied Materials Newsroom",
    title: "Applied Materials Broadens Advanced Packaging Portfolio with Acquisition of NEXX",
    url: "https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-broadens-advanced-packaging-portfolio",
    publishedAt: "2026-05-04",
    fetchedAt: "2026-05-07",
    status: "review-needed",
    priority: "high",
    topics: ["Advanced Packaging", "HBM", "Equipment", "Deposition"],
    reason:
      "HBM과 chiplet 시대에 패키징 장비 투자가 왜 중요해지는지 설명할 수 있는 패키징 심화 글 후보입니다.",
    reviewQuestions: [
      "인수 발표에서 실제 기술 학습에 필요한 장비/공정 키워드는 무엇인가",
      "HBM 패키징 병목과 직접 연결할 수 있는 근거가 충분한가",
      "패키징 글로 승격할지, 산업 업데이트로만 둘지 판단했는가"
    ],
    suggestedRelatedLessons: ["hbm-ai-memory"],
    promotion: {
      sourceType: "보도자료",
      level: "심화",
      category: "패키징/시스템",
      status: "watching",
      tags: ["Advanced Packaging", "Deposition", "HBM", "Chiplet", "Equipment"],
      summary:
        "Applied Materials의 NEXX 인수 발표를 HBM, chiplet, advanced packaging에서 장비 포트폴리오가 왜 중요해지는지 읽는 자료로 봅니다."
    }
  },
  {
    id: "lam-quarter-results-process-signal",
    sourceId: "lam-research-newsroom",
    sourceName: "Lam Research Newsroom",
    title: "Lam Research Corporation Reports Financial Results for the Quarter Ended March 29, 2026",
    url: "https://newsroom.lamresearch.com/2026-04-22-Lam-Research-Corporation-Reports-Financial-Results-for-the-Quarter-Ended-March-29,-2026",
    publishedAt: "2026-04-22",
    fetchedAt: "2026-05-07",
    status: "review-needed",
    priority: "medium",
    topics: ["Etch", "Deposition", "Wafer Fabrication", "Equipment Cycle"],
    reason:
      "투자자 발표 성격이 강하지만 공정 장비 수요와 AI-era process 흐름을 읽는 연습 후보로 남깁니다.",
    reviewQuestions: [
      "기술 학습보다 실적 발표 성격이 강해 제외해야 하는가",
      "etch/deposition 수요를 공정 난이도와 연결할 수 있는 문구가 있는가",
      "기존 Lam conductor etch 큐레이션과 중복되는가"
    ],
    suggestedRelatedLessons: ["euv-dram-scaling"],
    promotion: {
      sourceType: "보도자료",
      level: "심화",
      category: "공정/장비 사이클",
      status: "watching",
      tags: ["Etch", "Deposition", "Wafer Fabrication", "Equipment Cycle"],
      summary:
        "Lam Research의 실적 발표를 그대로 산업 업데이트로 쓰기보다 식각, 증착, 장비 수요가 공정 난이도와 연결되는지 점검하는 후보로 둡니다."
    }
  }
];

export const feedReviewStatuses = Array.from(
  new Set(feedReviewQueue.map((candidate) => candidate.status))
);

export const feedReviewPriorities = Array.from(
  new Set(feedReviewQueue.map((candidate) => candidate.priority))
);
