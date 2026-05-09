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
  },
  {
    term: "웨이퍼",
    english: "Wafer",
    category: "제조",
    level: "기초",
    simple:
      "반도체 칩을 만들기 전에 사용하는 얇고 둥근 실리콘 판입니다.",
    fieldUse:
      "웨이퍼 품질, 지름, 평탄도, 결함 밀도는 한 번에 만들 수 있는 칩 수와 공정 수율에 영향을 줍니다.",
    related: ["반도체", "공정", "수율"]
  },
  {
    term: "도핑",
    english: "Doping",
    category: "소자",
    level: "중급",
    simple:
      "실리콘에 아주 적은 불순물을 넣어 전기가 흐르는 성질을 조절하는 과정입니다.",
    fieldUse:
      "도핑 농도와 위치는 트랜지스터 문턱 전압, 누설 전류, 접합 특성을 바꾸기 때문에 소자 설계와 공정 제어의 핵심입니다.",
    related: ["반도체", "PN 접합", "MOSFET"]
  },
  {
    term: "PN 접합",
    english: "PN Junction",
    category: "소자",
    level: "중급",
    simple:
      "전류가 잘 흐르는 방향과 잘 막히는 방향이 생기도록 P형과 N형 반도체를 맞댄 구조입니다.",
    fieldUse:
      "다이오드, 트랜지스터, 이미지 센서, 전력 소자의 기본 구조이며 누설 전류와 항복 전압 같은 신뢰성 지표와 연결됩니다.",
    related: ["도핑", "반도체", "트랜지스터"]
  },
  {
    term: "커패시터",
    english: "Capacitor",
    category: "소자",
    level: "기초",
    simple:
      "전하를 잠깐 저장하는 부품입니다. DRAM에서는 데이터 1비트를 담는 작은 저장소 역할을 합니다.",
    fieldUse:
      "DRAM 셀 커패시터는 면적이 작아질수록 충분한 전하를 저장하기 어려워져 구조, 재료, 누설 전류 제어가 중요해집니다.",
    related: ["DRAM", "1T1C", "Refresh"]
  },
  {
    term: "1T1C",
    english: "One Transistor One Capacitor",
    category: "메모리",
    level: "중급",
    simple:
      "트랜지스터 1개와 커패시터 1개로 DRAM의 1비트를 저장하는 기본 셀 구조입니다.",
    fieldUse:
      "셀 면적, 커패시터 용량, 누설 전류, refresh 주기가 DRAM scaling과 수율을 결정하는 주요 제약이 됩니다.",
    related: ["DRAM", "커패시터", "Refresh"]
  },
  {
    term: "DDR",
    english: "Double Data Rate",
    category: "메모리",
    level: "기초",
    simple:
      "컴퓨터와 서버에서 널리 쓰는 DRAM 규격입니다. 한 클럭에서 데이터를 두 번 주고받는 방식에서 이름이 왔습니다.",
    fieldUse:
      "DDR 세대가 올라가면 전송 속도, 전압, 채널 구성, 신호 무결성 요구가 달라져 CPU와 메모리 시스템 설계에 영향을 줍니다.",
    related: ["DRAM", "대역폭", "LPDDR"]
  },
  {
    term: "LPDDR",
    english: "Low Power Double Data Rate",
    category: "메모리",
    level: "중급",
    simple:
      "스마트폰과 노트북처럼 전력 사용이 중요한 기기에 맞춘 저전력 DRAM 규격입니다.",
    fieldUse:
      "대기 전력, 동작 전압, 패키지 구조, 열 제약을 함께 최적화해야 하므로 모바일과 AI PC 메모리 전략에 중요합니다.",
    related: ["DRAM", "DDR", "전력"]
  },
  {
    term: "GDDR",
    english: "Graphics Double Data Rate",
    category: "메모리",
    level: "중급",
    simple:
      "그래픽카드처럼 많은 데이터를 빠르게 옮겨야 하는 장치에 쓰는 DRAM 계열 메모리입니다.",
    fieldUse:
      "GPU 주변에서 높은 대역폭을 제공하지만 HBM과 비교하면 패키징 방식, 전력, 면적, 비용 trade-off가 다릅니다.",
    related: ["DRAM", "HBM", "대역폭"]
  },
  {
    term: "SSD",
    english: "Solid State Drive",
    category: "메모리",
    level: "기초",
    simple:
      "NAND Flash를 이용해 전원이 꺼져도 데이터를 보관하는 저장장치입니다.",
    fieldUse:
      "NAND, 컨트롤러, DRAM cache, 오류 정정, 인터페이스가 함께 성능과 수명, 비용을 결정합니다.",
    related: ["NAND", "3D NAND", "비휘발성 메모리"]
  },
  {
    term: "3D NAND",
    english: "3D NAND Flash",
    category: "메모리",
    level: "중급",
    simple:
      "NAND 셀을 평면에만 놓지 않고 아파트처럼 위로 쌓아 용량을 키운 저장용 메모리입니다.",
    fieldUse:
      "층 수, 채널 홀 식각, 셀당 비트 수, 오류 정정, 수율이 SSD 용량과 원가 경쟁력을 좌우합니다.",
    related: ["NAND", "SSD", "식각"]
  },
  {
    term: "QLC",
    english: "Quad-Level Cell",
    category: "메모리",
    level: "중급",
    simple:
      "NAND 셀 하나에 4비트를 저장하는 방식입니다. 같은 셀 수로 더 큰 용량을 만들 수 있습니다.",
    fieldUse:
      "용량과 원가 측면에서 유리하지만 셀 상태를 더 촘촘히 구분해야 하므로 오류 정정, 캐싱, 내구성 관리가 중요해집니다.",
    related: ["NAND", "SSD", "오류 정정"]
  },
  {
    term: "SSD 컨트롤러",
    english: "SSD Controller",
    category: "메모리",
    level: "중급",
    simple:
      "SSD 안에서 NAND를 읽고 쓰고 관리하는 작은 두뇌입니다.",
    fieldUse:
      "주소 매핑, 오류 정정, wear leveling, garbage collection을 조율해 SSD 성능과 수명, 전력 특성을 좌우합니다.",
    related: ["SSD", "NAND", "오류 정정"]
  },
  {
    term: "오류 정정",
    english: "Error Correction Code",
    category: "시스템",
    level: "중급",
    simple:
      "저장하거나 읽는 과정에서 생긴 데이터 오류를 찾아 고치는 기술입니다.",
    fieldUse:
      "NAND 셀 밀도가 높아질수록 오류 가능성이 커지므로 SSD 컨트롤러의 ECC 능력은 성능, 수명, 신뢰성의 핵심입니다.",
    related: ["NAND", "SSD 컨트롤러", "QLC"]
  },
  {
    term: "내구성",
    english: "Endurance",
    category: "메모리",
    level: "심화",
    simple:
      "NAND나 SSD가 데이터를 반복해서 쓰고 지워도 안정적으로 버틸 수 있는 정도입니다.",
    fieldUse:
      "셀당 비트 수, 쓰기 패턴, wear leveling, 오류 정정, over-provisioning이 SSD 내구성과 고객 workload 적합성을 결정합니다.",
    related: ["NAND", "SSD", "오류 정정"]
  },
  {
    term: "CXL",
    english: "Compute Express Link",
    category: "시스템",
    level: "심화",
    simple:
      "CPU, 가속기, 메모리 장치가 더 유연하게 데이터를 공유하도록 돕는 고속 연결 표준입니다.",
    fieldUse:
      "데이터센터에서 메모리 확장과 풀링을 가능하게 해 HBM, DDR, 저장장치 계층과 함께 memory wall 완화 전략으로 검토됩니다.",
    related: ["Memory wall", "대역폭", "DRAM"]
  },
  {
    term: "포토리소그래피",
    english: "Photolithography",
    category: "공정",
    level: "중급",
    simple:
      "빛을 이용해 웨이퍼 위에 회로 패턴을 그리는 공정입니다.",
    fieldUse:
      "노광 파장, 렌즈 개구수, 마스크, 포토레지스트, overlay 정확도가 미세 패턴과 수율을 좌우합니다.",
    related: ["EUV", "DUV", "멀티 패터닝"]
  },
  {
    term: "DUV",
    english: "Deep Ultraviolet",
    category: "공정",
    level: "중급",
    simple:
      "EUV보다 긴 파장의 자외선을 쓰는 기존 노광 기술입니다.",
    fieldUse:
      "ArF immersion과 멀티 패터닝으로 오랫동안 미세화를 이끌었지만, 공정 단계와 overlay 부담이 커질 수 있습니다.",
    related: ["EUV", "포토리소그래피", "멀티 패터닝"]
  },
  {
    term: "멀티 패터닝",
    english: "Multi-patterning",
    category: "공정",
    level: "심화",
    simple:
      "한 번에 그리기 어려운 작은 패턴을 여러 번 나누어 그리는 방법입니다.",
    fieldUse:
      "DUV로 더 작은 패턴을 만들 수 있게 하지만 공정 수, 비용, overlay 오류, defect 가능성을 키워 EUV 도입 이유와 연결됩니다.",
    related: ["DUV", "EUV", "수율"]
  },
  {
    term: "식각",
    english: "Etching",
    category: "공정",
    level: "중급",
    simple:
      "필요 없는 재료를 깎아내 회로 패턴이나 구조를 만드는 공정입니다.",
    fieldUse:
      "선폭, 깊이, 선택비, 균일도, 손상 제어가 미세 패턴과 3D NAND, DRAM capacitor 구조의 양산성을 좌우합니다.",
    related: ["포토리소그래피", "3D NAND", "수율"]
  },
  {
    term: "증착",
    english: "Deposition",
    category: "공정",
    level: "중급",
    simple:
      "웨이퍼 위에 절연막, 금속, 반도체 재료 같은 얇은 막을 쌓는 공정입니다.",
    fieldUse:
      "CVD, PVD, ALD 같은 방식이 있으며 막 두께, 균일도, 계면 품질이 소자 성능과 신뢰성에 영향을 줍니다.",
    related: ["웨이퍼", "식각", "공정"]
  },
  {
    term: "인터포저",
    english: "Interposer",
    category: "패키징",
    level: "심화",
    simple:
      "GPU와 HBM 같은 여러 칩을 가깝게 연결하기 위해 사이에 놓는 얇은 연결 기판입니다.",
    fieldUse:
      "HBM 패키징에서 넓은 배선과 짧은 연결을 제공하지만 면적, 비용, 수율, 공급 병목과 연결됩니다.",
    related: ["HBM", "TSV", "패키징"]
  },
  {
    term: "양산",
    english: "Mass Production",
    category: "제조",
    level: "심화",
    simple:
      "기술을 한두 번 성공시키는 수준을 넘어 반복해서 많이, 안정적으로 만드는 단계입니다.",
    fieldUse:
      "양산성은 수율, 장비 가동률, 공정 변동, 고객 인증, 공급 일정과 연결되며 기술 발표를 실무 관점으로 읽을 때 핵심입니다.",
    related: ["수율", "공정", "고객 검증"]
  }
];

