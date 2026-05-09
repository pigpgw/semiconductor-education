# 기술 블로그와 뉴스 소스 전략

이 문서는 Semiconductor Education이 여러 반도체 기업의 기술 블로그, 뉴스룸, 신기술 발표를 어떻게 연결하고 활용할지 정리합니다. 목표는 외부 글을 무단으로 복제하는 것이 아니라, 공식 출처로 이동할 수 있는 링크 허브와 학습자용 해설 레이어를 만드는 것입니다.

## 한 줄 방향

Semiconductor Education은 반도체 기술 뉴스를 “긁어 모아 보여주는 사이트”가 아니라, 공식 기술 자료를 모아 학습 가능한 문맥으로 재배열하는 오픈소스 문서입니다.

## 왜 필요한가

반도체 산업 자료는 여러 회사 사이트에 흩어져 있습니다. 학습자는 Samsung, SK hynix, Micron, TSMC, Intel, ASML, Lam Research, Applied Materials, KLA, imec 같은 회사와 연구기관의 기술 글을 읽어야 하지만, 처음에는 어떤 글이 중요한지 판단하기 어렵습니다.

따라서 이 프로젝트는 다음 역할을 합니다.

- 공식 기술 블로그와 뉴스룸을 한곳에 모아 보여준다.
- 사용자가 카드나 링크를 클릭하면 반드시 원문으로 이동하게 한다.
- 사이트 안에서는 원문 전체가 아니라 제목, 출처, 날짜, 태그, 짧은 학습 메모만 보여준다.
- 중요한 기술 발표는 DRAM, HBM, EUV, NAND, 패키징, 수율 같은 학습 주제와 연결한다.
- 자동 수집은 합법적이고 공개된 RSS/API/메타데이터 범위에서만 한다.

## 소스 허브

첫 단계는 “기업 기술블로그 링크 허브”입니다. 자동 수집보다 먼저 사용자가 신뢰할 수 있는 공식 출처로 바로 이동할 수 있어야 합니다.

| 분류 | 회사/기관 | 링크 | 주로 볼 내용 |
| --- | --- | --- | --- |
| 메모리 | Samsung Semiconductor | https://semiconductor.samsung.com/news-events/tech-blog/ | DRAM, HBM, CXL, SSD, Foundry, EUV 관련 기술 글 |
| 메모리 | SK hynix Newsroom | https://news.skhynix.co.kr/ | HBM, DRAM, NAND, AI memory, 기술 리더 인터뷰 |
| 메모리 | Micron Newsroom | https://www.micron.com/about/press/news | DRAM, NAND, data center, AI memory, 제품 발표 |
| 파운드리 | TSMC Technology | https://www.tsmc.com/english/dedicatedFoundry/technology | 공정 노드, advanced packaging, OIP, R&D 방향 |
| 파운드리 | TSMC Press Center | https://pr.tsmc.com/english/news | 기술 심포지엄, 공정/패키징 발표 |
| 파운드리/로직 | Intel Newsroom | https://newsroom.intel.com/ | Intel Foundry, process roadmap, packaging, AI PC |
| 장비 | ASML Stories | https://www.asml.com/en/news/stories | EUV, High-NA, lithography, metrology |
| 장비 | Lam Research Newsroom | https://www.lamresearch.com/newsroom/ | etch, deposition, wafer fabrication, AI-era process |
| 장비 | Applied Materials Newsroom | https://www.appliedmaterials.com/us/en/newsroom.html | materials engineering, wiring, DRAM scaling, advanced patterning |
| 계측/수율 | KLA Newsroom | https://www.kla.com/newsroom | inspection, metrology, yield management |
| 연구 | imec Reading Room | https://www.imec-int.com/en/reading-room | sub-2nm, EUV, silicon photonics, advanced research |

## 학습 기준 Big 10

이 프로젝트의 Big 10은 순위표가 아니라 학습 범위입니다. 메모리 기업만 보면 DRAM/HBM은 이해할 수 있지만 공정, 장비, 수율, 패키징까지 이어지지 않습니다. 반대로 장비 기업만 보면 제품과 시스템 병목을 놓칩니다. 따라서 다음 10개 축을 함께 봅니다.

