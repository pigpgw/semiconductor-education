# 작업 로그

이 문서는 다음 작업자가 바로 이어서 개발할 수 있도록 최신 작업, 현재 부족한 점, 다음 우선순위를 기록합니다. 오래된 상세 작업 내역은 Git 커밋과 PR 기록을 기준으로 확인합니다.

## 현재 상태 요약

- 브랜치 흐름: `feature/*`, `fix/*`, `refactor/*`, `docs/*`, `style/*`, `chore/*`, `test/*` -> `dev` -> `main`
- 핵심 화면: `/`, `/level`, `/roadmap`, `/learn`, `/learn/[slug]`, `/glossary`, `/sources`, `/industry`, `/industry/[slug]`, `/practice`, `/study`
- 핵심 콘텐츠: DRAM, HBM, EUV 글 3편
- 콘텐츠 데이터: 용어 30개, 복습 질문 20개, 공식 출처 12개, RSS/API 후보 6개, 검토 대기 후보 4개, 산업 업데이트 8개
- 로그인 정책: 로그인 없음, `/study`만 브라우저 `localStorage` 사용
- 검증 기준: `npm run validate`, `npm run check:links`, `npm run check:viewport`

## 2026-05-07: feed 검토 대기열 데이터 구조

### 작업 브랜치

- `feature/feed-review-queue`

### 작업한 것

- `lib/feed-review.ts`에 `review-needed`, `approved`, `dismissed` 상태와 우선순위 타입을 추가했습니다.
- 공식 feed 수집 결과 중 사람이 볼 후보 4개를 `feedReviewQueue`로 분리했습니다.
- 각 후보에 검토 이유, 검토 질문, 추천 관련 교재를 넣었습니다.
- `/industry` 상단 통계에 검토 대기 후보 수를 표시했습니다.
- `scripts/check-feed-review.mjs`로 sourceId, URL, 날짜, 상태, 우선순위, 관련 교재, 중복 여부를 검증하게 했습니다.
- `npm run check:content`에 `check:feed-review`를 포함했습니다.
- README, MVP 요약, 설계 보완, 보완 기획, 뉴스 소스 전략, 총점검 문서를 최신 상태로 맞췄습니다.

### 부족한 점

- source별 include/exclude 키워드 필터는 아직 없습니다.
- 검토 대기 후보를 `/industry` 해설 노트 초안으로 승격하는 스크립트는 아직 없습니다.
- 검토 후보를 직접 탐색하는 별도 UI는 아직 없습니다. 현재는 `/industry` 통계만 표시합니다.
- 학습 노트 내보내기는 아직 없습니다.

### 다음 작업 후보

1. source별 포함/제외 키워드 필터를 추가합니다.
2. 선별된 feed 항목을 `/industry` 해설 노트 초안으로 승격하는 스크립트를 추가합니다.
3. 검토 대기 후보를 탐색하는 내부용 페이지나 문서 뷰를 추가합니다.
4. 학습 노트 내보내기를 추가합니다.
5. NAND/SSD 첫 글을 추가합니다.

### 검증 결과

- `git diff --check`: 통과
- `npm run check:feed-review`: 통과, 검토 대기 후보 4개 확인
- `npm run validate`: 통과
- `npm run check:links`: 통과, 공식 출처 12개와 공식 feed 6개, 산업 업데이트 8개 확인
- `npm run collect:feeds -- --limit=2`: 통과, 공식 feed 6개에서 `review-needed` 후보 11개 출력
- `npm audit --audit-level=moderate`: 통과, 취약점 0건
- `BASE_URL=http://127.0.0.1:3001 npm run check:viewport`: 통과, 14개 경로와 360/390/768/1280px 확인

## 2026-05-07: 공식 feed 메타데이터 수집기

### 작업 브랜치

- `feature/feed-metadata-collector`

### 작업한 것

- `scripts/collect-source-feeds.mjs`를 추가했습니다.
- `npm run collect:feeds -- --limit=5`로 공식 RSS feed에서 제목, URL, 발행일, 수집일, 주제, 짧은 description을 JSON으로 출력합니다.
- 출력 항목에는 기본 상태 `review-needed`를 넣어 자동 게시가 아니라 사람 검토 대기열로 이어지게 했습니다.
- 원문 본문 저장, 이미지 저장, 파일 쓰기, 자동 게시를 하지 않도록 범위를 제한했습니다.
- Samsung Global Newsroom feed를 반도체 카테고리 feed로 바꾸고, Lam Research feed를 실제 press release RSS로 바로잡았습니다.
- `README.md`, `docs/mvp-summary.md`, `docs/tech-news-source-strategy.md`, `docs/design-supplement.md`, `docs/planning-improvements.md`, `docs/phase-one-final-audit.md`를 최신 기준으로 정리했습니다.

