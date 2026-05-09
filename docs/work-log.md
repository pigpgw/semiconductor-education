# 작업 로그

이 문서는 다음 작업자가 바로 이어서 개발할 수 있도록 최신 작업, 현재 부족한 점, 다음 우선순위를 기록합니다. 오래된 상세 작업 내역은 Git 커밋과 PR 기록을 기준으로 확인합니다.

## 현재 상태 요약

- 브랜치 흐름: `feature/*`, `fix/*`, `refactor/*`, `docs/*`, `style/*`, `chore/*`, `test/*` -> `dev` -> `main`
- 핵심 화면: `/`, `/level`, `/roadmap`, `/learn`, `/learn/[slug]`, `/glossary`, `/sources`, `/industry`, `/industry/[slug]`, `/practice`, `/study`
- 핵심 콘텐츠: DRAM, HBM, EUV 글 3편
- 콘텐츠 데이터: 용어 30개, 복습 질문 20개, 공식 출처 12개, RSS/API 후보 6개, source별 feed 필터 6개, 검토 대기 후보 4개, promotion 품질 메타데이터 4개, industry 초안 승격 스크립트 1개, 산업 업데이트 8개
- 로그인 정책: 로그인 없음, `/study`만 브라우저 `localStorage` 사용
- 검증 기준: `npm run validate`, `npm run check:links`, `npm run check:viewport`

## 2026-05-09: Big 10 공식 출처 기반 커리큘럼 보강

### 작업 브랜치

- `docs/big10-source-curriculum`

### 작업한 것

- `docs/big10-source-curriculum.md`를 추가해 Samsung, SK hynix, Micron, TSMC, Intel, ASML, Lam Research, Applied Materials, KLA, imec 기준의 공식 출처 맵을 정리했습니다.
- `/roadmap`의 학습 순서를 6단계에서 10단계로 확장했습니다.
- 출처 정책과 기술 뉴스 전략 문서를 Big 10 공식 자료 기준으로 보강했습니다.
- DRAM, HBM, EUV 핵심 글의 `sources`, `sourceInterpretation`, `updatedAt`을 2026-05-09 기준으로 보강했습니다.
- 콘텐츠 작성 기준에 Big 10 공식 출처 교차 확인 원칙을 추가했습니다.
- `/learn/[slug]`에 학습 인터랙션 허브를 추가해 기초/중급/고급별 질문, 완료 기준, 읽기 경로, 펀더멘탈 원칙을 먼저 선택하게 했습니다.
- `/learn/[slug]`에 기초 모드 인터랙션을 추가해 `처음 보기`, `구조 보기`, `공식 자료 읽기`로 설명을 전환할 수 있게 했습니다.
- `/learn/[slug]`에 중급 모드 인터랙션을 추가해 `비교하기`, `Trade-off`, `공식 자료 해석`으로 설명을 전환할 수 있게 했습니다.
- `/learn/[slug]`에 고급 모드 인터랙션을 추가해 `리스크 맵`, `판단 훈련`, `증거 연결`로 현업 판단을 연습할 수 있게 했습니다.
- 글 상세 시각 자료에 클릭형 확대 뷰를 추가했습니다.
- 오래된 상세 작업 로그를 삭제해 `work-log`를 최신 인계 문서 중심으로 압축했습니다.
- `docs/community-governance.md`와 새 교재 글 제안 이슈 템플릿을 추가해 여러 사람이 문서를 함께 발전시키는 운영 기준을 보강했습니다.

### 부족한 점

- NAND/SSD 본문 글은 아직 없습니다.
- 패키징 전용 글과 수율/계측 전용 글은 아직 없습니다.
- Big 10 출처 중 일부는 메타데이터 수동 확인 대상이라 RSS 자동 수집에 포함되지 않습니다.
- NVIDIA Technical Blog는 HBM 수요와 AI 시스템 맥락의 보조 출처로만 문서화했고, 공식 출처 데이터에는 아직 추가하지 않았습니다.
- 기초 모드 개념 카드는 현재 DRAM/HBM/EUV 3편에 맞춘 정적 설명입니다. 새 글을 추가하면 slug별 카드도 함께 추가해야 합니다.
- 중급 모드 비교/Trade-off 데이터도 현재 DRAM/HBM/EUV 3편에 맞춘 정적 설명입니다.
- 고급 모드 리스크/판단 데이터도 현재 DRAM/HBM/EUV 3편에 맞춘 정적 설명입니다.
- 학습 인터랙션의 원칙 문구도 현재 핵심 글 3편 기준입니다. NAND/패키징 글을 추가하면 원칙 예시를 확장해야 합니다.
- 커뮤니티 운영 기준은 문서화 단계입니다. 실제 기여가 쌓이면 라벨, 리뷰어, 콘텐츠 상태 운영 방식을 더 조정해야 합니다.

### 다음 작업 후보

1. NAND/SSD 첫 글을 추가합니다.
2. 패키징과 chiplet 글을 추가합니다.
3. 수율, metrology, inspection 글을 추가합니다.
4. `/sources`에 Big 10 학습 순서 필터나 추천 순서를 추가합니다.
5. NVIDIA, AMD, Qualcomm, Broadcom 같은 fabless/AI 시스템 출처를 별도 보조 카테고리로 분리할지 결정합니다.
6. 기초/중급/고급 모드 데이터를 MDX frontmatter나 별도 content 파일로 분리할지 결정합니다.

### 검증 결과

- `git diff --check`: 통과
- `npm run lint`: 통과
- `npm run typecheck`: 통과
- `npm run validate`: 통과
- `npm run check:links`: 통과, 공식 출처 12개와 공식 feed 6개, 산업 업데이트 8개 확인
- `npm audit --audit-level=moderate`: 통과, 취약점 0건
- `BASE_URL=http://127.0.0.1:3001 npm run check:viewport`: 통과, 14개 경로와 360/390/768/1280px 확인
