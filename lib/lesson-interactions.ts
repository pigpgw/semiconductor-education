export type LessonSource = {
  title: string;
  url: string;
  usedFor: string;
};

export type BasicModeId = "first" | "structure" | "source";

export type BasicConceptCard = {
  label: string;
  title: string;
  beginner: string;
  structure: string;
  field: string;
};

export const basicModeTabs: {
  id: BasicModeId;
  label: string;
  description: string;
}[] = [
  {
    id: "first",
    label: "처음 보기",
    description: "비유와 한 줄 결론으로 큰 그림을 먼저 잡습니다."
  },
  {
    id: "structure",
    label: "구조 보기",
    description: "클릭한 개념을 실제 구조와 trade-off까지 크게 봅니다."
  },
  {
    id: "source",
    label: "공식 자료 읽기",
    description: "Big 10 공식 자료를 어떤 질문으로 읽을지 연결합니다."
  }
];

const basicConceptCardsBySlug: Record<string, BasicConceptCard[]> = {
  "dram-basics": [
    {
      label: "역할",
      title: "DRAM은 책상입니다",
      beginner:
        "SSD가 책장이라면 DRAM은 지금 펼쳐 둔 책상입니다. 전원이 꺼지면 치워지지만, 작업 중에는 바로 손이 닿습니다.",
      structure:
        "DRAM은 작은 셀 배열에 데이터를 전하로 저장하고, CPU/GPU가 필요한 데이터를 빠르게 가져가게 합니다.",
      field:
        "실무에서는 용량, 대역폭, 지연 시간, 전력, 고객 시스템 검증을 함께 봅니다."
    },
    {
      label: "셀",
      title: "1T1C는 1비트를 담는 최소 방입니다",
      beginner:
        "트랜지스터는 문이고 커패시터는 물컵입니다. 컵에 전하가 있으면 1, 부족하면 0으로 봅니다.",
      structure:
        "셀은 word line과 bit line으로 선택되고, sense amplifier가 아주 작은 전하 차이를 읽습니다.",
      field:
        "셀을 작게 만들수록 집적도는 좋아지지만 전하 여유와 refresh 부담이 커집니다."
    },
    {
      label: "제품군",
      title: "DDR, LPDDR, GDDR, HBM은 같은 뿌리입니다",
      beginner:
        "같은 DRAM이라도 서버, 모바일, 그래픽, AI 가속기에서 원하는 조건이 다릅니다.",
      structure:
        "DDR은 범용성, LPDDR은 저전력, GDDR/HBM은 높은 대역폭에 더 강하게 최적화됩니다.",
      field:
        "제품 이름보다 어떤 시스템 병목을 줄이려는 메모리인지 먼저 읽어야 합니다."
    }
  ],
  "hbm-ai-memory": [
    {
      label: "병목",
      title: "HBM은 GPU가 기다리지 않게 합니다",
      beginner:
        "GPU가 요리사라면 HBM은 주방 바로 옆에 붙은 넓은 재료 출입구입니다.",
      structure:
        "DRAM die를 위로 쌓고 TSV로 연결해 GPU 가까이에서 넓은 데이터 통로를 만듭니다.",
      field:
        "AI 시스템에서는 bandwidth, capacity, power, package capacity를 함께 맞춰야 성능이 납니다."
    },
    {
      label: "연결",
      title: "TSV는 위아래 칩을 잇는 수직 통로입니다",
      beginner:
        "아파트 층마다 엘리베이터가 있어야 위아래가 빠르게 이어지는 것과 비슷합니다.",
      structure:
        "TSV는 stacked DRAM die를 관통해 base die와 package로 신호를 전달합니다.",
      field:
        "정렬, 열, 수율, warpage, 고객 검증이 HBM 경쟁력의 일부가 됩니다."
    },
    {
      label: "시스템",
      title: "HBM은 메모리 기술이면서 패키징 기술입니다",
      beginner:
        "빠른 메모리를 만드는 것만으로 끝나지 않고, GPU 옆에 안정적으로 붙여야 합니다.",
      structure:
        "Interposer, substrate, power delivery, cooling 조건이 HBM 성능을 실제 서버 성능으로 바꿉니다.",
      field:
        "TSMC 3DFabric 같은 패키징 플랫폼과 메모리 기업의 HBM 발표를 같이 읽어야 합니다."
    }
  ],
  "euv-dram-scaling": [
    {
      label: "노광",
      title: "EUV는 더 얇은 펜입니다",
      beginner:
        "굵은 펜으로 촘촘한 도면을 여러 번 나눠 그리던 일을 더 얇은 펜으로 줄일 수 있습니다.",
      structure:
        "EUV는 13.5nm 파장의 빛을 써서 일부 미세 패턴의 multi-patterning 부담을 낮춥니다.",
      field:
        "양산에서는 파장뿐 아니라 mask, resist, throughput, defect, 장비 가동률을 함께 봅니다."
    },
    {
      label: "공정",
      title: "노광 뒤에는 식각과 계측이 이어집니다",
      beginner:
        "도면을 찍었다고 건물이 완성되는 것이 아닙니다. 실제 재료를 깎고 검사해야 합니다.",
      structure:
        "Photo로 만든 패턴은 etch/deposition/metrology를 거쳐 실제 막질 구조가 됩니다.",
      field:
        "Lam Research와 KLA 자료를 같이 읽으면 EUV가 공정 통합 문제라는 점이 보입니다."
    },
    {
      label: "양산",
      title: "EUV 도입은 수율과 생산성의 문제입니다",
      beginner:
        "작게 그릴 수 있어도 많이, 반복해서, 안정적으로 만들어야 제품이 됩니다.",
      structure:
        "적용 레이어, overlay, defect, process window, yield learning이 실제 양산성을 가릅니다.",
      field:
        "EUV 발표는 어느 제품과 어느 레이어에 적용됐는지, 수율을 어떻게 확보했는지 질문해야 합니다."
    }
  ]
};

