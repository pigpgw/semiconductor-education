import type { LevelId } from "@/lib/levels";

export type PracticeQuestion = {
  topic: string;
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
        topic: "DRAM",
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
        topic: "NAND",
        question: "NAND와 SSD는 왜 전원이 꺼져도 데이터를 보관할 수 있을까요?",
        hint: "DRAM처럼 작업 중 잠깐 쓰는 공간인지, 오래 남기는 저장 공간인지 나눠 보세요.",
        answer:
          "NAND는 전하 상태를 오래 유지하는 비휘발성 메모리라 전원이 꺼져도 데이터가 남습니다. SSD는 이 NAND를 컨트롤러와 펌웨어로 관리해 실제 저장장치로 동작하게 합니다.",
        fieldPoint:
          "저장장치는 용량뿐 아니라 오류 정정, 내구성, 전력, 컨트롤러 정책이 함께 성능과 신뢰성을 결정합니다.",
        relatedLesson: {
          title: "NAND와 SSD는 왜 오래 저장하는 메모리인가",
          href: "/learn/nand-ssd-storage"
        }
      },
      {
        topic: "소자",
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
      },
      {
        topic: "기초",
        question: "반도체가 도체와 부도체의 중간이라는 말은 무슨 뜻일까요?",
        hint: "항상 전기가 잘 통하거나 항상 막히는 물질이 아니라는 점을 생각하세요.",
        answer:
          "반도체는 조건에 따라 전기가 흐르기도 하고 막히기도 하는 물질입니다. 불순물, 전압, 빛, 온도 같은 조건으로 전기적 성질을 조절할 수 있습니다.",
        fieldPoint:
          "공정과 소자 설계는 이 조절 가능성을 이용해 스위치, 저장 셀, 센서 같은 기능을 만듭니다.",
        relatedLesson: {
          title: "학습 로드맵",
          href: "/roadmap"
        }
      },
      {
        topic: "DRAM",
        question: "DRAM이 빠른데도 컴퓨터가 SSD만으로 동작하지 않는 이유는 무엇일까요?",
        hint: "오래 보관하는 능력과 빠르게 꺼내 쓰는 능력을 구분해 보세요.",
        answer:
          "SSD는 전원이 꺼져도 데이터를 보관하지만 CPU가 매 순간 필요한 데이터를 처리하기에는 DRAM보다 느립니다. 그래서 실행 중인 데이터는 DRAM에 올려 빠르게 접근합니다.",
        fieldPoint:
          "시스템 설계에서는 저장장치 용량, DRAM 용량, 캐시, 인터페이스 속도가 함께 성능 병목을 만듭니다.",
        relatedLesson: {
          title: "DRAM은 왜 빠른 작업 메모리인가",
          href: "/learn/dram-basics"
        }
      },
      {
        topic: "HBM",
        question: "HBM을 데이터가 지나가는 넓은 도로라고 비유할 수 있는 이유는 무엇일까요?",
        hint: "한 번에 지나갈 수 있는 데이터 양을 떠올려 보세요.",
        answer:
          "HBM은 GPU 가까이에서 매우 넓은 데이터 통로를 제공합니다. 같은 시간에 더 많은 데이터를 옮길 수 있어 AI 연산기가 기다리는 시간을 줄입니다.",
        fieldPoint:
          "AI 서버에서는 연산 성능만큼 데이터 공급 능력이 중요하므로 대역폭, 전력, 패키징을 함께 봐야 합니다.",
        relatedLesson: {
          title: "HBM은 왜 AI 시대의 핵심 메모리인가",
          href: "/learn/hbm-ai-memory"
        }
      },
      {
        topic: "EUV",
        question: "EUV에서 빛의 파장이 짧다는 말은 왜 중요할까요?",
        hint: "두꺼운 펜과 얇은 펜으로 작은 글씨를 쓰는 차이를 떠올려 보세요.",
        answer:
          "파장이 짧을수록 더 작은 패턴을 그릴 수 있는 여지가 커집니다. 그래서 EUV는 더 미세한 회로 패턴을 만드는 데 중요합니다.",
        fieldPoint:
          "하지만 짧은 파장은 시작점일 뿐이고 실제 양산에서는 장비, 마스크, 결함, 수율을 함께 제어해야 합니다.",
        relatedLesson: {
          title: "EUV는 왜 DRAM 미세화에 중요한가",
          href: "/learn/euv-dram-scaling"
        }
      },
      {
        topic: "제조",
        question: "수율이 낮으면 기술이 좋아 보여도 왜 문제가 될까요?",
        hint: "100개를 만들었을 때 정상 제품이 몇 개인지 생각해 보세요.",
        answer:
          "수율이 낮으면 정상 제품이 적게 나와 원가가 올라가고 공급량도 줄어듭니다. 기술 시연이 성공해도 안정적으로 많이 만들지 못하면 제품 경쟁력이 약해집니다.",
        fieldPoint:
          "현업에서는 성능 발표와 함께 양산성, 결함 관리, 고객 납기, 원가 구조를 함께 판단합니다.",
        relatedLesson: {
          title: "용어 사전",
          href: "/glossary"
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
        topic: "HBM",
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
        topic: "DRAM",
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
      },
      {
        topic: "DRAM",
        question: "DDR, LPDDR, GDDR, HBM은 모두 DRAM 계열인데 왜 용도가 다를까요?",
        hint: "속도 하나만 보지 말고 전력, 거리, 패키징, 시스템 종류를 같이 보세요.",
        answer:
          "각 제품군은 같은 DRAM 계열이라도 목표 시스템이 다릅니다. DDR은 범용 컴퓨팅, LPDDR은 저전력 모바일, GDDR은 그래픽, HBM은 AI/HPC의 높은 대역폭에 초점을 둡니다.",
        fieldPoint:
          "제품 선택은 최고 성능 하나로 끝나지 않고 전력 예산, 보드 면적, 패키징 비용, 공급 안정성까지 포함합니다.",
        relatedLesson: {
          title: "DRAM은 왜 빠른 작업 메모리인가",
          href: "/learn/dram-basics"
        }
      },
      {
        topic: "NAND",
        question: "3D NAND가 셀을 위로 쌓는 방식으로 용량을 늘리는 이유는 무엇인가요?",
        hint: "땅이 부족할 때 건물을 높게 짓는 상황을 떠올려 보세요.",
        answer:
          "평면에서 셀을 계속 줄이면 간섭과 신뢰성 문제가 커집니다. 3D NAND는 셀을 위로 쌓아 같은 면적에서 더 큰 저장 용량을 확보합니다.",
        fieldPoint:
          "층 수가 늘면 채널 홀 식각, 균일도, 결함 관리, 수율 같은 제조 난이도도 함께 올라갑니다.",
        relatedLesson: {
          title: "NAND와 SSD는 왜 오래 저장하는 메모리인가",
          href: "/learn/nand-ssd-storage"
        }
      },
      {
        topic: "NAND",
        question: "QLC NAND를 볼 때 용량이 커진다는 장점 말고 무엇을 함께 봐야 할까요?",
        hint: "한 셀에 더 많은 비트를 넣으면 셀 상태를 더 촘촘히 구분해야 합니다.",
        answer:
          "QLC는 셀 하나에 4비트를 저장해 용량과 비용 면에서 유리할 수 있습니다. 대신 오류 정정, 캐싱, 쓰기 수명, 컨트롤러 정책이 더 중요해집니다.",
        fieldPoint:
          "제품 발표에서 QLC는 용량 숫자뿐 아니라 고객 workload, 전력 효율, 내구성, 공급 안정성까지 함께 확인해야 합니다.",
        relatedLesson: {
          title: "NAND와 SSD는 왜 오래 저장하는 메모리인가",
          href: "/learn/nand-ssd-storage"
        }
      },
      {
        topic: "HBM",
        question: "TSV는 HBM에서 어떤 문제를 풀고, 어떤 문제를 새로 만들까요?",
        hint: "칩을 쌓았을 때 위아래를 어떻게 연결할지 생각하세요.",
        answer:
          "TSV는 쌓인 DRAM 다이를 수직으로 연결해 짧고 넓은 데이터 경로를 만듭니다. 대신 구멍 형성, 정렬, 접합, 열, 수율 관리가 어려워집니다.",
        fieldPoint:
          "HBM 경쟁력은 셀 설계뿐 아니라 패키징 공정, 검사, 열 관리, 고객 검증 역량까지 포함합니다.",
        relatedLesson: {
          title: "HBM은 왜 AI 시대의 핵심 메모리인가",
          href: "/learn/hbm-ai-memory"
        }
      },
      {
        topic: "EUV",
        question: "DUV에서 멀티 패터닝을 쓰면 왜 비용과 오차 부담이 커질까요?",
        hint: "한 번에 그릴 그림을 여러 번 나누어 맞추는 상황을 생각하세요.",
        answer:
          "멀티 패터닝은 작은 패턴을 여러 번 나누어 그리는 방식입니다. 공정 횟수가 늘고 각 패턴을 정확히 맞춰야 하므로 시간, 비용, overlay 오차, 결함 가능성이 커집니다.",
        fieldPoint:
          "EUV 도입 이유는 더 작은 패턴뿐 아니라 일부 구간에서 공정 복잡도를 낮출 수 있다는 점과 연결됩니다.",
        relatedLesson: {
          title: "EUV는 왜 DRAM 미세화에 중요한가",
          href: "/learn/euv-dram-scaling"
        }
      },
      {
        topic: "시스템",
        question: "메모리 성능을 볼 때 대역폭과 지연 시간을 구분해야 하는 이유는 무엇인가요?",
        hint: "도로의 차선 수와 목적지까지 걸리는 시간을 나눠 생각하세요.",
        answer:
          "대역폭은 한 번에 옮길 수 있는 데이터 양이고, 지연 시간은 요청한 데이터가 도착하기까지 걸리는 시간입니다. 둘은 모두 중요하지만 같은 문제가 아닙니다.",
        fieldPoint:
          "AI 학습, 게임, 모바일, 서버 워크로드는 대역폭과 지연 시간에 민감한 정도가 달라 제품 요구사항도 달라집니다.",
        relatedLesson: {
          title: "HBM은 왜 AI 시대의 핵심 메모리인가",
          href: "/learn/hbm-ai-memory"
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
        topic: "EUV",
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
        topic: "AI 메모리",
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
      },
      {
        topic: "DRAM",
        question: "DRAM 미세화에서 커패시터가 작아질수록 어떤 실무 문제가 커질까요?",
        hint: "작은 컵에 물을 담으면 조금만 새어도 티가 많이 난다는 비유를 떠올리세요.",
        answer:
          "셀 면적이 줄면 충분한 전하를 저장하기 어려워지고 누설 전류와 refresh 부담이 커질 수 있습니다. 재료, 구조, 공정 균일도 제어가 더 중요해집니다.",
        fieldPoint:
          "DRAM scaling은 선폭 축소만의 문제가 아니라 capacitor 형상, 유전막, 식각, 증착, 수율이 묶인 제조 문제입니다.",
        relatedLesson: {
          title: "DRAM은 왜 빠른 작업 메모리인가",
          href: "/learn/dram-basics"
        }
      },
      {
        topic: "HBM",
        question: "HBM 패키징에서 열 문제가 성능 문제로 바뀌는 과정은 무엇인가요?",
        hint: "칩을 쌓으면 열이 빠져나가는 길이 어떻게 달라지는지 생각하세요.",
        answer:
          "다이를 쌓으면 전력 밀도와 열 이동 경로가 어려워집니다. 열이 충분히 빠지지 않으면 동작 속도 제한, 신뢰성 저하, 패키지 설계 제약으로 이어질 수 있습니다.",
        fieldPoint:
          "현업에서는 대역폭 수치와 함께 전력 효율, 냉각 조건, 패키지 두께, 고객 시스템 검증을 같이 봅니다.",
        relatedLesson: {
          title: "HBM은 왜 AI 시대의 핵심 메모리인가",
          href: "/learn/hbm-ai-memory"
        }
      },
      {
        topic: "시스템",
        question: "CXL 같은 메모리 확장 기술이 HBM을 바로 대체한다고 보기 어려운 이유는 무엇인가요?",
        hint: "가까운 초고속 작업 공간과 멀리 있는 확장 공간을 나눠 보세요.",
        answer:
          "HBM은 GPU 가까이에서 매우 높은 대역폭을 제공하고, CXL은 시스템 차원에서 메모리를 유연하게 확장하는 연결 표준입니다. 해결하는 병목과 위치가 다릅니다.",
        fieldPoint:
          "AI 인프라에서는 HBM, DDR, CXL 메모리, 저장장치를 계층으로 보고 성능, 비용, 전력, 용량을 조합합니다.",
        relatedLesson: {
          title: "용어 사전",
          href: "/glossary"
        }
      },
      {
        topic: "NAND",
        question: "SSD 신제품 발표를 실무 관점으로 읽을 때 어떤 질문을 던져야 하나요?",
        hint: "용량, 인터페이스, 컨트롤러, 내구성, 고객 workload를 나눠 보세요.",
        answer:
          "몇 단 NAND인지, TLC/QLC인지, 어떤 인터페이스와 컨트롤러를 쓰는지, 랜덤 I/O와 순차 성능이 어떤 workload 기준인지, 내구성과 전력 효율을 어떻게 관리하는지 확인해야 합니다.",
        fieldPoint:
          "SSD 경쟁력은 NAND 셀 밀도뿐 아니라 컨트롤러, 펌웨어, 오류 정정, 고객 인증, 공급 규모가 함께 만드는 제품 경쟁력입니다.",
        relatedLesson: {
          title: "NAND와 SSD는 왜 오래 저장하는 메모리인가",
          href: "/learn/nand-ssd-storage"
        }
      },
      {
        topic: "산업 해석",
        question: "새 공정이나 새 패키징 기술이 발표되면 어떤 질문으로 실무성을 확인해야 할까요?",
        hint: "좋다는 말 뒤에 양산과 고객 적용을 확인하는 질문을 붙여 보세요.",
        answer:
          "어떤 병목을 줄였는지, 기존 방식 대비 비용과 공정 수는 어떤지, 수율은 확보됐는지, 고객 제품에 적용 가능한지, 공급 규모를 늘릴 수 있는지 확인해야 합니다.",
        fieldPoint:
          "기술 발표를 면접이나 포트폴리오에서 다룰 때는 주장보다 적용 조건, trade-off, 검증 상태를 분리해 말하는 것이 중요합니다.",
        relatedLesson: {
          title: "산업 업데이트",
          href: "/industry"
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

export const practiceTopics = Array.from(
  new Set(
    practiceSets.flatMap((set) => set.questions.map((question) => question.topic))
  )
).sort((a, b) => a.localeCompare(b));
