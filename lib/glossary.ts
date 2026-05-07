export type GlossaryTerm = {
  term: string;
  english: string;
  category: string;
  level: "기초" | "중급" | "심화";
  simple: string;
  fieldUse: string;
  related: string[];
};

export const glossary: GlossaryTerm[] = [
  {
    term: "반도체",
    english: "Semiconductor",
    category: "기초",
    level: "기초",
    simple:
      "전기가 잘 통하는 도체와 잘 통하지 않는 부도체의 중간 성질을 가진 재료입니다.",
    fieldUse:
      "전류 흐름을 정밀하게 제어할 수 있어서 트랜지스터, 메모리, 센서, 전력 소자 같은 칩의 기반이 됩니다.",
    related: ["트랜지스터", "웨이퍼", "공정"]
  },
  {
    term: "트랜지스터",
    english: "Transistor",
    category: "소자",
    level: "기초",
    simple:
      "전기 신호를 켜고 끄는 아주 작은 스위치입니다. 컴퓨터의 0과 1을 만드는 핵심 부품입니다.",
    fieldUse:
      "게이트가 채널 전류를 제어하며, 소자 크기와 누설 전류, 속도, 전력은 공정 세대와 제품 특성을 좌우합니다.",
    related: ["MOSFET", "DRAM", "NAND"]
  },
  {
    term: "MOSFET",
    english: "Metal-Oxide-Semiconductor Field-Effect Transistor",
    category: "소자",
    level: "중급",
    simple:
      "게이트 전압으로 전류가 흐르는 길을 열고 닫는 트랜지스터입니다.",
    fieldUse:
      "메모리 셀 접근, 로직 회로 스위칭, 누설 전류 제어의 기본 단위이며 미세화 한계와 직접 연결됩니다.",
    related: ["트랜지스터", "DRAM", "공정"]
  },
  {
    term: "DRAM",
    english: "Dynamic Random Access Memory",
    category: "메모리",
    level: "기초",
    simple:
      "컴퓨터가 지금 쓰는 데이터를 잠깐 올려두는 빠른 작업 메모리입니다.",
    fieldUse:
      "1T1C 셀, refresh, 대역폭, 지연 시간, 전력 특성이 서버·모바일·그래픽·AI 제품 최적화를 가릅니다.",
    related: ["Refresh", "HBM", "DDR"]
  },
  {
    term: "Refresh",
    english: "Refresh",
    category: "메모리",
    level: "중급",
    simple:
      "DRAM 셀의 전하가 사라지기 전에 데이터를 다시 써 주는 유지 동작입니다.",
    fieldUse:
      "refresh 주기와 전력, 지연 시간, 고온 동작 안정성은 DRAM 품질과 시스템 성능에 영향을 줍니다.",
    related: ["DRAM", "1T1C", "휘발성 메모리"]
  },
  {
    term: "NAND",
    english: "NAND Flash",
    category: "메모리",
    level: "기초",
    simple:
      "전원이 꺼져도 데이터를 보관하는 저장용 메모리입니다. SSD와 스마트폰 저장공간에 쓰입니다.",
    fieldUse:
      "3D 적층, 셀당 비트 수, 내구성, 컨트롤러, 오류 정정이 저장장치 성능과 비용을 결정합니다.",
    related: ["SSD", "V-NAND", "비휘발성 메모리"]
  },
  {
    term: "HBM",
    english: "High Bandwidth Memory",
    category: "AI 메모리",
    level: "중급",
    simple:
      "DRAM을 위로 쌓아 GPU 가까이에 두고 데이터를 아주 넓은 길로 보내는 메모리입니다.",
    fieldUse:
      "AI 가속기에서 memory wall을 줄이기 위해 TSV, 인터포저, 열 방출, 수율, 고객 검증이 함께 중요해집니다.",
    related: ["TSV", "대역폭", "Memory wall"]
  },
  {
    term: "TSV",
    english: "Through-Silicon Via",
    category: "패키징",
    level: "중급",
    simple:
      "쌓아 올린 칩을 위아래로 연결하기 위해 실리콘을 관통해 만든 전기 통로입니다.",
    fieldUse:
      "HBM 적층에서 넓은 I/O와 짧은 연결을 만들지만 공정 난이도, 정렬, 수율, 열 관리 부담을 키웁니다.",
    related: ["HBM", "패키징", "인터포저"]
  },
  {
    term: "대역폭",
    english: "Bandwidth",
    category: "시스템",
    level: "기초",
    simple:
      "한 번에 얼마나 많은 데이터를 옮길 수 있는지를 뜻합니다. 도로의 차선 수에 가깝습니다.",
    fieldUse:
      "AI 학습과 추론에서는 연산기 성능만큼 메모리 대역폭이 중요하며, 병목이 전체 처리량을 제한합니다.",
    related: ["HBM", "Memory wall", "GPU"]
  },
  {
    term: "Memory wall",
    english: "Memory wall",
    category: "시스템",
    level: "심화",
    simple:
      "연산기는 빠른데 메모리에서 데이터가 늦게 와서 전체 성능이 막히는 문제입니다.",
    fieldUse:
      "AI 인프라에서는 HBM, 캐시, CXL, 저장장치 계층, 데이터 이동 최적화가 memory wall 완화 전략으로 연결됩니다.",
    related: ["HBM", "대역폭", "CXL"]
  },
  {
    term: "EUV",
    english: "Extreme Ultraviolet",
    category: "공정",
    level: "심화",
    simple:
      "더 짧은 파장의 빛으로 웨이퍼 위에 아주 미세한 회로 패턴을 그리는 노광 기술입니다.",
    fieldUse:
      "멀티 패터닝 부담을 줄이고 미세화를 돕지만 장비, 마스크, 결함, 생산성, 수율 관리 난이도가 큽니다.",
    related: ["DUV", "포토리소그래피", "수율"]
  },
  {
    term: "수율",
    english: "Yield",
    category: "제조",
    level: "심화",
    simple:
      "만든 칩 중에서 정상적으로 쓸 수 있는 칩의 비율입니다.",
    fieldUse:
      "수율은 원가, 공급량, 고객 납기, 제품 경쟁력을 좌우하며 공정 조건과 결함 관리의 핵심 지표입니다.",
    related: ["공정", "EUV", "양산"]
  }
];

export const glossaryCategories = Array.from(
  new Set(glossary.map((item) => item.category))
);
