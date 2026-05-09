export const roadmap = [
  {
    step: "01",
    title: "반도체가 필요한 이유",
    description: "전기 신호가 0과 1이 되고, 시스템 성능이 칩에 묶이는 출발점입니다.",
    items: [
      "전압과 전류를 정보로 바꾸는 방식",
      "디지털 신호와 스위치",
      "CPU, GPU, 메모리, 저장장치의 역할",
      "SIA와 Samsung 자료로 큰 그림 확인"
    ]
  },
  {
    step: "02",
    title: "재료, 도핑, PN 접합",
    description: "반도체가 전기를 마음대로 조절할 수 있는 재료가 되는 과정을 봅니다.",
    items: [
      "전자와 정공",
      "n형과 p형 도핑",
      "PN 접합과 전류 제어",
      "소자와 공정으로 이어지는 최소 물리"
    ]
  },
  {
    step: "03",
    title: "트랜지스터와 로직",
    description: "MOSFET을 스위치로 이해하고 FinFET, GAA, backside power로 확장합니다.",
    items: [
      "MOSFET의 게이트 역할",
      "FinFET과 GAA가 필요한 이유",
      "Intel RibbonFET과 PowerVia 읽기",
      "imec 로드맵에서 연구 단계 구분"
    ]
  },
  {
    step: "04",
    title: "메모리 계층",
    description: "SRAM, DRAM, NAND, SSD, HBM을 역할과 trade-off로 구분합니다.",
    items: [
      "SRAM과 cache",
      "DRAM과 작업 메모리",
      "NAND와 장기 저장",
      "대역폭, 지연 시간, 용량, 비용"
    ]
  },
  {
    step: "05",
    title: "DRAM 펀더멘탈",
    description: "1T1C 셀에서 DDR, LPDDR, GDDR, HBM 제품군까지 연결합니다.",
    items: [
      "1T1C 셀과 refresh",
      "sense amplifier와 array",
      "DDR, LPDDR, GDDR의 용도",
      "Samsung, SK hynix, Micron 비교 읽기"
    ]
  },
  {
    step: "06",
    title: "NAND와 SSD",
    description: "전원이 꺼져도 남는 저장 메모리를 DRAM과 대비해 이해합니다.",
    items: [
      "charge trap과 3D NAND",
      "TLC/QLC와 endurance",
      "SSD controller와 enterprise workload",
      "AI 데이터 파이프라인의 storage 병목"
    ]
  },
  {
    step: "07",
    title: "HBM과 AI 메모리",
    description: "AI 서버에서 memory wall을 줄이는 적층 메모리와 시스템 병목을 봅니다.",
    items: [
      "HBM의 적층 구조",
      "TSV, base die, interposer",
      "Bandwidth와 capacity의 차이",
      "NVIDIA 수요 맥락과 메모리 기업 발표 비교"
    ]
  },
  {
    step: "08",
    title: "웨이퍼 공정과 EUV",
    description: "포토 공정을 시작으로 DUV/EUV, multi-patterning, 생산성을 연결합니다.",
    items: [
      "웨이퍼, mask, photoresist",
      "DUV 193nm와 EUV 13.5nm",
      "ASML 노광 원리",
      "Samsung EUV DRAM 양산 사례"
    ]
  },
  {
    step: "09",
    title: "식각, 증착, 재료, 계측",
    description: "노광 뒤 실제 구조를 만드는 공정과 수율 데이터를 이해합니다.",
    items: [
      "Lam Research etch/deposition",
      "Applied Materials 재료 공학",
      "KLA inspection/metrology",
      "Defect, process window, yield learning"
    ]
  },
  {
    step: "10",
    title: "패키징과 산업 자료 읽기",
    description: "칩 하나가 아니라 시스템 성능, 열, 전력, 공급 capacity를 함께 봅니다.",
    items: [
      "Advanced packaging",
      "TSMC 3DFabric과 Intel packaging",
      "Known good die와 열 방출",
      "공식 기술블로그를 학습 노트로 해석하기"
    ]
  }
];