| 축 | 출처 | 담당하는 질문 |
| --- | --- | --- |
| 메모리 제품 | Samsung Semiconductor | DRAM, HBM, EUV, SSD를 어떤 제품군과 고객 요구로 설명하는가 |
| AI 메모리 | SK hynix Newsroom | HBM, NAND, CXL/PIM이 AI 시스템 병목과 어떻게 연결되는가 |
| 메모리 비교축 | Micron Technology | HBM, data center SSD, DRAM/NAND 스펙을 다른 메모리 기업과 어떻게 비교할 것인가 |
| 파운드리/패키징 | TSMC Technology | 공정 노드와 3DFabric이 시스템 성능으로 어떻게 이어지는가 |
| 로직/패키징 | Intel Foundry | RibbonFET, PowerVia, EMIB/Foveros가 어떤 병목을 줄이는가 |
| 노광 | ASML Technology | EUV와 High-NA를 파장, 광학, throughput, defect 관점으로 어떻게 읽는가 |
| 식각/증착 | Lam Research | 노광 뒤 실제 구조를 만들 때 etch/deposition 난이도가 왜 커지는가 |
| 재료/배선 | Applied Materials | scaling이 왜 재료, 배선, hard mask, PPACt 문제로 확장되는가 |
| 계측/수율 | KLA | defect, metrology, inspection이 양산 수율과 어떻게 연결되는가 |
| 연구 로드맵 | imec | 상용 발표와 연구 단계 기술을 어떻게 구분해 읽는가 |

세부 커리큘럼은 [Big 10 공식 자료 기반 반도체 펀더멘탈 설계](big10-source-curriculum.md)에 둡니다.

## 사이트 기능 설계

### 1. `/sources`

공식 출처 링크 허브입니다.

- 회사/기관별 카드
- 분야 태그: `Memory`, `Foundry`, `Equipment`, `EDA`, `Research`, `Packaging`
- 주요 키워드: `DRAM`, `HBM`, `NAND`, `EUV`, `High-NA`, `TSV`, `Yield`
- `공식 사이트로 이동` 버튼
- 이 출처를 읽을 때 봐야 할 관점

이 페이지는 외부 원문으로 이동하는 관문입니다. 원문 내용을 복제하지 않습니다.

### 2. `/industry`

공식 자료 업데이트를 모아 보는 페이지입니다. 1차 구현에서는 자동 수집 대신 사람이 고른 공식 글 8개를 원문 링크, 학습 관점, 관련 교재와 함께 제공합니다.

표시 항목:

- 제목
- 출처 회사
- 발행일
- 원문 링크
- 주제 태그
- 난이도
- 2~3문장 학습 메모
- 관련 교재 글 링크

예시:

| 제목 | 출처 | 태그 | 연결 글 |
| --- | --- | --- | --- |
| HBM 신제품 발표 | SK hynix | HBM, AI Memory, Packaging | HBM은 왜 AI 시대의 핵심 메모리인가 |
| EUV 관련 기술 글 | Samsung Semiconductor | EUV, Scaling, Patterning | EUV는 왜 DRAM 미세화에 중요한가 |
| Advanced packaging 발표 | TSMC | Packaging, 3D IC | 패키징과 시스템 관점 |

### 3. `/industry/[slug]`

원문을 그대로 옮기는 페이지가 아닙니다. 한 뉴스/블로그 글을 학습자 관점으로 해석하는 짧은 노트입니다.

구조:

1. 원문 링크
2. 한 줄 요약
3. 왜 중요한가
4. 알아야 할 용어
5. 기술적으로 봐야 할 trade-off
6. 관련 교재 글
7. 더 읽을 공식 출처

현재 MVP에서는 `/industry/[slug]`를 `lib/industry.ts`의 수동 큐레이션 데이터로 생성합니다. 원문 본문은 저장하지 않고, 한 줄 요약, 중요도, 읽을 질문, 관련 교재, 출처 정책만 보여줍니다.

## 수집 방식

수집은 세 단계로 나눕니다.

### Phase A: 수동 큐레이션

MVP 다음 단계에서는 자동 크롤링보다 수동 큐레이션을 먼저 합니다.

- `content/sources/*.json`에 공식 출처 목록 관리
- `content/industry/*.mdx`에 중요 글만 학습 노트로 작성
- 원문 전체를 복사하지 않고 링크와 해설만 작성

장점:

- 저작권 리스크가 낮다.
- 포트폴리오에서 해석 능력이 잘 보인다.
- 처음에는 품질 관리가 쉽다.

### Phase B: RSS/API 기반 자동 업데이트

