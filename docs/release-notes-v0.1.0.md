# v0.1.0 Release Notes

Semiconductor Education v0.1.0은 “로그인 없이 바로 읽는 반도체 오픈소스 문서”의 첫 공개 버전입니다.

## 핵심 가치

- 반도체를 처음 배우는 사람도 시작할 수 있게 설명합니다.
- DRAM, HBM, EUV를 단순 암기가 아니라 구조, 병목, trade-off로 연결합니다.
- Samsung, SK hynix, Micron, TSMC, Intel, ASML, Lam Research, Applied Materials, KLA, imec 같은 공식 출처를 기준으로 학습 자료를 구성합니다.
- 로그인 없이 읽기, 진단, 복습, 로컬 학습 노트를 제공합니다.

## 포함된 화면

- `/`: 프로젝트 소개와 학습 진입
- `/level`: 8개 질문 기반 레벨 진단
- `/roadmap`: 10단계 학습 로드맵
- `/learn`: 교재 목록과 난이도/주제 필터
- `/learn/[slug]`: MDX 교재 본문, 학습 인터랙션, 출처, 복습 연결
- `/glossary`: 용어 사전 검색과 필터
- `/sources`: 공식 기술블로그와 뉴스룸 링크 허브
- `/industry`: 공식 기술 발표 수동 큐레이션
- `/practice`: 레벨별 복습 질문과 실무 시나리오
- `/study`: 브라우저 localStorage 기반 체크리스트와 노트

## 첫 공개 교재

- DRAM은 왜 빠른 작업 메모리인가
- HBM은 왜 AI 시대의 핵심 메모리인가
- EUV는 왜 DRAM 미세화에 중요한가

## 학습 UX

- 기초, 중급, 심화 레벨 진단
- 글별 90초 요약
- 기초 모드: 처음 보기, 구조 보기, 공식 자료 읽기
- 중급 모드: 비교하기, trade-off, 공식 자료 해석
- 고급 모드: 리스크 맵, 판단 훈련, 증거 연결
- 클릭형 기술 도식 확대
- 관련 용어와 복습 질문 연결

## 운영 기준

- GitHub Issue와 PR로 함께 발전시키는 공개 문서
- 새 글 상태 흐름: `proposal -> draft -> source-check -> review -> ready`
- 공식 출처 우선, 원문 복사 금지
- 개인정보 수집과 로그인 기능 없음
- `feature/* -> dev -> main` 브랜치 흐름

## 검증

공개 전 아래 명령을 통과해야 합니다.

```bash
npm run validate
npm run check:links
npm run check:viewport
```

## 다음 버전 후보

- NAND/SSD 첫 교재 글
- DDR, LPDDR, GDDR, HBM 비교 글
- 패키징, TSV, MR-MUF 심화 글
- 수율, 계측, 검사 입문 글
- 학습 노트 내보내기
- `/sources` Big 10 학습 순서 필터
