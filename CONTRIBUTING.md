# Contributing

Semiconductor Education은 로그인 없는 반도체 오픈소스 문서입니다. 기여의 목표는 글 수를 빠르게 늘리는 것이 아니라, 공식 출처를 바탕으로 어려운 반도체 개념을 쉽게 읽히면서도 실무 판단까지 연결하는 것입니다.

## 먼저 읽을 문서

기여 전에 아래 문서를 확인해 주세요.

1. [오픈소스 문서 전략](docs/open-source-document-strategy.md)
2. [커뮤니티 운영 기준](docs/community-governance.md)
3. [콘텐츠 작성 기준](docs/content-standard.md)
4. [정보 출처 정책](docs/source-policy.md)
5. [Git workflow](docs/git-workflow.md)
6. [작업 로그](docs/work-log.md)

## 기여할 수 있는 것

| 기여 유형 | 예시 |
| --- | --- |
| 설명 개선 | 어려운 문장을 더 쉬운 한국어로 바꾸기 |
| 출처 보강 | 공식 자료 링크 추가, 확인일 갱신, 깨진 링크 수정 |
| 교재 글 추가 | DRAM, HBM, EUV 이후 NAND, SSD, 패키징, 공정 글 제안 |
| 용어 추가 | 용어 사전에 쉬운 설명과 실무 사용 맥락 추가 |
| 복습 질문 추가 | 정의 암기보다 trade-off를 설명하게 하는 질문 추가 |
| 산업 업데이트 | 공식 발표를 원문 링크, 읽을 질문, 관련 교재로 연결 |
| UI 개선 | 모바일 가독성, 본문 폭, 필터, 목차 사용성 개선 |

## 처음 기여할 때

처음부터 큰 글을 새로 쓰지 않아도 됩니다. 작은 기여가 쌓여야 문서가 오래 유지됩니다.

| 시작점 | 좋은 첫 기여 |
| --- | --- |
| 글을 읽다가 막힘 | 어려운 문장을 쉬운 표현으로 바꾸는 PR |
| 공식 자료를 발견함 | `/sources` 또는 글 하단 출처 보강 이슈 |
| 용어가 부족함 | 용어 사전 항목 추가 |
| 설명 확인이 필요함 | 복습 질문이나 체크 질문 추가 |
| 새 주제가 필요함 | `새 교재 글 제안` 이슈 작성 |

새 글, 새 트랙, 큰 구조 변경은 바로 PR을 열기보다 이슈로 먼저 제안해 주세요. 주제, 대상 독자, 공식 출처 후보, 예상 목차가 확인되면 작은 PR로 나눠 진행합니다.

## 콘텐츠 품질 기준

모든 글과 설명은 아래 기준을 통과해야 합니다.

- 초보자가 첫 문단에서 주제를 이해할 수 있어야 합니다.
- 쉬운 비유로 시작하되 실제 구조로 돌아와야 합니다.
- 중급 독자가 구조와 trade-off를 확인할 수 있어야 합니다.
- 심화 독자가 수율, 전력, 열, 패키징, 양산성, 고객 검증 중 최소 하나를 볼 수 있어야 합니다.
- 공식 자료의 문장을 복사하지 않고 학습자 관점으로 재구성해야 합니다.
- 최신 제품명, 수치, 날짜, 양산 일정은 출처와 확인일을 남겨야 합니다.

## 출처 원칙

핵심 주장은 공식 자료를 우선합니다.

- Samsung Semiconductor, SK hynix Newsroom, Micron, TSMC, Intel, ASML, Lam Research, Applied Materials, KLA, imec 같은 공식 출처를 먼저 확인합니다.
- 원문 본문과 이미지는 저장하거나 재배포하지 않습니다.
- 비공식 루머, 커뮤니티 글, 출처 없는 요약은 사실처럼 다루지 않습니다.
- 공식 자료의 홍보 문구는 성능 주장과 엔지니어링 제약으로 분리해 설명합니다.
- 출처 링크는 단순 참고가 아니라 어떤 설명을 뒷받침하는지 `usedFor` 또는 학습 메모에 적습니다.

