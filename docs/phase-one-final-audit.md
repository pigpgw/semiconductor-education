# 1차 최종 점검

이 문서는 1차 MVP 마감 전에 코드, 문서, 설정을 점검한 결과를 기록합니다. 목적은 불필요한 항목을 제거하고, 남은 작업을 다음 단계로 명확히 넘기는 것입니다.

## 점검 범위

- Next.js App Router 페이지
- 공통 컴포넌트
- MDX 콘텐츠 로더와 글 3편
- 학습 데이터 라이브러리
- 문서 폴더
- 패키지 의존성
- GitHub Actions와 배포 설정
- 로컬 생성 파일과 무시 규칙

## 정리한 항목

| 항목 | 처리 | 이유 |
| --- | --- | --- |
| `HomeTechnicalVisual` | 삭제 | 현재 홈 디자인에서 더 이상 사용하지 않는 예전 hero 시각화 |
| `WaferPattern` | 삭제 | `HomeTechnicalVisual` 제거 후 참조가 사라진 내부 함수 |
| `next-env.d.ts` | 로컬 삭제 | Next.js가 생성하는 파일이며 `.gitignore` 대상 |
| `tsconfig.tsbuildinfo` | 로컬 삭제 | TypeScript 증분 빌드 생성 파일이며 `.gitignore` 대상 |
| `@mdx-js/react` 루트 의존성 | 삭제 | 코드에서 직접 쓰지 않고 `next-mdx-remote`가 자체 의존성으로 관리 |
| 프로젝트 설명 문구 | 정리 | “온라인 교재”보다 현재 방향인 “오픈소스 문서”에 맞춤 |

## 유지한 항목

| 항목 | 유지 이유 |
| --- | --- |
| `docs/product-planning.md` | 제품 문제 정의와 사용자 포지셔닝을 설명 |
| `docs/final-design.md` | 1차 MVP 판단 기준 |
| `docs/mvp-summary.md` | 현재 구현 범위와 콘텐츠 수량 기록 |
| `docs/planning-improvements.md` | 다음 보완 우선순위 |
| `docs/tech-news-source-strategy.md` | 공식 기술블로그 링크 허브와 뉴스 수집 전략 |
| `/study` 로컬 학습 기능 | 로그인 없이 학습 흐름을 이어가는 MVP 보조 장치 |
| Vercel workflow | 현재 비활성화 상태지만 배포 파이프라인 기준으로 유지 |

## 코드 점검 결과

- 추적 중인 불필요한 생성 파일은 없습니다.
- 사용하지 않는 공통 컴포넌트 export를 제거했습니다.
- 주요 라우트는 MVP 범위와 일치합니다.
- `node_modules`, `.next`, `*.tsbuildinfo`, `next-env.d.ts`는 `.gitignore`로 제외됩니다.
- 직접 사용하지 않는 루트 의존성을 제거했습니다.

## 의존성 점검 결과

- `npm audit`에서 `next@16.2.5` 내부 `postcss` 의존성 관련 moderate advisory가 보고됩니다.
- `npm audit fix --force`는 `next@9.3.3`으로 내리는 breaking change를 제안하므로 적용하지 않습니다.
- 현재 대응은 Next.js 패치 버전이 정상 제공될 때 업데이트하는 것입니다.

## 문서 점검 결과

- `docs/README.md`가 문서 인덱스 역할을 합니다.
- 문서들은 역할별로 분리되어 있어 삭제하지 않았습니다.
- 현재 상태와 보완 목표는 `docs/mvp-summary.md`와 `docs/planning-improvements.md`로 분리되어 있습니다.
- 오픈소스 문서 운영 방향은 `docs/open-source-document-strategy.md`에 정리되어 있습니다.
- 외부 기술블로그와 뉴스 수집 전략은 `docs/tech-news-source-strategy.md`에 정리되어 있습니다.

## 1차 완료 기준

1차 MVP는 다음을 만족하면 마감 상태로 봅니다.

- 핵심 페이지 10개가 유지된다.
- 핵심 글 3편이 유지된다.
- 레벨 진단, 용어 사전, 복습 질문, 로컬 학습 노트가 동작한다.
- README와 docs에서 제품 방향, MVP 범위, 출처 정책, 보완 계획을 확인할 수 있다.
- `npm run lint`, `npm run typecheck`, `npm run build`, `npm run check:lessons`, `npm run check:glossary`, `npm run check:practice`, `npm run check:sources`, `npm run check:industry`, `npm run check:viewport`가 통과한다.

## 다음 작업

### P0

- DRAM, HBM, EUV 글 리라이트
- 각 글 출처 해석 메모 고도화
- 글별 상단 요약 카드 설계

### P2

- `/industry/[slug]` 상세 해설 노트 설계 및 구현
- NAND/SSD 글 추가
- 패키징, TSV, MR-MUF 글 추가
- 직무별 읽기 경로 추가

## 마감 판단

1차는 기능 추가보다 “기준 있는 오픈소스 문서”로서의 방향을 확정하는 단계입니다. 이후 작업은 많은 기능을 빠르게 늘리기보다, 핵심 글의 깊이와 공식 출처 기반 신뢰를 먼저 높이는 순서로 진행합니다.