export const glossaryCategories = Array.from(
  new Set(glossary.map((item) => item.category))
);

function normalizeGlossaryText(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function getTermScore(term: GlossaryTerm, primaryKeywords: string[]) {
  const normalizedTerm = normalizeGlossaryText(term.term);
  const normalizedEnglish = normalizeGlossaryText(term.english);
  const normalizedRelated = term.related.map(normalizeGlossaryText);
  const normalizedHaystack = normalizeGlossaryText(
    [
      term.term,
      term.english,
      term.category,
      term.level,
      term.simple,
      term.fieldUse,
      ...term.related
    ].join(" ")
  );

  return primaryKeywords.reduce((score, keyword) => {
    if (!keyword) {
      return score;
    }

    if (keyword === normalizedTerm || keyword === normalizedEnglish) {
      return score + 100;
    }

    if (normalizedRelated.includes(keyword)) {
      return score + 55;
    }

    if (normalizedTerm.includes(keyword) || normalizedEnglish.includes(keyword)) {
      return score + 30;
    }

    if (normalizedHaystack.includes(keyword)) {
      return score + 10;
    }

    return score;
  }, 0);
}

export function getRelatedGlossaryTerms(keywords: string[], limit = 8) {
  const primaryKeywords = Array.from(
    new Set(keywords.map(normalizeGlossaryText).filter(Boolean))
  );
  const directMatches = glossary.filter(
    (term) => getTermScore(term, primaryKeywords) >= 100
  );
  const expandedKeywords = Array.from(
    new Set([
      ...primaryKeywords,
      ...directMatches.flatMap((term) => term.related.map(normalizeGlossaryText))
    ])
  );

  return glossary
    .map((term) => ({
      term,
      score: getTermScore(term, expandedKeywords)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.term.term.localeCompare(b.term.term))
    .slice(0, limit)
    .map((item) => item.term);
}