### 부족한 점

- 수집 결과를 저장하는 `review-needed` 대기열 파일이나 UI는 아직 없습니다.
- 수집 항목 중 반도체 학습과 무관한 회사 공지/투자자 발표를 걸러내는 키워드 필터는 아직 없습니다.
- 선별된 feed 항목을 `/industry` 해설 노트로 승격하는 도구는 아직 없습니다.
- 학습 노트 내보내기는 아직 없습니다.

### 다음 작업 후보

1. 수집 결과를 저장하는 `review-needed` 대기열 데이터 구조를 추가합니다.
2. source별 포함/제외 키워드 필터를 추가합니다.
3. 선별된 feed 항목을 `/industry` 해설 노트 초안으로 승격하는 스크립트를 추가합니다.
4. 학습 노트 내보내기를 추가합니다.
5. NAND/SSD 첫 글을 추가합니다.

### 검증 결과

- `git diff --check`: 통과
- `npm run validate`: 통과
- `npm run check:links`: 통과, 공식 출처 12개와 공식 feed 6개, 산업 업데이트 8개 확인
- `npm run collect:feeds -- --limit=2`: 통과, 공식 feed 6개에서 `review-needed` 후보 11개 출력
- `npm audit --audit-level=moderate`: 통과, 취약점 0건
- `BASE_URL=http://127.0.0.1:3001 npm run check:viewport`: 통과, 14개 경로와 360/390/768/1280px 확인

## 2026-05-07: 공식 출처 feedUrl 메타데이터

### 작업 브랜치

- `feature/source-feed-metadata`

### 작업한 것

- `OfficialSource`에 선택 필드 `feedUrl`을 추가했습니다.
- Samsung Global Newsroom의 반도체 카테고리를 공식 출처로 추가했습니다.
- Samsung Global Newsroom, SK hynix, Micron, Intel, Lam Research, Applied Materials의 공식 RSS/API 후보 6개를 `feedUrl`로 정리했습니다.
- `/sources` 상단 통계에 RSS/API 후보 수를 표시하고, feed가 있는 출처 카드에는 `RSS 피드` 외부 링크를 추가했습니다.
- `scripts/check-sources.mjs`가 `crawlPolicy: "rss"`와 `feedUrl`의 일관성, feed URL 응답, RSS/Atom 형태를 함께 검증하도록 보강했습니다.
- `README.md`, `docs/mvp-summary.md`, `docs/tech-news-source-strategy.md`, `docs/design-supplement.md`, `docs/planning-improvements.md`, `docs/phase-one-final-audit.md`, `docs/templates/source-addition-template.md`를 최신 기준으로 정리했습니다.

### 부족한 점

- 공식 feed에서 title, url, publishedAt만 가져오는 메타데이터 수집기는 아직 없습니다.
- 자동 수집된 항목을 `검토 필요`와 `교재 반영 완료`로 나누는 리뷰 대기열은 아직 없습니다.
- ASML, TSMC, KLA, imec은 아직 수동 또는 메타데이터 확인 대상으로 유지합니다.
- 학습 노트 내보내기는 아직 없습니다.

### 다음 작업 후보

1. 공식 feed 메타데이터 수집기 초안을 추가합니다.
2. feed 수집 결과를 사람이 검토하는 `review-needed` 상태 데이터로 분리합니다.
3. 학습 노트 내보내기를 추가합니다.
4. NAND/SSD 첫 글을 추가합니다.
5. 패키징, TSV, MR-MUF 심화 글을 추가합니다.

### 검증 결과

- `git diff --check`: 통과
- `npm run validate`: 통과
- `npm run check:links`: 통과, 공식 출처 12개와 공식 feed 6개, 산업 업데이트 8개 확인
- `npm audit --audit-level=moderate`: 통과, 취약점 0건
- `BASE_URL=http://127.0.0.1:3001 npm run check:viewport`: 통과, 14개 경로와 360/390/768/1280px 확인

## 2026-05-07: 복습 질문 주제/레벨 필터 UX

### 작업 브랜치

- `feature/practice-filters`

### 작업한 것