export function getBasicConceptCards(slug: string) {
  return basicConceptCardsBySlug[slug] ?? basicConceptCardsBySlug["dram-basics"];
}

export type AppliedTabId = "compare" | "tradeoff" | "source";

type Metric = {
  label: string;
  value: string;
  meaning: string;
};

type ComparisonRow = {
  item: string;
  strength: string;
  limit: string;
  readAs: string;
};

type Tradeoff = {
  title: string;
  push: string;
  gain: string;
  cost: string;
  decision: string;
};

type SourceLens = {
  sourceHint: string;
  officialSignal: string;
  engineeringRead: string;
  question: string;
};

type AppliedConfig = {
  title: string;
  description: string;
  metrics: Metric[];
  comparisons: ComparisonRow[];
  tradeoffs: Tradeoff[];
  sourceLens: SourceLens[];
};

export const appliedModeTabs: {
  id: AppliedTabId;
  label: string;
  description: string;
}[] = [
  {
    id: "compare",
    label: "비교하기",
    description: "비슷한 개념을 지표와 역할로 나눠 봅니다."
  },
  {
    id: "tradeoff",
    label: "Trade-off",
    description: "한쪽을 밀면 무엇을 얻고 잃는지 확인합니다."
  },
  {
    id: "source",
    label: "공식 자료 해석",
    description: "Big 10 공식 문장을 엔지니어링 질문으로 바꿉니다."
  }
];