공식 RSS, Atom, 공개 API, sitemap, press release feed가 있는 경우에만 자동 수집합니다.

저장하는 데이터:

- title
- canonical URL
- source
- publishedAt
- fetchedAt
- tags
- short excerpt 또는 description이 공식 feed에 포함된 경우의 짧은 요약

하지 않는 것:

- 본문 전체 저장
- 이미지 무단 저장
- paywall 우회
- robots.txt에서 막은 페이지 수집
- 비공식 루머를 사실처럼 표시

## MVP에서 확정한 공식 feed 후보

`/sources`에는 공식 링크와 별도로 `feedUrl`을 둡니다. `crawlPolicy`가 `rss`인 출처는 `npm run check:sources`에서 사이트 URL과 feed URL을 함께 확인합니다.

| sourceId | feedUrl | 사용 기준 |
| --- | --- | --- |
| `samsung-global-semiconductor-newsroom` | `https://news.samsung.com/global/semiconductors-leadership/feed` | Samsung Global Newsroom의 반도체 카테고리를 함께 확인 |
| `sk-hynix-newsroom` | `https://news.skhynix.com/feed/` | SK hynix 공식 뉴스룸 업데이트 확인 |
| `micron-newsroom` | `https://investors.micron.com/rss/news-releases.xml` | Micron 공식 발표 중 메모리/스토리지 관련 발표 확인 |
| `intel-newsroom` | `https://newsroom.intel.com/feed` | Intel Foundry, packaging, manufacturing 맥락 확인 |
| `lam-research-newsroom` | `https://newsroom.lamresearch.com/press-releases?pagetemplate=rss` | 식각, 증착, 공정 장비 업데이트 확인 |
| `applied-materials-newsroom` | `https://ir.appliedmaterials.com/rss/news-releases.xml` | 재료 공학, 배선, DRAM scaling, 패키징 발표 확인 |

Samsung Semiconductor Tech Blog, ASML, TSMC, KLA, imec은 현재 MVP에서 수동 또는 메타데이터 확인 대상으로 유지합니다. feed가 없거나 Node 요청 제한이 있는 출처는 자동 수집 대상으로 승격하지 않습니다.

## source별 feed 필터

RSS feed는 공식 자료라도 투자자 공지, 채용, 캠페인, 일반 기업 소식이 섞입니다. 그래서 `lib/sources.ts`의 RSS 출처에는 `feedIncludeKeywords`와 `feedExcludeKeywords`를 둡니다.

필터 기준:

- 포함 키워드는 title, URL, feed description/excerpt에서만 찾는다.
- source의 기본 topic은 표시용 맥락으로만 쓰고, 포함 판정에는 쓰지 않는다.
- 제외 키워드가 하나라도 맞으면 포함 키워드가 있어도 후보에서 제외한다.
- 필터를 통과한 항목만 `review-needed` 후보로 출력한다.
- feed는 정상인데 필터 통과 항목이 0개인 출처는 네트워크 실패로 보지 않는다.

`/sources` 카드에는 RSS 출처별 포함/제외 키워드 일부를 표시해, 어떤 기준으로 공식 feed를 선별하는지 사용자가 확인할 수 있게 합니다.

### Phase C: 학습자용 해설 생성

자동 수집된 링크 중 중요한 글만 사람이 검토해 해설 노트로 승격합니다.

승격 기준:

- DRAM/HBM/EUV/NAND/패키징/수율과 직접 연결되는가
- 공식 출처인가
- 기술 구조나 trade-off를 설명할 가치가 있는가
- 기존 교재 글과 연결할 수 있는가
- 학습자에게 새로운 용어나 관점을 제공하는가

## 실시간 뉴스 설계

“실시간”은 매초 갱신이 아니라, 신뢰할 수 있는 공식 출처를 주기적으로 확인하는 의미로 정의합니다.

추천 주기:

- 공식 RSS/API: 6시간마다
- 공식 뉴스룸 HTML fallback: 하루 1회 이하
- 수동 큐레이션 리뷰: 주 1회

표시 방식:

- `최근 업데이트`
- `공식 출처`
- `검토 필요`
- `교재 반영 완료`

이렇게 상태를 나누면 자동 수집 글과 사람이 검토한 학습 노트를 구분할 수 있습니다.

## 크롤링 정책

크롤링은 마지막 수단입니다. 우선순위는 다음과 같습니다.

