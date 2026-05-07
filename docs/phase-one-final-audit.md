# 프로젝트 총점검

이 문서는 1차 MVP 기준으로 코드, 문서, 설정을 다시 점검한 결과입니다. 목적은 불필요한 항목을 줄이고, 다음 작업자가 바로 이어서 개발할 수 있게 현재 상태와 다음 작업을 분리하는 것입니다.

## 점검 범위

- Next.js App Router 화면 11개
- 공통 컴포넌트와 MDX 렌더링 컴포넌트
- DRAM, HBM, EUV 핵심 글 3편
- 용어, 복습 질문, 공식 출처, 산업 업데이트 데이터
- GitHub Actions, Vercel workflow, 검증 스크립트
- README와 `docs/` 문서 구조
- 로컬 생성 파일과 `.gitignore`

## 정리한 항목

| 항목 | 처리 | 이유 |
| --- | --- | --- |
| `docs/work-log.md` 과거 상세 로그 | 최신 상태 중심으로 압축 | 이전 작업의 “아직 구현 안 됨” 문장이 현재 구현 상태와 충돌함 |
| `next-env.d.ts` | 로컬 삭제 | Next.js가 생성하는 파일이며 `.gitignore` 대상 |
| `tsconfig.tsbuildinfo` | 로컬 삭제 | TypeScript 증분 빌드 생성 파일이며 `.gitignore` 대상 |
| CI 검증 명령 | `npm run validate`로 통합 | lint, typecheck, 콘텐츠 구조 검증, build를 한 명령으로 확인하기 위함 |
| 외부 링크 점검 | `npm run check:links`로 분리 | 공식 사이트 일시 차단이 PR 필수 검증을 막지 않게 하기 위함 |
| `postcss` audit advisory | `overrides`로 8.5.x 고정 | `npm audit fix --force`가 Next를 9.x로 낮추는 breaking change라 직접 적용하지 않음 |

## 유지한 항목

| 항목 | 유지 이유 |
| --- | --- |
| `docs/final-design.md` | 1차 MVP 판단 기준 |
| `docs/mvp-summary.md` | 현재 구현 범위와 콘텐츠 수량 |
| `docs/planning-improvements.md` | 다음 작업 우선순위 |
| `docs/tech-news-source-strategy.md` | 공식 기술블로그 링크 허브와 RSS/API 전략 |
| `docs/open-source-document-strategy.md` | 오픈소스 문서 운영 원칙 |
| `docs/templates/` | 작은 단위 기여를 위한 작성 템플릿 |
| Vercel workflow | 기본 비활성 상태지만 배포 파이프라인 기준으로 필요 |
| `/study` 로컬 학습 기능 | 로그인 없이 학습 흐름을 이어가는 MVP 보조 장치 |

## 코드 점검 결과

- 추적 중인 불필요한 생성 파일은 없습니다.
- 공통 컴포넌트와 `lib/` 모듈은 현재 라우트나 검증 스크립트에서 사용 중입니다.
- `node_modules`, `.next`, `*.tsbuildinfo`, `next-env.d.ts`는 `.gitignore`로 제외됩니다.
- 핵심 화면은 `scripts/check-viewports.mjs`에서 360, 390, 768, 1280px 폭으로 확인합니다.
- 공식 출처와 산업 업데이트 URL은 네트워크 영향이 있으므로 로컬 감사 명령인 `npm run check:links`로 분리합니다.
- `npm audit --audit-level=moderate`는 0건입니다.

## 문서 점검 결과

- `docs/README.md`는 문서 인덱스 역할을 유지합니다.
- `docs/work-log.md`는 전체 히스토리 보관소가 아니라 최신 상태와 다음 작업 인계 문서로 사용합니다.
- 과거 상세 작업 내역은 Git 커밋과 PR 기록으로 추적합니다.
- 현재 구현 상태는 `docs/mvp-summary.md`, 다음 보완 우선순위는 `docs/planning-improvements.md`에 둡니다.
- 출처와 뉴스 수집 전략은 `docs/source-policy.md`와 `docs/tech-news-source-strategy.md`로 분리해 유지합니다.

## 완료 기준

1차 MVP는 다음을 만족하면 마감 상태로 봅니다.

- 핵심 페이지 11개가 유지된다.
- 핵심 글 3편이 스펙 읽기와 실무 판단 기준을 포함한다.
- 레벨 진단, 용어 사전, 복습 질문, 산업 해설 노트, 로컬 학습 노트가 동작한다.
- README와 docs에서 제품 방향, MVP 범위, 출처 정책, 보완 계획을 확인할 수 있다.
- `npm run validate`, `npm run check:links`, `npm run check:viewport`가 통과한다.

## 다음 작업

### P1

- 공식 RSS/API 후보 조사와 `feedUrl` 필드 추가 여부 결정
- 복습 질문 주제/레벨 필터 UX
- 학습 노트 내보내기

### P2

- NAND/SSD 첫 글 추가
- 패키징, TSV, MR-MUF 심화 글 추가
- 직무별 읽기 경로 추가
