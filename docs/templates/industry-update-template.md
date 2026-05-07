# 산업 업데이트 템플릿

`/industry`에 공식 기술 발표나 뉴스룸 글을 추가할 때 사용합니다.
등록한 항목은 `/industry/[id]` 상세 해설 노트로도 노출됩니다.

feed 검토 후보에서 시작할 때는 먼저 초안을 생성합니다.

```bash
npm run promote:industry-draft -- --list
npm run promote:industry-draft -- --id=후보-id --format=ts
```

출력된 초안은 그대로 게시하지 말고 원문 확인 뒤 요약과 질문을 다듬습니다.

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
- [ ] `/industry/[id]`에서 제목, 질문, 출처, 관련 교재가 자연스럽게 읽힙니다.
- [ ] `npm run check:links`를 실행했습니다.
- [ ] 자동 요청 제한이 있으면 allowlist 필요 여부를 작업 로그에 남겼습니다.