const appliedModeConfigs: Record<string, AppliedConfig> = {
  "dram-basics": {
    title: "DRAM 중급 모드: 제품 이름보다 시스템 요구를 먼저 봅니다.",
    description:
      "Samsung DRAM, SK hynix 메모리 기초 자료, Micron 제품 발표를 읽을 때 용량, 대역폭, 지연 시간, 전력을 분리해서 판단합니다.",
    metrics: [
      {
        label: "Capacity",
        value: "한 번에 올려둘 데이터 양",
        meaning: "서버 메모리, AI batch, 캐시 전략과 연결됩니다."
      },
      {
        label: "Bandwidth",
        value: "단위 시간 데이터 이동량",
        meaning: "GPU와 CPU가 기다리는 시간을 줄이는 핵심 지표입니다."
      },
      {
        label: "Latency",
        value: "요청 후 도착까지의 시간",
        meaning: "응답성이 중요한 workload에서 체감 성능을 가릅니다."
      },
      {
        label: "Power",
        value: "성능을 내는 데 쓰는 에너지",
        meaning: "모바일 배터리와 데이터센터 전력 예산에 직접 연결됩니다."
      }
    ],
    comparisons: [
      {
        item: "DDR",
        strength: "범용성과 용량 확장",
        limit: "AI 가속기 옆 대역폭 집중에는 한계",
        readAs: "서버와 PC의 기본 작업 메모리"
      },
      {
        item: "LPDDR",
        strength: "낮은 전력과 얇은 폼팩터",
        limit: "최고 대역폭보다 전력 예산을 우선",
        readAs: "모바일과 AI PC의 저전력 메모리"
      },
      {
        item: "GDDR",
        strength: "그래픽 workload에 맞춘 높은 대역폭",
        limit: "패키징과 전력 효율은 HBM과 다른 선택",
        readAs: "GPU 주변의 범용 고대역폭 DRAM"
      },
      {
        item: "HBM",
        strength: "연산기 가까이에서 매우 넓은 I/O",
        limit: "패키징, 열, 수율, 공급 capacity 부담",
        readAs: "AI/HPC 병목 완화용 적층 DRAM"
      }
    ],
    tradeoffs: [
      {
        title: "셀을 더 작게 만든다",
        push: "집적도와 원가 경쟁력",
        gain: "같은 면적에 더 많은 비트를 넣을 수 있습니다.",
        cost: "전하 저장 여유가 줄어 refresh와 sensing margin 부담이 커집니다.",
        decision: "DRAM scaling 발표는 용량 증가와 셀 안정성을 함께 봅니다."
      },
      {
        title: "I/O를 더 넓힌다",
        push: "대역폭",
        gain: "CPU/GPU가 더 많은 데이터를 한 번에 받을 수 있습니다.",
        cost: "패키지, 보드, 신호 무결성, 전력 설계가 어려워집니다.",
        decision: "GDDR/HBM 발표는 bandwidth 숫자와 패키징 조건을 같이 읽습니다."
      },
      {
        title: "전력을 낮춘다",
        push: "전력 효율",
        gain: "모바일, 노트북, 서버 전력 예산을 줄일 수 있습니다.",
        cost: "최고 성능이나 응답 시간과 충돌할 수 있습니다.",
        decision: "LPDDR류 발표는 성능보다 사용 환경과 전력 제약을 먼저 봅니다."
      }
    ],
    sourceLens: [
      {
        sourceHint: "Samsung DRAM",
        officialSignal: "DRAM 제품군과 용도를 나눠 설명합니다.",
        engineeringRead: "같은 DRAM 원리가 시스템 요구에 따라 제품군으로 갈라집니다.",
        question: "이 제품은 용량, 대역폭, 전력 중 무엇을 가장 우선하나요?"
      },
      {
        sourceHint: "SK hynix Semiconductor 101",
        officialSignal: "휘발성/비휘발성 메모리를 구분합니다.",
        engineeringRead: "DRAM과 NAND를 역할별 계층으로 봐야 합니다.",
        question: "이 메모리는 작업 공간인가, 장기 저장 공간인가요?"
      }
    ]
  },
  "hbm-ai-memory": {
    title: "HBM 중급 모드: bandwidth만 보지 말고 패키지를 함께 봅니다.",
    description:
      "Samsung, SK hynix, Micron의 HBM 설명과 TSMC 3DFabric 자료를 함께 읽으며 AI 메모리 병목을 구조적으로 비교합니다.",
    metrics: [
      {
        label: "Bandwidth",
        value: "GPU가 한 번에 받을 수 있는 데이터 통로",
        meaning: "AI 학습과 추론 throughput에 직접 영향을 줍니다."
      },
      {
        label: "Capacity",
        value: "GPU 가까이에 둘 수 있는 데이터 양",
        meaning: "모델 크기, batch, cache 전략과 연결됩니다."
      },
      {
        label: "Thermal",
        value: "쌓인 die에서 열을 빼는 난이도",
        meaning: "성능 유지, 신뢰성, 패키지 설계의 핵심 제약입니다."
      },
      {
        label: "Package",
        value: "GPU와 HBM을 연결하는 물리 구조",
        meaning: "Interposer, substrate, supply capacity가 성능을 실제 제품으로 바꿉니다."
      }
    ],
    comparisons: [
      {
        item: "DDR",
        strength: "용량 확장과 범용성",
        limit: "GPU 가까이에서 bandwidth를 집중하기 어렵습니다.",
        readAs: "시스템 메모리 계층"
      },
      {
        item: "GDDR",
        strength: "GPU용 높은 대역폭",
        limit: "HBM처럼 수직 적층과 넓은 I/O를 쓰지는 않습니다.",
        readAs: "그래픽/가속기 주변 메모리"
      },
      {
        item: "HBM",
        strength: "TSV와 적층으로 대역폭 집중",
        limit: "열, 수율, 패키징 capacity가 커집니다.",
        readAs: "AI/HPC용 고급 패키징 메모리"
      },
      {
        item: "CXL/SSD 계층",
        strength: "용량 확장과 데이터 계층화",
        limit: "HBM처럼 연산기 옆 고대역폭 계층은 아닙니다.",
        readAs: "HBM 밖 데이터 이동 비용을 줄이는 보조 계층"
      }
    ],
    tradeoffs: [
      {
        title: "적층 수를 늘린다",
        push: "용량",
        gain: "GPU 가까이에 더 많은 데이터를 둘 수 있습니다.",
        cost: "스택 높이, 열, warpage, die 결함 관리가 어려워집니다.",
        decision: "몇 단 적층인지는 성능 숫자이면서 제조 난이도 신호입니다."
      },
      {
        title: "I/O 폭을 넓힌다",
        push: "대역폭",
        gain: "memory wall을 줄이고 GPU 활용률을 높일 수 있습니다.",
        cost: "Interposer, base die, 전력 전달, 신호 검증 부담이 커집니다.",
        decision: "HBM은 메모리와 패키징 발표를 항상 같이 읽어야 합니다."
      },
      {
        title: "패키지를 더 복잡하게 만든다",
        push: "시스템 성능",
        gain: "GPU와 HBM을 짧고 넓게 연결해 AI 처리량을 올립니다.",
        cost: "수율, 공급 capacity, 고객 검증 시간이 경쟁력이 됩니다.",
        decision: "TSMC/Intel 패키징 자료와 메모리 기업 발표를 교차 확인합니다."
      }
    ],
    sourceLens: [
      {
        sourceHint: "Samsung/SK hynix HBM",
        officialSignal: "TSV 기반 적층과 초고대역폭을 강조합니다.",
        engineeringRead: "대역폭은 구조, 열, 수율, 고객 검증이 함께 만든 결과입니다.",
        question: "이 HBM 발표는 bandwidth 외에 어떤 패키징 조건을 말하나요?"
      },
      {
        sourceHint: "TSMC 3DFabric",
        officialSignal: "2.5D/3D integration 플랫폼을 설명합니다.",
        engineeringRead: "HBM 성능은 GPU와 가까이 붙는 packaging capacity와 연결됩니다.",
        question: "메모리 성능이 실제 AI 서버 성능으로 이어지는 연결 조건은 무엇인가요?"
      }
    ]
  },
  "euv-dram-scaling": {
    title: "EUV 중급 모드: 짧은 파장보다 공정 통합을 먼저 봅니다.",
    description:
      "Samsung EUV, ASML lithography, Lam Research etch, KLA metrology 자료를 연결해 노광 이후 양산성까지 비교합니다.",
    metrics: [
      {
        label: "Resolution",
        value: "더 작은 패턴을 만들 가능성",
        meaning: "13.5nm EUV 파장은 미세 패턴 구현에 유리합니다."
      },
      {
        label: "Overlay",
        value: "여러 패턴 단계의 정렬 정확도",
        meaning: "Multi-patterning이 늘어날수록 오차 관리가 어려워집니다."
      },
      {
        label: "Throughput",
        value: "웨이퍼를 처리하는 속도",
        meaning: "연구 적용과 양산 적용을 가르는 생산성 지표입니다."
      },
      {
        label: "Defect",
        value: "마스크, resist, particle, 식각 전사 문제",
        meaning: "수율과 고객 공급 안정성을 좌우합니다."
      }
    ],
    comparisons: [
      {
        item: "DUV multi-patterning",
        strength: "기존 생태계와 경험 활용",
        limit: "반복 공정, overlay, 공정 시간 부담",
        readAs: "복잡도를 여러 단계로 나누는 선택"
      },
      {
        item: "EUV selected layer",
        strength: "일부 패턴을 더 적은 단계로 구현",
        limit: "장비 비용, mask/resist, throughput 부담",
        readAs: "효과가 큰 레이어에 비용을 집중하는 선택"
      },
      {
        item: "Etch/deposition",
        strength: "패턴을 실제 막질 구조로 전사",
        limit: "고종횡비, profile, uniformity 제어 필요",
        readAs: "노광 이후 구조를 완성하는 공정"
      },
      {
        item: "Metrology/inspection",
        strength: "결함을 찾고 공정 조건을 되먹임",
        limit: "미세 결함을 빠르게 잡아야 ramp-up 가능",
        readAs: "수율 학습 속도를 만드는 데이터 계층"
      }
    ],
    tradeoffs: [
      {
        title: "EUV를 더 많이 쓴다",
        push: "패터닝 단순화",
        gain: "일부 레이어에서 multi-patterning 부담을 줄일 수 있습니다.",
        cost: "장비 비용, mask defect, throughput, 공정 통합 난이도가 커집니다.",
        decision: "EUV 적용 발표는 어느 레이어에 왜 쓰는지 먼저 확인합니다."
      },
      {
        title: "DUV multi-patterning을 유지한다",
        push: "검증된 공정",
        gain: "기존 장비와 공정 경험을 활용할 수 있습니다.",
        cost: "단계 수와 overlay 오차, cycle time이 늘어날 수 있습니다.",
        decision: "DUV/EUV는 우열이 아니라 레이어별 비용 대비 효과로 봅니다."
      },
      {
        title: "계측을 더 촘촘히 한다",
        push: "수율 안정화",
        gain: "결함 원인을 빨리 찾고 process window를 좁힐 수 있습니다.",
        cost: "검사 시간과 데이터 처리 부담이 늘어날 수 있습니다.",
        decision: "KLA 같은 계측 자료는 양산 ramp-up을 읽는 핵심 근거입니다."
      }
    ],
    sourceLens: [
      {
        sourceHint: "ASML lithography",
        officialSignal: "파장, 광학, 노광 원리를 설명합니다.",
        engineeringRead: "해상도는 시작점이고 throughput과 defect가 양산성을 결정합니다.",
        question: "이 설명은 연구 수준 원리인가, 양산 장비 조건인가요?"
      },
      {
        sourceHint: "Lam/KLA",
        officialSignal: "식각, 계측, 검사, process control을 설명합니다.",
        engineeringRead: "EUV 뒤에도 패턴 전사와 결함 검출이 맞아야 제품이 됩니다.",
        question: "노광 뒤 어떤 공정과 데이터가 수율을 결정하나요?"
      }
    ]
  }
};

