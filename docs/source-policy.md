# 정보 출처 정책

반도체 기술 글은 독자가 신뢰할 수 있어야 합니다. 이 프로젝트는 공식 자료를 우선 출처로 사용합니다.

## 우선순위

1. Samsung Semiconductor, SK hynix, Micron 같은 메모리 기업 공식 기술/제품 페이지
2. TSMC, Intel Foundry 같은 파운드리/로직 공식 기술 문서
3. ASML, Lam Research, Applied Materials, KLA 같은 장비/재료/계측 기업 공식 기술 문서
4. imec, SIA, 표준 문서, 논문, 학술 자료
5. NVIDIA Technical Blog 같은 시스템/수요 측 보조 공식 자료
6. 기타 해설 자료

## 작성 규칙

- 핵심 주장은 공식 출처를 연결합니다.
- 공개 자료의 표현을 그대로 복사하지 않습니다.
- 제품 세대, 수치, 날짜는 출처 페이지에서 확인합니다.
- 추측은 사실처럼 쓰지 않습니다.
- 회사별 기술 홍보 문구는 학습자 관점으로 다시 해석합니다.
- 최신성이 중요한 내용은 글의 `updatedAt`을 갱신하고 본문 하단에 확인 근거를 남깁니다.
- 출처는 “링크 모음”이 아니라 어떤 설명을 뒷받침하는지 알 수 있게 사용합니다.
- 같은 주장을 최소 두 관점으로 확인합니다. 예를 들어 HBM은 메모리 기업 자료로 구조를 확인하고, TSMC/Intel 자료로 패키징 맥락을 보강합니다.

## 공식 자료 해석 방식

공식 자료는 신뢰도가 높지만, 학습자가 바로 이해하기 어려운 표현이 많습니다. 따라서 다음 순서로 재작성합니다.

1. 공식 자료의 핵심 주장 확인
2. 그 주장이 성능, 전력, 수율, 패키징, 고객 검증 중 어디에 연결되는지 분류
3. 초보자가 이해할 수 있는 말로 바꾸기
4. 중급/심화 독자를 위해 트레이드오프와 제약 조건 추가
5. 글 하단에 공식 출처 링크 명시

## MVP 공식 출처

- Big 10 공식 출처 맵: [docs/big10-source-curriculum.md](big10-source-curriculum.md)
- 삼성반도체 DRAM: https://semiconductor.samsung.com/kr/dram/
- 삼성반도체 HBM: https://semiconductor.samsung.com/kr/dram/hbm/
- 삼성반도체 EUV: https://semiconductor.samsung.com/kr/technologies/euv/
- SK하이닉스 뉴스룸: https://news.skhynix.co.kr/
- Micron Blog: https://www.micron.com/about/blog
- TSMC Technology: https://www.tsmc.com/english/dedicatedFoundry/technology
- Intel Foundry: https://www.intel.com/content/www/us/en/foundry/library/fact-sheet.html
- ASML Technology: https://www.asml.com/en/technology/lithography-principles
- Lam Research Etch: https://www.lamresearch.com/products/our-processes/etch/
- Applied Materials Blog: https://www.appliedmaterials.com/us/en/blog.html
- KLA Newsroom: https://www.kla.com/newsroom
- imec Reading Room: https://www.imec-int.com/en/reading-room
