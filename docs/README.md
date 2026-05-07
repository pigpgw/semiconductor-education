# 문서 인덱스

이 폴더는 Semiconductor Education의 제품 기획, MVP 범위, 콘텐츠 기준, 운영 정책을 정리합니다. 처음 보는 사람은 아래 순서대로 읽으면 프로젝트 의도를 가장 빠르게 파악할 수 있습니다.

## 먼저 읽을 문서

1. [최종 설계 확정](final-design.md)
   - 1차 MVP의 제품 정의, 핵심 사용자, 제외 범위, 일단락 기준을 확정한 문서입니다.
2. [오픈소스 문서 전략](open-source-document-strategy.md)
   - Toss Frontend Fundamentals처럼 하나의 기준 있는 공개 문서로 운영하기 위한 철학과 기여 단위를 정리합니다.
3. [MVP 정리](mvp-summary.md)
   - 현재 구현된 화면, 콘텐츠 수량, 검증 기준, 포트폴리오 어필 포인트를 한 번에 정리합니다.
4. [보완 기획](planning-improvements.md)
   - MVP 이후 무엇을 먼저 보완할지 우선순위와 기준을 정리합니다.
5. [기술 블로그와 뉴스 소스 전략](tech-news-source-strategy.md)
   - 반도체 기업 기술블로그 링크 허브, 공식 뉴스 수집, 학습자용 해설 레이어를 설계합니다.
6. [1차 최종 점검](phase-one-final-audit.md)
   - 1차 MVP 마감 전 코드, 문서, 설정 점검 결과와 다음 작업을 정리합니다.

## 기획 문서

| 문서 | 역할 |
| --- | --- |
| [제품 기획 보완](product-planning.md) | 문제 정의, 타깃 사용자, 포지셔닝, 운영 원칙 |
| [오픈소스 문서 전략](open-source-document-strategy.md) | 문서 중심 제품 철학, 기여 단위, 품질 게이트 |
| [시장 조사](market-research.md) | 반도체 교육 접근성, 공식 자료 활용 방향 |
| [기술 블로그와 뉴스 소스 전략](tech-news-source-strategy.md) | 공식 출처 링크 허브, RSS/API 수집, 크롤링 정책 |
| [학습 설계 보완](learning-design.md) | 기초, 중급, 심화 학습 경험과 깊이 매트릭스 |
| [레벨 시스템](level-system.md) | 레벨 진단, 추천 기준, 사용자별 경로 |
| [학습 로드맵](roadmap.md) | 반도체를 실무 문맥으로 이해하는 순서 |

## 콘텐츠 기준

| 문서 | 역할 |
| --- | --- |
| [콘텐츠 작성 기준](content-standard.md) | MDX frontmatter, 글 구조, 문장 기준 |
| [출처 정책](source-policy.md) | 공식 자료 우선순위, 인용/재작성 원칙 |
| [디자인 원칙](design-principles.md) | 다크 문서형 UI, 가독성, 관심 유도 방식 |

## 운영 문서

| 문서 | 역할 |
| --- | --- |
| [로그인 없는 정책](no-login-policy.md) | 계정 없는 학습, localStorage, 개인정보 미수집 기준 |
| [Git workflow](git-workflow.md) | `main`, `dev`, 작업 브랜치, 커밋 규칙 |
| [Deployment](deployment.md) | 배포 파이프라인과 환경 변수 정책 |
| [1차 최종 점검](phase-one-final-audit.md) | 마감 점검 결과, 삭제/유지 판단, 다음 작업 |

## 문서 정리 원칙

- `final-design.md`는 1차 MVP의 최종 판단 기준입니다.
- `open-source-document-strategy.md`는 기능보다 문서 품질을 우선하는 운영 철학입니다.
- `mvp-summary.md`는 현재 구현 상태를 기록합니다.
- `planning-improvements.md`는 다음에 할 일을 우선순위로 관리합니다.
- 세부 설계는 각 전문 문서에 남기고, README에는 프로젝트를 빠르게 이해하는 요약만 둡니다.
- 현재 구현과 맞지 않는 수량 목표는 “현재 상태”가 아니라 “보완 목표”로 분리합니다.