export function getAppliedModeConfig(slug: string) {
  return appliedModeConfigs[slug] ?? appliedModeConfigs["dram-basics"];
}

export type FieldTabId = "risk" | "decision" | "evidence";

export type FieldRisk = {
  label: string;
  trigger: string;
  impact: string;
  ownerView: string;
};

export type FieldDecision = {
  title: string;
  situation: string;
  watch: string[];
  judgment: string;
};

type EvidencePath = {
  source: string;
  signal: string;
  crossCheck: string;
  output: string;
};

type FieldConfig = {
  title: string;
  description: string;
  operatingFrame: string[];
  risks: FieldRisk[];
  decisions: FieldDecision[];
  evidencePaths: EvidencePath[];
};

export const fieldModeTabs: {
  id: FieldTabId;
  label: string;
  description: string;
}[] = [
  {
    id: "risk",
    label: "리스크 맵",
    description: "수율, 열, 전력, 공급 같은 실무 리스크를 클릭해 봅니다."
  },
  {
    id: "decision",
    label: "판단 훈련",
    description: "공식 발표를 보고 어떤 판단 문장으로 바꿀지 연습합니다."
  },
  {
    id: "evidence",
    label: "증거 연결",
    description: "Big 10 자료를 교차 확인해 포트폴리오용 근거로 바꿉니다."
  }
];

