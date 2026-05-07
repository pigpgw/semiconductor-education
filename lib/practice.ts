import type { LevelId } from "@/lib/levels";

export type PracticeQuestion = {
  question: string;
  hint: string;
  answer: string;
  fieldPoint: string;
  relatedLesson: {
    title: string;
    href: string;
  };
};

export type PracticeScenario = {
  title: string;
  prompt: string;
  checkpoints: string[];
};

export type PracticeSet = {
  levelId: LevelId;
  levelLabel: "기초" | "중급" | "심화";
  title: string;
  description: string;
  questions: PracticeQuestion[];
  scenarios: PracticeScenario[];
};

export const practiceSets: PracticeSet[] = [
  {
    levelId: "basic",
    levelLabel: "기초",
    title: "말로 설명할 수 있는지 확인합니다.",
    description:
      "정답 암기보다 큰 그림을 자기 말로 설명하는 것이 목표입니다. 초등학생에게 설명한다고 생각하고 답해 보세요.",
    questions: [
      {
        question: "DRAM과 SSD는 왜 둘 다 저장처럼 보이지만 역할이 다를까요?",
        hint: "책상과 책장 비유를 떠올려 보세요.",
        answer:
          "DRAM은 지금 쓰는 데이터를 빠르게 올려두는 작업 공간이고, SSD는 전원이 꺼져도 데이터를 오래 보관하는 저장 공간입니다.",
        fieldPoint:
          "실제 시스템 성능은 저장 용량만으로 결정되지 않습니다. CPU/GPU가 자주 쓰는 데이터를 얼마나 빨리 가져오는지도 중요합니다.",
        relatedLesson: {
          title: "DRAM은 왜 빠른 작업 메모리인가",
          href: "/learn/dram-basics"
        }
      },
      {
        question: "반도체에서 트랜지스터를 스위치라고 부르는 이유는 무엇일까요?",
        hint: "전류가 흐르는 길을 열고 닫는다는 관점으로 답해 보세요.",
        answer:
          "트랜지스터는 전기 신호로 전류가 흐르는 길을 열거나 닫습니다. 이 동작이 0과 1을 표현하는 기반이 됩니다.",
        fieldPoint:
          "소자 크기, 누설 전류, 스위칭 속도는 메모리와 로직 제품의 성능·전력·수율에 영향을 줍니다.",
        relatedLesson: {
          title: "학습 로드맵",
          href: "/roadmap"
        }
      }
    ],
    scenarios: [
      {
        title: "친구에게 1분 설명하기",
        prompt:
          "반도체를 처음 듣는 친구에게 DRAM, NAND, HBM이 각각 어디에 쓰이는지 1분 안에 설명해 보세요.",
        checkpoints: [
          "DRAM을 작업 메모리로 설명했다",
          "NAND를 오래 보관하는 저장 메모리로 설명했다",
          "HBM을 AI 연산기에 데이터를 빠르게 공급하는 메모리로 설명했다"
        ]
      }
    ]
  },
  {
    levelId: "applied",
    levelLabel: "중급",
    title: "구조와 트레이드오프를 연결합니다.",
    description:
      "용어를 아는 것에서 끝내지 않고 왜 그 구조가 필요한지, 어떤 대가를 치르는지까지 확인합니다.",
    questions: [
      {
        question: "HBM은 왜 단순히 DRAM 용량을 키운 제품이 아닐까요?",
        hint: "적층, TSV, 대역폭, GPU와의 거리를 함께 생각하세요.",
        answer:
          "HBM은 DRAM 다이를 수직으로 쌓고 TSV로 연결해 GPU 가까이에서 넓은 데이터 통로를 제공합니다. 핵심은 용량 증가보다 대역폭과 데이터 이동 병목 완화입니다.",
        fieldPoint:
          "HBM 경쟁력은 메모리 셀뿐 아니라 패키징, 열 방출, 정렬, 수율, 고객 검증까지 함께 봐야 합니다.",
        relatedLesson: {
          title: "HBM은 왜 AI 시대의 핵심 메모리인가",
          href: "/learn/hbm-ai-memory"
        }
      },
      {
        question: "DRAM refresh는 왜 성능과 전력 관점에서도 중요한가요?",
        hint: "데이터를 유지하려면 주기적으로 다시 써야 한다는 점에서 출발하세요.",
        answer:
          "refresh는 전하가 새어 나가는 DRAM 셀의 데이터를 유지하는 동작입니다. 이 동작이 너무 잦거나 오래 걸리면 전력과 지연 시간에 영향을 줍니다.",
        fieldPoint:
          "서버와 모바일에서는 refresh 특성이 전력 효율, 고온 안정성, 시스템 응답성에 연결됩니다.",
        relatedLesson: {
          title: "DRAM은 왜 빠른 작업 메모리인가",
          href: "/learn/dram-basics"
        }
      }
    ],
    scenarios: [
      {
        title: "제품 비교 메모 작성",
        prompt:
          "DDR, LPDDR, GDDR, HBM을 비교하는 표를 만들고 각 제품이 어느 시스템에 맞는지 설명해 보세요.",
        checkpoints: [
          "용량만 아니라 대역폭과 전력을 함께 봤다",
          "모바일, 그래픽, AI 서버의 요구가 다르다는 점을 썼다",
          "HBM에서 패키징과 열 관리가 중요하다는 점을 포함했다"
        ]
      }
    ]
  },
  {
    levelId: "field",
    levelLabel: "심화",
    title: "실무 판단 기준으로 답합니다.",
    description:
      "기술이 좋다는 말 뒤에 어떤 병목, 양산 난이도, 비용, 검증 문제가 있는지 분리해 보는 단계입니다.",
    questions: [
      {
        question: "EUV가 더 짧은 파장을 쓰는데도 도입이 어렵다고 말하는 이유는 무엇인가요?",
        hint: "장비만 사면 끝나는 문제가 아니라는 점을 생각하세요.",
        answer:
          "EUV는 더 미세한 패턴을 만들 수 있지만 장비, 마스크, 결함 제어, 공정 조건, 생산성, 수율 확보가 모두 어렵습니다. 양산 적용은 기술 시연보다 훨씬 복잡합니다.",
        fieldPoint:
          "실무에서는 EUV 적용 여부보다 어떤 층에 적용했는지, 공정 단계를 얼마나 줄였는지, 수율과 생산성을 확보했는지가 중요합니다.",
        relatedLesson: {
          title: "EUV는 왜 DRAM 미세화에 중요한가",
          href: "/learn/euv-dram-scaling"
        }
      },
      {
        question: "AI 메모리에서 memory wall을 설명할 때 HBM만 말하면 부족한 이유는 무엇인가요?",
        hint: "GPU, 메모리, 저장장치, 데이터 이동 전체를 시스템으로 보세요.",
        answer:
          "HBM은 GPU 가까이에서 높은 대역폭을 제공하지만, 전체 AI 인프라 병목은 캐시, 인터커넥트, 저장장치, 전력, 열, 비용까지 연결됩니다.",
        fieldPoint:
          "현업 판단은 단일 부품 성능보다 시스템 처리량, TCO, 전력 효율, 공급 안정성까지 포함합니다.",
        relatedLesson: {
          title: "HBM은 왜 AI 시대의 핵심 메모리인가",
          href: "/learn/hbm-ai-memory"
        }
      }
    ],
    scenarios: [
      {
        title: "면접형 설명 준비",
        prompt:
          "삼성전자 또는 SK하이닉스 기술 블로그의 HBM/EUV 글을 읽고, 홍보 문장과 엔지니어링 의미를 분리해 5문장으로 요약해 보세요.",
        checkpoints: [
          "기술의 장점을 한 문장으로 요약했다",
          "양산, 수율, 열, 패키징, 고객 검증 중 최소 두 가지 제약을 언급했다",
          "공식 출처의 표현을 그대로 복사하지 않고 자기 말로 바꿨다"
        ]
      }
    ]
  }
];