- `lib/practice.ts`의 모든 복습 질문에 `topic` 필드를 추가했습니다.
- `/practice`에서 난이도와 주제별로 질문을 필터링할 수 있게 했습니다.
- 필터 결과 개수, 빈 상태, 필터 초기화를 추가했습니다.
- 질문 카드에 주제 배지를 표시해 어떤 개념을 점검하는 문제인지 바로 보이게 했습니다.
- `scripts/check-practice.mjs`가 `topic` 누락 여부와 주제별 문항 수를 함께 검증하도록 보강했습니다.
- `docs/planning-improvements.md`, `docs/design-supplement.md`, `docs/phase-one-final-audit.md`, `docs/mvp-summary.md`의 다음 작업 기준을 최신화했습니다.

### 부족한 점

- 공식 RSS/API 후보는 아직 출처별 `feedUrl` 필드로 정리되지 않았습니다.
- NAND/SSD 첫 글과 패키징/TSV/MR-MUF 심화 글은 아직 없습니다.
- 학습 노트 내보내기는 아직 없습니다.
- 레벨 진단 결과가 글 목록/복습 필터와 직접 연동되지는 않습니다.

### 다음 작업 후보

1. 공식 RSS/API 후보를 출처별로 조사하고 `feedUrl` 필드 추가 여부를 결정합니다.
2. NAND/SSD 첫 글을 추가합니다.
3. 패키징, TSV, MR-MUF 심화 글을 추가합니다.
4. 학습 노트 내보내기를 추가합니다.
5. 레벨 진단 결과를 글 목록/복습 필터와 연결합니다.

### 검증 결과

- `git diff --check`: 통과
- `npm run validate`: 통과
- `npm run check:links`: 통과, 공식 출처 11개와 산업 업데이트 8개 확인
- `npm audit --audit-level=moderate`: 통과, 취약점 0건
- `BASE_URL=http://127.0.0.1:3001 npm run check:viewport`: 통과, 14개 경로와 360/390/768/1280px 확인

## 2026-05-07: 글 상세 관련 용어 탐색 UX

### 작업 브랜치

- `feature/lesson-term-navigation`

### 작업한 것

- `lib/glossary.ts`에 글의 핵심 용어, 현업 키워드, 태그를 기준으로 관련 용어를 점수화하는 `getRelatedGlossaryTerms`를 추가했습니다.
- `/learn/[slug]` 글 상세에 `본문 관련 용어` 섹션을 추가했습니다.
- 각 관련 용어는 난이도, 카테고리, 영어 원어, 쉬운 설명, 실무 맥락, 관련어를 함께 보여 줍니다.
- 용어 제목은 `/glossary#용어명`으로 연결해 전체 용어 사전에서 더 자세히 확인할 수 있게 했습니다.
- `docs/planning-improvements.md`, `docs/design-supplement.md`, `docs/phase-one-final-audit.md`, `docs/mvp-summary.md`의 다음 작업 기준을 최신화했습니다.

### 부족한 점

- 공식 RSS/API 후보는 아직 출처별 `feedUrl` 필드로 정리되지 않았습니다.
- NAND/SSD 첫 글과 패키징/TSV/MR-MUF 심화 글은 아직 없습니다.
- 학습 노트 내보내기는 아직 없습니다.

### 다음 작업 후보

1. 공식 RSS/API 후보를 출처별로 조사하고 `feedUrl` 필드 추가 여부를 결정합니다.
2. NAND/SSD 첫 글을 추가합니다.
3. 패키징, TSV, MR-MUF 심화 글을 추가합니다.
4. 학습 노트 내보내기를 추가합니다.

### 검증 결과

- `git diff --check`: 통과
- `npm run validate`: 통과
- `npm run check:links`: 통과, 공식 출처 11개와 산업 업데이트 8개 확인
- `npm audit --audit-level=moderate`: 통과, 취약점 0건
- `BASE_URL=http://127.0.0.1:3001 npm run check:viewport`: 통과, 14개 경로와 360/390/768/1280px 확인

## 2026-05-07: 핵심 글 구조 도식 보강

### 작업 브랜치

- `feature/lesson-visual-detail`

### 작업한 것

