export type StudyTask = {
  id: string;
  title: string;
  description: string;
  href: string;
  level: "기초" | "중급" | "심화";
};

export const studyTasks: StudyTask[] = [
  {
    id: "level-check",
    title: "내 레벨 정하기",
    description: "8개 질문으로 기초, 중급, 심화 중 현재 시작점을 정합니다.",
    href: "/level",
    level: "기초"
  },
  {
    id: "roadmap-scan",
    title: "로드맵 훑기",
    description: "전기 신호부터 AI 메모리까지 전체 흐름을 먼저 봅니다.",
    href: "/roadmap",
    level: "기초"
  },
  {
    id: "dram",
    title: "DRAM 글 읽기",
    description: "작업 메모리, 1T1C, refresh, DDR 계열을 정리합니다.",
    href: "/learn/dram-basics",
    level: "기초"
  },
  {
    id: "glossary",
    title: "용어 사전으로 막힌 단어 풀기",
    description: "DRAM, HBM, TSV, EUV, 수율 같은 핵심 용어를 확인합니다.",
    href: "/glossary",
    level: "중급"
  },
  {
    id: "hbm",
    title: "HBM 글 읽기",
    description: "TSV, 적층, 대역폭, memory wall을 AI 시스템 관점으로 봅니다.",
    href: "/learn/hbm-ai-memory",
    level: "중급"
  },
  {
    id: "euv",
    title: "EUV 글 읽기",
    description: "DUV/EUV 차이, 멀티 패터닝, 수율과 양산성을 연결합니다.",
    href: "/learn/euv-dram-scaling",
    level: "심화"
  },
  {
    id: "practice",
    title: "복습 문제 풀기",
    description: "핵심 답과 실무 포인트를 자기 말로 설명할 수 있는지 확인합니다.",
    href: "/practice",
    level: "심화"
  }
];

export const noteTemplate = `# Semiconductor Education 학습 노트

## 오늘 읽은 글
-

## 한 줄 결론
-

## 쉬운 비유로 설명하면
-

## 핵심 구조
-

## 실무 포인트
- 성능:
- 전력:
- 비용:
- 수율/양산성:
- 패키징/열:

## 아직 헷갈리는 용어
-

## 공식 출처에서 다시 확인할 것
-

## 면접/포트폴리오용 3문장 설명
1.
2.
3.
`;
