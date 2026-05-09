# 정보 출처 정책

반도체 기술 글은 독자가 신뢰할 수 있어야 합니다. 이 프로젝트는 공식 자료를 우선 출처로 사용합니다.

## 우선순위

1. 삼성반도체 공식 기술/제품 페이지
2. 삼성반도체 뉴스룸/테크 블로그
3. SK하이닉스 뉴스룸
4. 표준 문서, 논문, 학술 자료
5. 기타 해설 자료

## 자료 정보 레벨

`/sources`의 모든 공식 출처는 단순 링크가 아니라 학습용 메타데이터를 함께 갖습니다.

| 항목 | 의미 |
| --- | --- |
| 자료 유형 | 뉴스룸, 기술 블로그, 기술 페이지, 제품 페이지, 표준 문서, 산업 데이터, 연구 자료실 중 어디에 가까운지 표시 |
| 추천 난이도 | 기초부터 읽을 수 있는지, 중급 이후가 좋은지, 실무/심화 학습자에게 맞는지 표시 |
| 근거 유형 | 제품 발표, 표준 규격, 장비 해설, 산업 수치처럼 어떤 종류의 주장에 쓰는 자료인지 표시 |
| 확인 주기 | RSS/API, 월 1회, 분기 1회처럼 최신성 확인 방식을 표시 |
| 학습 활용 방식 | 교재 본문, 용어 사전, 산업 업데이트, 포트폴리오 설명 중 어디에 쓰는지 표시 |

## 작성 규칙

- 핵심 주장은 공식 출처를 연결합니다.
- 공개 자료의 표현을 그대로 복사하지 않습니다.
- 제품 세대, 수치, 날짜는 출처 페이지에서 확인합니다.
- 추측은 사실처럼 쓰지 않습니다.
- 회사별 기술 홍보 문구는 학습자 관점으로 다시 해석합니다.
- 최신성이 중요한 내용은 글의 `updatedAt`을 갱신하고 본문 하단에 확인 근거를 남깁니다.
- 출처는 “링크 모음”이 아니라 어떤 설명을 뒷받침하는지 알 수 있게 사용합니다.

## 공식 자료 해석 방식

공식 자료는 신뢰도가 높지만, 학습자가 바로 이해하기 어려운 표현이 많습니다. 따라서 다음 순서로 재작성합니다.

1. 공식 자료의 핵심 주장 확인
2. 그 주장이 성능, 전력, 수율, 패키징, 고객 검증 중 어디에 연결되는지 분류
3. 초보자가 이해할 수 있는 말로 바꾸기
4. 중급/심화 독자를 위해 트레이드오프와 제약 조건 추가
5. 글 하단에 공식 출처 링크 명시

## MVP 공식 출처

- 삼성반도체 DRAM: https://semiconductor.samsung.com/kr/dram/
- 삼성반도체 HBM: https://semiconductor.samsung.com/kr/dram/hbm/
- 삼성반도체 EUV: https://semiconductor.samsung.com/kr/technologies/euv/
- 삼성반도체 3D V-NAND Dictionary: https://semiconductor.samsung.com/support/tools-resources/dictionary/semiconductor-glossary-3d-v-nand-flash-memory/
- SK하이닉스 뉴스룸: https://news.skhynix.co.kr/
- KIOXIA BiCS FLASH: https://americas.kioxia.com/en-us/business/memory/bics.html
- JEDEC Standards: https://www.jedec.org/
- NVM Express Specifications: https://nvmexpress.org/specifications/
- SIA Semiconductor Industry Fact Sheet: https://www.semiconductors.org/resources/semiconductor-industry-fact-sheet/
