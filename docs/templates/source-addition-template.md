# 공식 출처 추가 템플릿

`/sources`에 새 공식 출처를 추가할 때 사용합니다.

## 기본 정보

- `id`:
- `name`:
- `companyType`: `memory | foundry | equipment | metrology | research`
- `url`:
- `feedUrl`: 공식 RSS/API가 있을 때만 입력
- `language`: `ko | en | multi`
- `crawlPolicy`: `manual | rss | metadata-only`
- `verifiedAt`: `YYYY-MM-DD`

## 주제

- `topics`:
  - `DRAM`
  - `HBM`

## 학습 관점

- `readFor`: 이 출처를 읽을 때 확인해야 할 기술 관점
- `note`: 사이트에 노출할 짧은 설명
- `relatedLessons`:
  - `dram-basics`

## 검증

- [ ] 공식 회사/기관 도메인입니다.
- [ ] `crawlPolicy`가 `rss`이면 `feedUrl`이 있고 RSS/Atom 응답을 반환합니다.
- [ ] 원문 본문이나 이미지를 저장하지 않습니다.
- [ ] `npm run check:links`를 실행했습니다.
- [ ] 자동 요청 제한이 있으면 allowlist 필요 여부를 작업 로그에 남겼습니다.
