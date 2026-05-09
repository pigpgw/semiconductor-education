# 1차 공개 체크리스트

이 문서는 Semiconductor Education을 빠르게 무료 공개하고 홍보하기 위한 1차 마무리 기준입니다. 목표는 기능을 더 붙이는 것이 아니라, 지금 MVP를 안전하게 공개 가능한 상태로 닫는 것입니다.

## 공개 원칙

- 무료 배포를 우선합니다.
- 로그인, 서버 DB, 결제, 회원 기능은 넣지 않습니다.
- 공식 자료 원문을 저장하지 않고 제목, URL, 날짜, 학습 질문만 관리합니다.
- 홍보 문구는 “완성된 교육 플랫폼”이 아니라 “함께 만드는 오픈소스 반도체 문서”로 씁니다.
- 최신 제품 정보는 공식 출처 링크와 확인일을 함께 둡니다.

## 빠른 배포 경로

1차 공개는 Vercel Hobby로 진행합니다. 현재 Next.js App Router 구조와 가장 잘 맞고, GitHub import만으로 production URL을 빠르게 만들 수 있습니다.

| 항목 | 선택 |
| --- | --- |
| 1차 배포 | Vercel Hobby |
| Production branch | `main` |
| Preview branch | PR, `dev` |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Site URL env | `NEXT_PUBLIC_SITE_URL` |

Vercel Hobby는 공식 문서 기준 개인/소규모 프로젝트용 무료 플랜이며, 비상업적 개인 사용 제한이 있습니다. 상업 서비스, 유료 강의, 광고 기반 운영으로 바뀌면 Pro 또는 Cloudflare Pages 전환을 재검토합니다.

## 환경값

로컬과 Vercel 모두 `NEXT_PUBLIC_SITE_URL`을 기준으로 metadata, robots, sitemap URL을 만듭니다.

```bash
NEXT_PUBLIC_SITE_URL=https://semiconductor-education.vercel.app
```

실제 Vercel URL이나 커스텀 도메인이 정해지면 `.env.example`, Vercel Environment Variables, README의 공개 URL을 같은 값으로 맞춥니다.

## 무료 대안

Cloudflare Pages는 무료 플랜에서 Git 연동 배포, 월 500 builds, 무료 preview를 제공합니다. 이 프로젝트를 완전 정적 export 구조로 바꿀 때 2차 후보로 검토합니다.

GitHub Pages는 공개 저장소 문서 호스팅에는 적합하지만, 현재 Next.js App Router와 MDX RSC 구조를 그대로 쓰기에는 배포 전환 비용이 더 큽니다. 지금은 Vercel을 우선합니다.

## 배포 전 확인

```bash
npm run validate
npm run check:links
npm run check:viewport
```

확인할 URL:

- `/`
- `/level`
- `/roadmap`
- `/learn`
- `/learn/dram-basics`
- `/learn/hbm-ai-memory`
- `/learn/euv-dram-scaling`
- `/glossary`
- `/sources`
- `/industry`
- `/practice`
- `/study`
- `/robots.txt`
- `/sitemap.xml`

## GitHub 공개 정리

- 저장소 About에 한 줄 설명을 넣습니다.
  - `기초부터 실무 관점까지 읽는 반도체 오픈소스 문서`
- Website에 production URL을 넣습니다.
- Topics를 추가합니다.
  - `semiconductor`
  - `education`
  - `korean`
  - `nextjs`
  - `mdx`
  - `open-source`
  - `dram`
  - `hbm`
  - `euv`
- `v0.1.0` GitHub Release를 생성합니다.
- README 상단에 production URL을 추가합니다.

## 1차 홍보 문구

더 긴 채널별 문구는 [홍보 패키지](promotion-pack.md)에 정리합니다.

```txt
반도체를 처음 배우는 사람도 DRAM, HBM, EUV를 실무 관점까지 이해할 수 있도록 오픈소스 문서를 만들고 있습니다.

Toss Frontend Fundamentals처럼 기준 있는 기술 문서로 발전시키는 것이 목표입니다. 공식 기술 자료를 그대로 옮기지 않고, 초보자도 읽을 수 있는 설명과 현업에서 보는 trade-off를 함께 정리합니다.
```

## 홍보 채널

| 채널 | 메시지 |
| --- | --- |
| GitHub | 오픈소스 문서, 기여 환영, 공식 출처 기반 |
| LinkedIn | 기술 문서화, 반도체 지식 구조화, 포트폴리오 |
| Velog/Tistory | 제작기, 설계 기준, MVP 회고 |
| 커리어리 | 취업 준비생과 실무 관점 학습자 대상 |
| 디스콰이엇 | 오픈소스 교육 프로젝트 소개 |

## 공개 후 바로 볼 지표

- README에서 배포 링크 클릭이 가능한가
- 모바일 360px에서 첫 화면과 글 상세가 읽히는가
- GitHub Issues로 오탈자나 글 제안을 받을 수 있는가
- 공식 출처 링크가 깨지지 않는가
- 첫 방문자가 `/level`, `/learn`, `/roadmap` 중 하나를 바로 고를 수 있는가

## 1차 완료 기준

- `main` production 배포 URL이 생깁니다.
- README와 GitHub About에 production URL이 들어갑니다.
- `v0.1.0` Release가 만들어집니다.
- `/robots.txt`와 `/sitemap.xml`이 응답합니다.
- 홍보 글 1개 이상을 외부 채널에 게시할 수 있는 문구가 준비됩니다.