## 작업 흐름

브랜치는 항상 `dev`에서 만듭니다.

```bash
git switch dev
git pull --ff-only origin dev
git switch -c docs/example-task
```

브랜치 이름은 `type/task-name` 형식을 사용합니다.

| type | 사용할 때 |
| --- | --- |
| `feature` | 새 페이지, 새 기능, 새 콘텐츠 모델 |
| `fix` | 깨진 링크, 잘못된 동작, 오류 수정 |
| `refactor` | 동작 변화 없는 구조 정리 |
| `docs` | README, 기획 문서, 가이드, 템플릿 |
| `style` | CSS, 레이아웃, 시각 표현만 변경 |
| `chore` | 패키지, 스크립트, 설정 |
| `test` | 테스트 또는 검증 추가 |

커밋 메시지는 Conventional Commits를 사용합니다.

```txt
docs(contributing): add source contribution template
feat(industry): add curated update hub
fix(content): correct HBM terminology
```

작업 단위는 작게 유지합니다.

- 한 PR에는 하나의 목적만 담습니다.
- 새 글 추가와 UI 변경은 분리합니다.
- 공식 출처 보강과 문장 리라이트는 가능하면 분리합니다.
- 큰 글은 `proposal -> draft -> source-check -> review -> ready` 흐름으로 진행합니다.

## 템플릿

새 글이나 출처 제안은 아래 템플릿을 사용하세요.

- [교재 글 템플릿](docs/templates/lesson-template.mdx)
- [용어 사전 추가 템플릿](docs/templates/glossary-term-template.md)
- [공식 출처 추가 템플릿](docs/templates/source-addition-template.md)
- [산업 업데이트 템플릿](docs/templates/industry-update-template.md)

GitHub Issue로 제안할 때는 저장소의 issue template을 사용하면 됩니다.

## 리뷰 기준

리뷰어는 아래 기준으로 봅니다.

- 초보자가 첫 문단에서 주제를 이해할 수 있는가
- 쉬운 비유가 실제 구조 설명으로 이어지는가
- 중급 독자가 구조와 trade-off를 확인할 수 있는가
- 심화 독자가 수율, 전력, 열, 패키징, 양산성, 고객 검증 중 필요한 제약을 볼 수 있는가
- 공식 출처 링크와 확인일이 있고, 원문 문장을 복사하지 않았는가
- 학습 인터랙션, 본문, 용어, 복습 질문이 서로 연결되는가

## 검증

변경 범위에 맞게 아래 명령을 실행합니다.

```bash
npm run validate
npm run check:links
npm run check:viewport
```

문서만 수정한 경우에도 최소한 `git diff --check`와 `npm run validate`를 확인합니다. 교재 글, 용어 사전, 복습 질문은 `npm run validate` 안에서 함께 검증합니다. 출처나 산업 업데이트 링크를 바꿨다면 `npm run check:links`를 실행합니다.

## PR 체크리스트

PR을 열기 전 아래를 확인해 주세요.

- 변경 이유와 범위가 PR 설명에 적혀 있습니다.
- 공식 출처가 필요한 기술 주장에는 링크와 확인일이 있습니다.
- 원문 본문이나 이미지를 복사하지 않았습니다.
- 초보자용 설명과 실무 관점이 함께 남아 있습니다.
- 로그인, 계정, 쿠키 인증, 개인정보 요구가 추가되지 않았습니다.
- 관련 문서나 작업 로그가 갱신되었습니다.

## 하지 않는 것

- 로그인 기반 개인화 추가
- 원문 본문 크롤링과 저장
- 이미지 다운로드 후 재배포
- robots.txt 우회
- 비공식 루머 자동 노출
- 출처 없는 최신 제품 주장
