# 산업 업데이트 템플릿

`/industry`에 공식 기술 발표나 뉴스룸 글을 추가할 때 사용합니다.

## 기본 정보

- `id`:
- `title`:
- `sourceId`:
- `sourceName`:
- `url`:
- `sourceType`: `보도자료 | 기술 페이지 | 제품 페이지 | 기술 플랫폼 | 공식 사이트`
- `publishedAt`: `YYYY-MM-DD` 또는 생략
- `curatedAt`: `YYYY-MM-DD`
- `level`: `기초 | 중급 | 심화`
- `category`:
- `status`: `curated | lesson-linked | watching`

## 태그

- `tags`:
  - `HBM`
  - `EUV`

## 학습 메모

- `summary`: 초보자가 이해할 수 있는 핵심 요약
- `whyItMatters`: 이 업데이트가 교재나 산업 이해에 중요한 이유
- `readFor`:
  - 이 원문을 읽으며 답해야 할 질문
  - 제품 홍보 문구와 엔지니어링 의미를 분리하는 질문
- `relatedLessons`:
  - `hbm-ai-memory`

## 검증

- [ ] 공식 출처 링크입니다.
- [ ] 원문 전체를 복사하지 않았습니다.
- [ ] 관련 교재 글과 연결했습니다.
- [ ] `npm run check:industry`를 실행했습니다.
- [ ] 자동 요청 제한이 있으면 allowlist 필요 여부를 작업 로그에 남겼습니다.
