# Big 10 공식 자료 기반 반도체 펀더멘탈 설계

이 문서는 Semiconductor Education의 학습 순서를 최신 공식 기술블로그와 공식문서 기준으로 보강하기 위한 기준 문서입니다. 여기서 Big 10은 시가총액 순위가 아니라, 반도체를 기초부터 실무 관점까지 설명하기 위해 반드시 필요한 10개 공식 출처 묶음입니다.

## 설계 원칙

Semiconductor Fundamentals는 공식 자료를 단순 요약하지 않습니다. 공식 자료가 말하는 제품, 공정, 장비, 시스템 키워드를 학습자용 언어로 바꾸고, 마지막에는 다시 원문을 읽을 수 있게 만드는 문서입니다.

- 기초 학습자는 “무엇인가”와 “왜 필요한가”를 먼저 읽습니다.
- 중급 학습자는 구조, 동작 원리, 성능 지표를 비교합니다.
- 심화 학습자는 수율, 전력, 열, 패키징, 공급 capacity, 고객 검증까지 봅니다.
- 공식 자료는 문장 복제 대상이 아니라 근거, 질문, 해석의 출발점입니다.

## Big 10 공식 출처 맵

| 순서 | 공식 출처 | 학습 역할 | 먼저 뽑아야 할 개념 | 실무 관점으로 확장할 질문 |
| --- | --- | --- | --- | --- |
| 1 | [Samsung Semiconductor](https://semiconductor.samsung.com/news-events/tech-blog/) | DRAM, HBM, EUV, SSD 제품군의 기본 축 | DRAM cell, DDR/LPDDR/GDDR/HBM, EUV DRAM | 제품 소개 문장이 어떤 성능, 전력, 수율, 고객 검증 조건을 말하는가 |
| 2 | [SK hynix Newsroom](https://news.skhynix.com/) | AI memory, HBM, NAND, CXL/PIM 흐름 | volatile/non-volatile memory, HBM, NAND density | AI workload가 메모리 계층을 어떻게 바꾸는가 |
| 3 | [Micron Technology](https://www.micron.com/about/blog) | HBM4, data center memory, SSD 비교축 | bandwidth, capacity, HBM4, data center SSD | 같은 메모리 발표를 Samsung/SK와 비교할 때 어떤 지표가 다른가 |
| 4 | [TSMC Technology](https://www.tsmc.com/english/dedicatedFoundry/technology) | 파운드리, 공정 노드, 3DFabric | process node, SoIC, CoWoS, InFO | 이제 성능 경쟁이 왜 공정만이 아니라 패키징 경쟁인가 |
| 5 | [Intel Foundry](https://www.intel.com/content/www/us/en/foundry/library/fact-sheet.html) | GAA, backside power, systems foundry | RibbonFET, PowerVia, ASAT, advanced packaging | 로직 공정 변화가 메모리/패키징 병목과 어떻게 만나는가 |
| 6 | [ASML Technology](https://www.asml.com/en/technology/lithography-principles) | 노광 원리와 EUV/High-NA 이해 | wavelength, NA, Rayleigh criterion, EUV mirror | EUV는 왜 “짧은 파장”보다 throughput, defect, optics 문제가 큰가 |
| 7 | [Lam Research](https://www.lamresearch.com/products/our-processes/etch/) | 식각, 증착, 3D 구조 제조 난이도 | RIE, ALE, HAR etch, deposition | 3D NAND, GAA, HBM에서 왜 etch/deposition intensity가 늘어나는가 |
| 8 | [Applied Materials](https://www.appliedmaterials.com/us/en/blog.html) | 재료 공학, 배선, DRAM scaling | low-k, high-k metal gate, hard mask, PPACt | 미세화가 단순 치수 축소가 아니라 재료 선택 문제인 이유는 무엇인가 |
| 9 | [KLA](https://www.kla.com/newsroom) | 계측, 검사, 수율, process control | metrology, inspection, defect, yield learning | 좋은 공정 조건을 찾고 유지하려면 어떤 데이터를 봐야 하는가 |
| 10 | [imec](https://www.imec-int.com/en/reading-room) | 장기 로드맵과 연구 단계 기술 | scaling wall, memory wall, power wall, GAA, CFET | 상용 발표와 연구 로드맵을 어떻게 구분해 읽어야 하는가 |

보조 출처로는 [Semiconductor Industry Association](https://www.semiconductors.org/semiconductors-101/what-are-semiconductors/)을 기초 개념 확인에 사용합니다. AI 시스템 수요와 HBM 사용 맥락은 [NVIDIA Technical Blog](https://developer.nvidia.com/blog/)를 보조 출처로 사용하되, 메모리 제품 자체의 수치와 제조 설명은 메모리 기업과 장비 기업의 공식 자료를 우선합니다.

## 기초부터 순서대로 읽는 커리큘럼

### 01. 반도체가 필요한 이유

목표는 “반도체는 전기를 제어하는 부품”이라는 감각을 잡는 것입니다.

- 전자 흐름과 스위치
- 0과 1을 물리적으로 표현하는 방식
- 집적회로가 왜 많은 스위치의 조합인지
- 공식 출처: SIA, Samsung Semiconductor

### 02. 재료, 도핑, PN 접합

목표는 반도체가 도체와 부도체의 중간이라는 말에서 멈추지 않고, 전기적 성질을 조절할 수 있다는 점을 이해하는 것입니다.

- silicon, electron, hole
- n-type, p-type
- junction과 전류 제어
- 이후 MOSFET을 이해하기 위한 최소 물리

### 03. 트랜지스터와 로직

목표는 트랜지스터를 “전기로 여닫는 문”으로 이해하고, 로직 공정 변화가 왜 계속 필요한지 보는 것입니다.

- MOSFET
- FinFET, GAA
- Intel RibbonFET, PowerVia
- imec의 forksheet, CFET 같은 연구 단계 개념

### 04. 메모리 계층

목표는 SRAM, DRAM, NAND, SSD, HBM을 “좋고 나쁨”이 아니라 역할별 trade-off로 구분하는 것입니다.

- SRAM: 빠르지만 비싸고 면적 부담이 큼
- DRAM: 작업 메모리, refresh 필요
- NAND: 전원 없이 저장, latency와 endurance 고려
- SSD: NAND와 controller가 묶인 저장장치

### 05. DRAM 펀더멘탈

목표는 DRAM을 1T1C 셀에서 시작해 제품군까지 연결하는 것입니다.

- 1 transistor + 1 capacitor
- charge, refresh, sense amplifier
- DDR, LPDDR, GDDR, HBM
- Samsung DRAM, SK hynix memory 101, Micron data center memory 비교

### 06. NAND와 SSD

목표는 저장 메모리를 DRAM과 대비해 이해하는 것입니다.

- floating gate / charge trap 관점
- 3D NAND와 layer scaling
- TLC/QLC, endurance, controller
- enterprise SSD와 AI data pipeline

### 07. HBM과 AI 메모리

목표는 HBM을 “빠른 DRAM”이 아니라 AI 시스템의 memory wall을 줄이는 패키징 기반 메모리로 이해하는 것입니다.

- stacked DRAM die
- TSV, base die, interposer
- bandwidth vs capacity
- Micron HBM4, Samsung HBM, SK hynix HBM 발표 비교
- NVIDIA 같은 AI 시스템 자료는 HBM 수요와 사용 맥락을 확인하는 보조 자료로만 사용

### 08. 웨이퍼 공정과 EUV

목표는 포토, 식각, 증착, 계측이 한 흐름이라는 점을 이해하는 것입니다.

- wafer, photoresist, mask
- DUV 193nm vs EUV 13.5nm
- multi-patterning, single patterning
- ASML lithography, Samsung EUV DRAM 자료

### 09. 식각, 증착, 재료, 계측

목표는 EUV로 패턴을 만든 뒤 실제 구조를 완성하는 단계의 난이도를 이해하는 것입니다.

- Lam Research: etch, ALE, high aspect ratio
- Applied Materials: DRAM scaling materials, hard mask, low-k/high-k
- KLA: inspection, metrology, process control
- 수율은 “좋은 칩 비율”이 아니라 공정 조건을 찾고 유지하는 데이터 문제

### 10. 패키징과 시스템

목표는 칩 하나의 성능이 아니라 시스템 성능, 전력, 열, 연결, 제조 capacity를 함께 보는 것입니다.

- 2.5D/3D packaging
- TSMC 3DFabric, CoWoS, SoIC, InFO
- Intel EMIB/Foveros
- HBM, chiplet, known good die, thermal design

## 글 하나에 넣을 설명 계단

각 글은 아래 네 계단을 반드시 포함합니다.

| 계단 | 설명 방식 | 예시 |
| --- | --- | --- |
| 처음 보기 | 비유와 한 줄 결론 | DRAM은 책상, SSD는 책장 |
| 기초 | 구조와 동작 | DRAM은 1T1C 셀에 전하를 저장 |
| 중급 | 지표와 trade-off | refresh, bandwidth, latency, power |
| 현업 | 양산/수율/패키징/고객 검증 | HBM은 TSV, interposer, 열, 공급 capacity가 함께 맞아야 함 |

## 자료 보강 우선순위

1. 기존 DRAM/HBM/EUV 3편의 출처를 Big 10 기준으로 보강합니다.
2. NAND/SSD 첫 글을 추가해 메모리 계층을 완성합니다.
3. 공정 글을 EUV 단독에서 photo-etch-deposition-metrology 흐름으로 확장합니다.
4. 패키징 글을 추가해 HBM, chiplet, CoWoS/EMIB/Foveros를 연결합니다.
5. 산업 업데이트는 자동 게시하지 않고, 공식 출처 후보를 사람이 해설 노트로 승격합니다.

## 검증 질문

- 이 설명을 처음 보는 사람이 한 줄로 다시 말할 수 있는가?
- 공식 자료의 제품 홍보 문장을 엔지니어링 의미로 바꿨는가?
- 수치와 제품 세대는 최신 공식 링크로 확인했는가?
- 같은 주제를 메모리, 공정, 장비, 패키징, 시스템 관점으로 연결했는가?
- 깊은 설명을 넣었지만 초보자가 들어갈 첫 문이 남아 있는가?