1. 공식 RSS/API
2. 공식 sitemap 또는 structured metadata
3. 공개 뉴스룸 목록 페이지의 제목/URL/날짜만 수집
4. 사람이 직접 등록

금지:

- 본문 전문 복사
- 이미지 다운로드 후 재배포
- 로그인/쿠키/차단 우회
- 과도한 요청
- 출처 표기 없는 요약
- 검증되지 않은 루머 자동 노출

기술적으로는 user-agent, 요청 간격, 캐시, 실패 재시도 제한, source별 allowlist를 둡니다.

현재 MVP에는 원문 수집기가 아니라 공식 링크와 공식 feed 상태를 점검하는 `npm run check:links`만 둡니다. 이 명령은 `/sources`와 `/industry`에 노출되는 공식 URL이 살아 있는지 확인하고, 자동 요청을 제한하는 TSMC 링크처럼 브라우저 이동은 가능하지만 Node 요청은 `403`이 나는 출처를 명시적 allowlist로 관리합니다. feed 응답 실패는 보고서에 남기되 공식 링크 검증 전체를 실패시키지는 않습니다.

## feed 메타데이터 수집기 초안

`npm run collect:feeds -- --limit=5`는 `crawlPolicy`가 `rss`이고 `feedUrl`이 있는 공식 출처만 확인합니다. 수집 결과는 파일에 저장하지 않고 JSON으로 출력합니다. 네트워크 일시 실패가 있어도 일부 항목을 가져오면 부분 성공으로 보고, 모든 feed 성공을 강제해야 할 때는 `--strict`를 붙입니다.

출력하는 데이터:

- `sourceId`
- `sourceName`
- `title`
- `url`
- `publishedAt`
- `fetchedAt`
- `topics`
- `status: "review-needed"`
- feed에 포함된 짧은 `excerpt`
- `matchedKeywords`

이 스크립트는 원문 본문 저장, 이미지 저장, 자동 게시를 하지 않습니다. 수집 결과 중 학습 가치가 있는 후보는 `lib/feed-review.ts`의 검토 대기열로 분리하고, 선별된 항목만 `/industry` 해설 노트로 승격합니다.

## feed 검토 대기열

`lib/feed-review.ts`는 자동 수집 결과를 바로 게시하지 않고 사람이 검토하기 위한 후보 목록입니다. 현재 `review-needed` 후보 4개를 관리합니다.

상태:

- `review-needed`: 원문 확인, 중복 확인, 교재 연결 판단이 필요한 후보
- `approved`: `/industry` 해설 노트로 승격할 수 있는 후보
- `dismissed`: 공식 자료이지만 현재 교재와 직접 연결하기 어려운 후보

각 후보에는 출처, URL, 발행일, 수집일, 우선순위, 주제, 검토 이유, 검토 질문, 추천 관련 교재, 승격용 promotion 메타데이터를 둡니다. `npm run check:feed-review`는 sourceId, URL, 날짜, 상태, 우선순위, 관련 교재 slug, `/industry` 중복 여부와 promotion 메타데이터의 최소 품질을 확인합니다.

## industry 초안 승격 스크립트

`npm run promote:industry-draft -- --id=후보-id`는 `lib/feed-review.ts`의 후보 하나를 `IndustryUpdate` 초안 JSON으로 출력합니다. `--format=ts`를 붙이면 `lib/industry.ts`의 `industryUpdates` 배열에 넣기 쉬운 TypeScript 객체 형태로 출력합니다.

초안의 sourceType, level, category, status, tags, summary는 후보의 `promotion` 메타데이터를 우선 사용합니다. promotion이 없는 항목은 기존 topic 기반 추론으로 fallback하지만, 검토 대기열에 들어가는 후보는 promotion 필드를 채우는 것을 원칙으로 합니다.

이 스크립트가 확인하는 것:

- 후보 id가 존재하는가
- 후보 sourceId가 공식 출처에 있는가
- `dismissed` 상태가 아닌가
- 이미 `/industry`에 같은 id나 URL이 있는가
- 추천 관련 교재 slug가 실제 MDX 글인가
- promotion 메타데이터가 `IndustryUpdate` 초안으로 옮길 수 있는 수준인가

이 스크립트는 `lib/industry.ts`를 자동 수정하지 않습니다. 원문 확인 뒤 사람이 summary, whyItMatters, readFor를 다듬어 수동으로 추가합니다.

