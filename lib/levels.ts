export type LevelId = "basic" | "applied" | "field";

export type LearningLevel = {
  id: LevelId;
  label: string;
  badge: string;
  title: string;
  description: string;
  selfCheck: string[];
  readingMode: string;
  outcome: string;
  href: string;
};

export const levels: LearningLevel[] = [
  {
    id: "basic",
    label: "기초",
    badge: "Level 1",
    title: "처음 듣는 사람도 따라오는 단계",
    description:
      "반도체가 무엇인지, 왜 메모리가 필요한지, 전기 신호와 0/1이 어떻게 연결되는지부터 시작합니다.",
    selfCheck: [
      "CPU, 메모리, 저장장치 차이가 아직 흐릿하다",
      "전압, 전류, 트랜지스터라는 말을 들어봤지만 설명은 어렵다",
      "수식보다 그림, 비유, 생활 예시가 먼저 필요하다"
    ],
    readingMode:
      "한 줄 결론과 쉬운 비유를 먼저 읽고, 용어 설명 박스를 보면서 본문을 따라갑니다.",
    outcome: "DRAM, NAND, HBM, EUV가 각각 어떤 문제를 푸는지 말할 수 있습니다.",
    href: "/learn?level=%EA%B8%B0%EC%B4%88"
  },
  {
    id: "applied",
    label: "중급",
    badge: "Level 2",
    title: "기술 구조와 트레이드오프를 연결하는 단계",
    description:
      "DRAM 셀, refresh, TSV, 대역폭, 패터닝처럼 실제 기술 구조를 성능·전력·비용 관점으로 연결합니다.",
    selfCheck: [
      "DRAM과 SSD의 차이는 알지만 refresh나 TSV는 설명이 어렵다",
      "제품 이름보다 왜 그런 구조가 필요한지 알고 싶다",
      "공식 블로그의 기술 문장을 내 말로 풀고 싶다"
    ],
    readingMode:
      "본문 표와 현업 키워드를 중심으로 읽고, 각 글의 체크 질문에 답하면서 이해도를 점검합니다.",
    outcome:
      "메모리 제품이 용량, 대역폭, 전력, 패키징 사이에서 어떤 선택을 하는지 설명할 수 있습니다.",
    href: "/learn?level=%EC%A4%91%EA%B8%89"
  },
  {
    id: "field",
    label: "심화",
    badge: "Level 3",
    title: "실무 레벨의 판단 기준까지 보는 단계",
    description:
      "수율, 공정 복잡도, 패키징 한계, 고객 검증, AI 인프라 병목처럼 실제 산업 의사결정에 가까운 기준을 봅니다.",
    selfCheck: [
      "HBM, EUV, CXL, PIM 같은 키워드를 산업 맥락에서 비교하고 싶다",
      "기술 홍보 문구 뒤의 병목, 제약, 양산 난이도를 알고 싶다",
      "채용 면접이나 기술 블로그에서 깊이 있는 설명을 하고 싶다"
    ],
    readingMode:
      "공식 출처를 함께 열어 제품 스펙, 병목, 공정·패키징 제약을 비교하며 읽습니다.",
    outcome:
      "삼성전자와 SK하이닉스 기술 공유 자료를 읽고 핵심 주장과 실무적 의미를 분리해 설명할 수 있습니다.",
    href: "/learn?level=%EC%8B%AC%ED%99%94"
  }
];

export function getLevelByLabel(label: string) {
  return levels.find((level) => level.label === label);
}

export function getRecommendedLevel(score: number) {
  if (score <= 5) {
    return levels[0];
  }

  if (score <= 10) {
    return levels[1];
  }

  return levels[2];
}