- `components/technical-visual.tsx`의 DRAM/HBM/EUV 도식을 라벨형 구조 다이어그램으로 재작성했습니다.
- DRAM 도식은 1T1C, word line, bit line, refresh, I/O width의 trade-off를 함께 보여 주도록 보강했습니다.
- HBM 도식은 DRAM die, TSV, base die, interposer/package와 bandwidth, thermal, yield 판단 기준을 연결했습니다.
- EUV 도식은 DUV multi-patterning과 EUV selected layers를 비교하고 overlay, defect, throughput 부담을 함께 보여 주도록 바꿨습니다.
- 글 목록 카드에서 쓰는 mini visual은 유지하면서, 글 상세에서는 더 많은 라벨과 판단 기준을 보여 주도록 `mini`와 `detail` 모드를 분리했습니다.
- `docs/planning-improvements.md`, `docs/design-supplement.md`, `docs/phase-one-final-audit.md`, `docs/mvp-summary.md`의 다음 작업 기준을 최신화했습니다.

### 부족한 점

- 공식 RSS/API 후보는 아직 출처별 `feedUrl` 필드로 정리되지 않았습니다.
- NAND/SSD 첫 글과 패키징/TSV/MR-MUF 심화 글은 아직 없습니다.

### 다음 작업 후보

1. 공식 RSS/API 후보를 출처별로 조사하고 `feedUrl` 필드 추가 여부를 결정합니다.
2. NAND/SSD 첫 글을 추가합니다.
3. 패키징, TSV, MR-MUF 심화 글을 추가합니다.

### 검증 결과

- `git diff --check`: 통과
- `npm run validate`: 통과
- `npm run check:links`: 통과, 공식 출처 11개와 산업 업데이트 8개 확인
- `npm audit --audit-level=moderate`: 통과, 취약점 0건
- `BASE_URL=http://127.0.0.1:3001 npm run check:viewport`: 통과, 14개 경로와 360/390/768/1280px 확인

## 2026-05-07: 글 상세 90초 요약 카드 고도화

### 작업 브랜치

- `feature/lesson-summary-card`

### 작업한 것

- 핵심 글 3편의 `quickSummary`에 쉬운 비유와 난이도별 예상 소요 시간을 추가했습니다.
- `/learn/[slug]` 상단 90초 요약 카드에 비유, 예상 소요 시간, 레벨별 읽기 목표를 통합했습니다.
- 기존에 별도 섹션으로 반복되던 레벨별 읽기 안내를 제거해 글 상세 첫 화면의 중복을 줄였습니다.
- `lib/content.ts`와 `scripts/check-lessons.mjs`가 새 요약 필드를 필수 frontmatter로 검증하도록 보강했습니다.
- `docs/planning-improvements.md`에서 요약 카드 고도화 상태를 최신 구현 기준으로 정리했습니다.

### 부족한 점

- 공식 RSS/API 후보는 아직 출처별 `feedUrl` 필드로 정리되지 않았습니다.

### 다음 작업 후보

1. 공식 RSS/API 후보를 출처별로 조사하고 `feedUrl` 필드 추가 여부를 결정합니다.
2. NAND/SSD 첫 글을 추가합니다.

### 검증 결과

- `git diff --check`: 통과
- `npm run check:lessons`: 통과
- `npm run validate`: 통과
- `npm run check:links`: 통과, 공식 출처 11개와 산업 업데이트 8개 확인
- `npm audit --audit-level=moderate`: 통과, 취약점 0건
- `BASE_URL=http://127.0.0.1:3001 npm run check:viewport`: 통과, 14개 경로와 360/390/768/1280px 확인

## 2026-05-07: 프로젝트 총점검과 로그 정리

### 작업 브랜치

- `chore/project-audit-cleanup`

### 작업한 것

- `npm run validate`가 lint, typecheck, 콘텐츠 구조 검증, build를 한 번에 실행하도록 정리했습니다.
- `npm run check:content`를 추가해 교재, 용어, 복습 질문 검증을 묶었습니다.
- `npm run check:links`를 추가해 공식 출처와 산업 업데이트 URL 점검을 명시적 감사 명령으로 분리했습니다.
- CI의 앱 검증 단계를 `npm run validate`로 통합했습니다.
- `postcss` audit advisory를 해결하기 위해 `postcss`를 8.5.x로 고정하고 Next 하위 중복 의존성을 dedupe했습니다.
- `docs/phase-one-final-audit.md`를 최신 총점검 문서로 다시 정리했습니다.
- 오래된 작업 로그에 남아 있던 “아직 구현 안 됨” 중복 기록을 제거하고, `docs/work-log.md`를 최신 인계 문서로 압축했습니다.
- 로컬 생성 파일 `next-env.d.ts`, `tsconfig.tsbuildinfo`를 삭제했습니다. 둘 다 `.gitignore` 대상이라 커밋에는 포함되지 않습니다.