## 데이터 모델 초안

```ts
type ExternalSource = {
  id: string;
  name: string;
  companyType: "memory" | "foundry" | "equipment" | "eda" | "research" | "media";
  url: string;
  feedUrl?: string;
  feedIncludeKeywords?: string[];
  feedExcludeKeywords?: string[];
  crawlPolicy: "manual" | "rss" | "metadata-only";
  topics: string[];
  language: "ko" | "en" | "multi";
};

type FeedReviewPromotion = {
  sourceType: "보도자료" | "기술 페이지" | "제품 페이지" | "기술 플랫폼" | "공식 사이트";
  level: "기초" | "중급" | "심화";
  category: string;
  status: "curated" | "lesson-linked" | "watching";
  tags: string[];
  summary: string;
};

type FeedReviewCandidate = {
  id: string;
  sourceId: string;
  title: string;
  url: string;
  status: "review-needed" | "approved" | "dismissed";
  priority: "high" | "medium" | "low";
  topics: string[];
  reviewQuestions: string[];
  suggestedRelatedLessons: string[];
  promotion: FeedReviewPromotion;
};

type IndustryUpdate = {
  id: string;
  sourceId: string;
  title: string;
  url: string;
  publishedAt?: string;
  fetchedAt: string;
  topics: string[];
  status: "raw" | "review-needed" | "curated" | "linked-to-lesson";
  relatedLessons: string[];
  learningNote?: string;
};
```

## UI 원칙

- 카드 전체를 클릭하면 원문으로 이동합니다.
- 외부 링크는 명확히 표시합니다.
- 사이트 안에서는 “요약”보다 “학습 포인트”를 보여줍니다.
- 자동 수집 글과 검토 완료 글을 시각적으로 구분합니다.
- 사용자가 기사 제목만 보고 끝내지 않도록 관련 교재 글을 반드시 연결합니다.

## MVP 이후 우선순위

| 우선순위 | 작업 | 완료 기준 |
| --- | --- | --- |
| P1 | `/sources` 공식 링크 허브 | 완료: 10개 이상 공식 출처 카드, 외부 이동 버튼 |
| P1 | 공식 출처 URL 헬스체크 | 완료: `npm run check:links`, TSMC 403 allowlist |
| P1 | 공식 RSS/API 후보 정리 | 완료: 공식 feed 6개 `feedUrl`과 응답 검증 |
| P1 | 수동 industry notes | 1차 구현: HBM/EUV/Packaging/공정/수율 관련 공식 글 8개 큐레이션 |
| P2 | `/industry` 업데이트 목록 | 완료: 출처, 날짜, 태그, 관련 교재 글 표시 |
| P2 | `/industry/[slug]` 상세 해설 | 완료: 원문별 질문, 출처 정책, 관련 교재 표시 |
| P2 | RSS/API 수집기 | 완료: `npm run collect:feeds`로 공식 feed title/url/date 수집 |
| P2 | 검토 대기열 | 완료: `review-needed` 후보 4개, 검증 스크립트, `/industry` 검토 대기 통계 |
| P2 | source별 feed 필터 | 완료: RSS 출처 6개 include/exclude 키워드, collector 필터링, `/sources` 표시 |
| P2 | industry 초안 승격 스크립트 | 완료: 후보 id 기반 JSON/TS 초안 출력, 중복 URL/관련 교재 검증 |
| P2 | 승격 초안 품질 보정 | 완료: 후보별 promotion summary/category/level/tags/sourceType, `check:feed-review` 검증 |
| P3 | 자동 태깅 | HBM/EUV/NAND/TSV/Yield 키워드 기반 태그 추천 |
| P3 | 주간 리뷰 문서 | 이번 주 공식 자료에서 배울 기술 포인트 정리 |

## 포트폴리오 어필 포인트

이 기능은 단순 뉴스 피드가 아닙니다. 포트폴리오에서는 다음 능력을 보여 줍니다.

- 외부 공식 자료를 신뢰성 기준으로 분류하는 능력
- 저작권과 robots.txt를 고려한 데이터 수집 설계
- 자동 수집 데이터와 사람이 검토한 학습 노트를 분리하는 제품 판단
- 반도체 기술 뉴스를 교재 로드맵과 연결하는 정보 구조화 능력
- 링크 허브, 태그, 필터, 상태 배지, 외부 이동 UX 설계 능력