const fieldModeConfigs: Record<string, FieldConfig> = {
  "dram-basics": {
    title: "DRAM 고급 모드: 셀 구조를 제품·수율·고객 검증으로 연결합니다.",
    description:
      "Samsung DRAM과 SK hynix 메모리 자료를 읽은 뒤, DRAM을 단순 작업 메모리가 아니라 셀 안정성, refresh, 전력, 시스템 검증의 균형으로 판단합니다.",
    operatingFrame: [
      "셀을 작게 만들수록 용량과 원가 경쟁력은 좋아지지만 전하 저장 여유가 줄어듭니다.",
      "Refresh와 sensing margin은 전력, 지연 시간, 고온 신뢰성과 함께 봐야 합니다.",
      "DDR, LPDDR, GDDR, HBM은 같은 DRAM 계열이지만 고객 시스템의 병목이 다릅니다."
    ],
    risks: [
      {
        label: "Cell margin",
        trigger: "셀 면적 축소와 커패시터 전하 감소",
        impact: "read/write 안정성, refresh 부담, 고온 동작 리스크 증가",
        ownerView: "소자·공정·제품팀은 셀 구조와 sensing 조건을 함께 봅니다."
      },
      {
        label: "Power budget",
        trigger: "대역폭 상승, refresh 증가, I/O 확장",
        impact: "서버 전력, 모바일 배터리, 패키지 열 설계 부담",
        ownerView: "제품 기획과 시스템 검증은 성능 숫자보다 전력당 성능을 같이 봅니다."
      },
      {
        label: "Customer validation",
        trigger: "새 세대 DRAM 또는 새 폼팩터 적용",
        impact: "CPU/GPU/보드/펌웨어 조합에서 안정성 검증 기간 증가",
        ownerView: "양산 발표와 실제 고객 채택 사이의 검증 단계를 구분합니다."
      }
    ],
    decisions: [
      {
        title: "새 DRAM 세대 발표를 읽을 때",
        situation: "공식 자료가 속도, 용량, 전력 개선을 동시에 말합니다.",
        watch: ["어떤 시스템용 제품인가", "대역폭과 전력 중 무엇이 핵심인가", "기존 세대 대비 고객 검증 조건은 무엇인가"],
        judgment:
          "좋은 답은 '더 빠르다'가 아니라 '이 제품은 특정 시스템의 메모리 병목을 줄이되 전력·검증 비용을 함께 관리한다'입니다."
      },
      {
        title: "DRAM과 NAND를 비교할 때",
        situation: "학습자가 둘 다 메모리라서 같은 역할로 이해합니다.",
        watch: ["휘발성 여부", "latency와 bandwidth", "저장 비용과 endurance"],
        judgment:
          "DRAM은 작업 중 데이터 이동을, NAND는 장기 저장을 담당한다는 계층 구조로 설명해야 합니다."
      }
    ],
    evidencePaths: [
      {
        source: "Samsung DRAM",
        signal: "DRAM 제품군과 용도를 공식 분류로 확인",
        crossCheck: "SK hynix Semiconductor 101의 volatile/non-volatile 구분과 대조",
        output: "DRAM은 작업 메모리이며 제품군은 시스템 병목별로 갈라진다는 설명"
      },
      {
        source: "Micron memory/SSD 발표",
        signal: "DRAM과 NAND/SSD가 데이터센터에서 서로 다른 병목을 담당",
        crossCheck: "Samsung/SK 자료의 메모리 계층 설명과 연결",
        output: "메모리 계층 비교표와 공식 발표 해석 노트"
      }
    ]
  },
  "hbm-ai-memory": {
    title: "HBM 고급 모드: AI 메모리를 양산·패키징·공급 capacity로 판단합니다.",
    description:
      "Samsung, SK hynix, Micron의 HBM 발표와 TSMC 3DFabric 자료를 함께 읽고, bandwidth 숫자를 열·수율·패키지 capacity·고객 검증으로 확장합니다.",
    operatingFrame: [
      "HBM의 가치는 bandwidth 숫자만이 아니라 GPU 가까이에 놓이는 패키징 구조에서 나옵니다.",
      "적층 수가 늘면 용량은 커지지만 열, warpage, known good die, 스택 수율 리스크가 커집니다.",
      "AI 서버 성능은 HBM 공급, interposer capacity, GPU 패키지, 냉각, 고객 검증이 함께 맞아야 나옵니다."
    ],
    risks: [
      {
        label: "Thermal path",
        trigger: "DRAM die 적층과 높은 대역폭 동작",
        impact: "성능 유지, 장기 신뢰성, 패키지 냉각 설계 난이도 증가",
        ownerView: "패키징·시스템팀은 bandwidth와 열 경로를 한 묶음으로 봅니다."
      },
      {
        label: "Stack yield",
        trigger: "여러 die, TSV, base die, interposer 결합",
        impact: "하나의 결함이 고가 패키지 전체 가치에 영향을 줄 수 있음",
        ownerView: "양산 관점에서는 die 품질과 패키지 수율을 동시에 관리합니다."
      },
      {
        label: "Supply capacity",
        trigger: "AI 서버 수요 급증과 고급 패키징 병목",
        impact: "제품 스펙이 좋아도 납기, 고객 채택, 매출 인식이 제한될 수 있음",
        ownerView: "산업 자료는 기술 발표와 공급 가능성을 분리해서 읽습니다."
      }
    ],
    decisions: [
      {
        title: "HBM 신제품 발표를 읽을 때",
        situation: "공식 자료가 적층 수, bandwidth, AI 성능 기여를 강조합니다.",
        watch: ["몇 단 적층인가", "GPU와 어떤 패키지로 연결되는가", "열과 고객 검증 언급이 있는가"],
        judgment:
          "고급 해석은 '대역폭 증가'에서 멈추지 않고 '패키징과 공급 capacity가 성능을 실제 AI 서버로 바꾸는 조건'까지 말합니다."
      },
      {
        title: "HBM과 CXL/SSD 계층을 비교할 때",
        situation: "AI 데이터가 HBM 안에만 머문다고 오해하기 쉽습니다.",
        watch: ["자주 쓰는 데이터와 덜 자주 쓰는 데이터", "latency 계층", "용량 확장 비용"],
        judgment:
          "HBM은 가장 가까운 고대역폭 계층이고, 나머지 메모리/스토리지 계층은 용량과 비용 병목을 나눠 맡습니다."
      }
    ],
    evidencePaths: [
      {
        source: "Samsung/SK hynix/Micron HBM",
        signal: "TSV, stacked DRAM, AI/HPC bandwidth 강조",
        crossCheck: "TSMC 3DFabric의 2.5D/3D integration 자료와 연결",
        output: "HBM은 메모리 제품이면서 고급 패키징 제품이라는 판단 문장"
      },
      {
        source: "SK hynix AI memory 자료",
        signal: "Memory wall과 AI data movement 문제 제시",
        crossCheck: "NVIDIA 같은 시스템 자료는 수요 맥락으로만 보조 확인",
        output: "AI 병목은 연산 성능보다 데이터 이동 계층 설계까지 포함한다는 설명"
      }
    ]
  },
  "euv-dram-scaling": {
    title: "EUV 고급 모드: 장비 도입이 아니라 공정 통합 역량으로 판단합니다.",
    description:
      "Samsung EUV, ASML lithography, Lam Research etch, KLA metrology 자료를 교차해 EUV를 해상도, throughput, defect, etch transfer, yield learning으로 읽습니다.",
    operatingFrame: [
      "EUV의 13.5nm 파장은 시작점이고, 양산에서는 throughput과 defect 관리가 실제 성과를 가릅니다.",
      "노광으로 패턴을 만든 뒤 식각, 증착, 계측이 맞아야 실제 구조와 수율이 나옵니다.",
      "EUV는 모든 레이어에 쓰는 만능 도구가 아니라 효과가 큰 레이어를 선택하는 비용·수율 판단입니다."
    ],
    risks: [
      {
        label: "Mask/resist defect",
        trigger: "EUV mask, resist, particle, stochastic defect",
        impact: "미세 결함이 수율과 고객 신뢰성으로 확대될 수 있음",
        ownerView: "공정 통합팀은 장비 성능보다 defect budget을 더 민감하게 봅니다."
      },
      {
        label: "Etch transfer",
        trigger: "노광 패턴을 실제 막질로 옮기는 후속 식각",
        impact: "profile, CD uniformity, line roughness가 전기적 특성을 흔듦",
        ownerView: "Lam 같은 식각 자료를 함께 봐야 EUV가 제품 구조로 이어집니다."
      },
      {
        label: "Yield learning",
        trigger: "새 레이어, 새 장비, 새 defect mode 도입",
        impact: "양산 ramp-up 속도와 원가 경쟁력에 직접 영향",
        ownerView: "KLA 같은 계측/검사 자료는 수율 학습 속도를 읽는 근거입니다."
      }
    ],
    decisions: [
      {
        title: "EUV 적용 발표를 읽을 때",
        situation: "공식 자료가 13.5nm, single patterning, 생산성 개선을 말합니다.",
        watch: ["어느 레이어에 적용됐는가", "multi-patterning을 얼마나 줄였는가", "defect와 계측 전략이 보이는가"],
        judgment:
          "고급 해석은 '더 작게 그린다'가 아니라 '공정 단계, overlay, defect, yield learning을 함께 줄이는 통합 선택'입니다."
      },
      {
        title: "ASML 자료와 Samsung 자료를 연결할 때",
        situation: "ASML은 장비 원리를, Samsung은 DRAM 양산 적용을 말합니다.",
        watch: ["장비 원리와 제품 적용의 차이", "throughput", "공정 통합 책임"],
        judgment:
          "장비 원리 자료는 가능성을 설명하고, 제품 양산 자료는 수율과 고객 공급 조건을 보여줍니다."
      }
    ],
    evidencePaths: [
      {
        source: "ASML lithography",
        signal: "EUV optics, wavelength, lithography principle",
        crossCheck: "Samsung EUV DRAM 양산 자료의 생산성·수율 표현과 연결",
        output: "EUV는 해상도 기술이면서 양산 공정 통합 기술이라는 설명"
      },
      {
        source: "Lam Research / KLA",
        signal: "Etch, metrology, inspection, process control",
        crossCheck: "EUV 이후 패턴 전사와 결함 검출이 수율을 결정한다는 맥락 보강",
        output: "노광-식각-계측-수율을 하나의 흐름으로 보는 고급 공정 해석"
      }
    ]
  }
};

export function getFieldModeConfig(slug: string) {
  return fieldModeConfigs[slug] ?? fieldModeConfigs["dram-basics"];
}
