# 작업 로그

이 문서는 다음 작업자가 바로 이어서 개발할 수 있도록 최근 작업, 검증 결과, 부족한 점, 다음 우선순위를 기록합니다.

## 2026-05-07: 공식 출처 허브 구현

### 작업 브랜치

- `feature/source-hub`

### 작업한 것

- `/sources` 공식 출처 허브 페이지를 추가했습니다.
- `lib/sources.ts`에 공식 반도체 출처 11개를 구조화했습니다.
- 출처별로 회사/기관 유형, 언어, 수집 정책, 주제 태그, 읽을 관점, 관련 교재 글, 확인일을 관리하게 했습니다.
- 헤더와 푸터에 `/sources` 진입 경로를 추가했습니다.
- 홈의 참고 자료 출처 태그가 `/sources`로 이동하게 연결했습니다.
- viewport 검증 대상에 `/sources`를 추가했습니다.
- `docs/mvp-summary.md`와 `docs/planning-improvements.md`에 `/sources` 구현 상태를 반영했습니다.

### URL 확인 메모

- 200 응답 확인: Samsung Semiconductor Tech Blog, SK hynix Newsroom, Micron Newsroom, Intel Newsroom, ASML Stories, Lam Research Newsroom, Applied Materials Newsroom, KLA Newsroom, imec Reading Room
- TSMC Technology와 TSMC Press Center는 Node fetch에서 403이지만 브라우저 접근용 공식 링크로 유지했습니다.
- imec의 기존 `/en/news` 경로는 404라 `/en/reading-room` 기준으로 조정했습니다.

### 일부러 넣지 않은 것

- 원문 본문 저장
- 이미지 다운로드와 재배포
- 비공식 루머 피드
- robots.txt 우회
- 로그인 기반 개인화
- 자동 크롤러와 스케줄러

### 부족한 점

- `/industry` 공식 업데이트 목록은 아직 구현하지 않았습니다.
- 공식 출처 링크 헬스체크가 CI에 포함되어 있지 않습니다.
- 출처별 RSS/API 주소는 아직 조사하지 않았습니다.
- TSMC처럼 자동 요청을 제한하는 사이트는 수동 큐레이션 정책만 있습니다.
- 관련 교재 글은 DRAM/HBM/EUV 3편에만 연결되어 있습니다.

### 다음 작업 후보

1. `CONTRIBUTING.md`와 글/출처 기여 템플릿을 추가합니다.
2. 용어 사전을 12개에서 30개로 확장합니다.
3. 복습 질문을 6개에서 20개로 확장합니다.
4. `/industry` 수동 큐레이션 데이터 모델을 설계합니다.
5. 공식 출처 URL 헬스체크 스크립트를 추가하되, 403이 정상인 출처를 allowlist로 관리합니다.

### 검증 기준

- `git diff --check`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run check:viewport`