### 일부러 삭제하지 않은 것

- `docs/final-design.md`: 1차 MVP 판단 기준
- `docs/mvp-summary.md`: 현재 구현 범위와 콘텐츠 수량
- `docs/planning-improvements.md`: 다음 작업 우선순위
- `docs/tech-news-source-strategy.md`: 공식 링크 허브와 RSS/API 전략
- `docs/templates/`: 오픈소스 기여 단위 유지
- Vercel workflow: 기본 비활성 상태지만 배포 파이프라인 기준으로 필요

### 부족한 점

- 공식 RSS/API 후보는 아직 출처별 필드로 정리되지 않았습니다.
- 복습 질문은 20개지만 주제/레벨 필터 UX는 아직 없습니다.

### 다음 작업 후보

1. 공식 RSS/API 후보를 출처별로 조사하고 `feedUrl` 필드 추가 여부를 결정합니다.
2. 복습 질문 주제/레벨 필터 UX를 추가합니다.
3. NAND/SSD 첫 글을 추가합니다.

### 검증 기준

- `npm run validate`
- `npm run check:links`
- `npm audit --audit-level=moderate`
- `BASE_URL=http://127.0.0.1:3001 npm run check:viewport`

### 검증 결과

- `git diff --check`: 통과
- `npm run validate`: 통과
- `npm run check:links`: 통과, 공식 출처 11개와 산업 업데이트 8개 확인
- `npm audit --audit-level=moderate`: 통과, 취약점 0건
- `BASE_URL=http://127.0.0.1:3001 npm run check:viewport`: 통과, 14개 경로와 360/390/768/1280px 확인

## 2026-05-07: 핵심 글 3편 1차 리라이트

### 작업 브랜치

- `feature/core-lesson-rewrite`

### 작업한 것

- DRAM 글에 스펙을 읽는 순서와 면적·전력·대역폭 trade-off를 추가했습니다.
- HBM 글에 적층 수, 대역폭, 전력 효율, 패키징, 고객 검증을 읽는 순서와 HBM의 한계를 추가했습니다.
- EUV 글에 적용 레이어, overlay, 결함, 장비 처리량, 수율을 기준으로 발표를 읽는 방법과 EUV가 모든 문제의 답은 아닌 이유를 추가했습니다.
- 각 글의 `quickSummary`, `readingGuide`, `sourceInterpretation`을 새 본문 깊이에 맞게 조정했습니다.
- `npm run check:lessons`가 최소 7개 `h2` 섹션과 핵심 MDX 블록을 검증하도록 보강했습니다.

### 남은 점

- 문장 밀도는 더 낮출 수 있습니다.

## 2026-05-07: 산업 업데이트 상세 해설 노트 구현

### 작업 브랜치

- `feature/industry-detail-notes`

### 작업한 것

- `/industry/[slug]` 상세 페이지를 추가해 공식 발표 하나를 읽을 질문, 중요도, 용어, 관련 교재, 출처 정책으로 분리했습니다.
- `/industry` 목록의 제목과 `해설 노트 보기` 버튼을 상세 페이지로 연결했습니다.
- `npm run check:industry`가 상세 페이지에 필요한 필수 필드까지 검증하도록 보강했습니다.
- viewport 검증 대상에 산업 상세 대표 경로 2개를 추가했습니다.

### 남은 점

- 상세 노트는 현재 `lib/industry.ts`의 수동 데이터에서 생성됩니다.
- 항목별 긴 해설 본문이나 RSS/API 수집은 아직 없습니다.

## 2026-05-07: 용어 사전 검색/필터 UX 보강

### 작업 브랜치

- `feature/glossary-search`

### 작업한 것

- `/glossary`에 검색 입력, 카테고리 필터, 난이도 필터를 추가했습니다.
- 검색 대상은 한국어 용어, 영어 원어, 카테고리, 난이도, 쉬운 설명, 실무 맥락, 관련어입니다.
- 결과 수와 카테고리별 결과 수, 빈 상태, 관련어 재검색을 추가했습니다.

### 남은 점

- 검색어와 필터 상태를 URL로 공유하는 기능은 아직 없습니다.
- 용어별 상세 페이지는 아직 없고 카드 안에서 설명합니다.
