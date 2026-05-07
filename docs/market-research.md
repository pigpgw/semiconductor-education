# 시장 조사 기반 설계 보완

조사 기준일: 2026-05-07

## 조사 요약

반도체 교육 콘텐츠는 크게 네 부류로 나뉩니다.

- `Khan Academy`, `Brilliant` 계열: 쉬운 진입, 자기 속도, 레벨 기반 진행, 짧은 상호작용이 강합니다.
- `SEMI University`, `Coursera`, `K-MOOC` 계열: 온라인 접근성은 좋지만 강좌 단위라 긴 호흡과 선수지식 부담이 있습니다.
- `Samsung Semiconductor`, `SK hynix Newsroom`: 최신 산업 키워드와 제품 맥락이 강하지만 초보자에게는 배경 설명이 부족할 수 있습니다.
- `Semiconductor Engineering`, `All About Circuits`: 기술 깊이는 좋지만 비전공자와 전연령 학습자가 바로 읽기에는 용어 밀도가 높습니다.

따라서 이 프로젝트의 포지션은 “무료로 접근 가능한 한국어 반도체 교재 + 레벨 진단 + 공식 산업 자료를 풀어주는 해설”입니다.

## 최근 시장 신호

- SEMI University는 반도체 산업 종사자, 기술자, 엔지니어, 비기술 인력까지 포함하는 온라인 교육 플랫폼을 운영하며, 2025년에 Purdue University와 AI·데이터 분석 온라인 과정을 발표했습니다. 이는 반도체 교육이 단순 소자 이론을 넘어 AI, 데이터, 제조 분석까지 확장되고 있음을 보여줍니다.
- Samsung Semiconductor의 DRAM/HBM/EUV 공식 페이지는 메모리 제품을 AI 인프라, 고성능 컴퓨팅, 미세화, 생산성 관점으로 설명합니다. 이 프로젝트는 이 내용을 초보자가 읽을 수 있도록 배경지식과 비교표로 풀어야 합니다.
- SK하이닉스 뉴스룸은 2025년 HBM4, GTC 2025, CES 2025 자료에서 HBM, eSSD, CXL, SOCAMM, PIM 등 AI 메모리 포트폴리오를 강조했습니다. 따라서 HBM 하나만 설명하지 않고 AI 데이터센터 메모리 생태계로 확장해야 합니다.
- 국내외에서 반도체 전문 인력 교육 수요가 계속 강조되고 있습니다. 이 프로젝트는 장비 실습을 대체한다고 주장하지 않고, 오프라인 교육에 가기 전 필요한 개념 지도와 공식 자료 해석력을 제공하는 포지션을 잡습니다.

## 기획 인사이트

1. 학습자는 “반도체가 중요하다”보다 “내가 어디서부터 읽어야 하는지”를 먼저 필요로 합니다.
2. 기술 자료는 최신일수록 홍보 문구와 제품 스펙이 많아지므로, 교육 사이트는 주장과 근거를 분리해야 합니다.
3. HBM, EUV, AI 메모리는 한 기업의 제품이 아니라 시스템 병목, 공정 한계, 패키징 난이도와 연결해야 실무 느낌이 납니다.
4. 지역 학습자에게 필요한 것은 로그인 서비스가 아니라, 무료 공개 자료를 따라갈 수 있는 지도와 반복 학습 장치입니다.
5. 포트폴리오 관점에서는 예쁜 웹보다 “복잡한 기술을 사용자 레벨에 맞게 재구성한 설계 능력”이 더 강한 증거가 됩니다.

## 제품 설계 반영

- 첫 방문자는 `/level`에서 8개 질문으로 현재 수준을 파악합니다.
- 레벨은 `기초`, `중급`, `심화` 3단계로 제한해 선택 부담을 낮춥니다.
- 같은 주제라도 읽는 깊이를 다르게 안내합니다.
- 지방이나 오프라인 교육 접근이 어려운 학습자를 위해 선수지식, 용어, 체크 질문, 공식 출처를 글 안에 포함합니다.
- 실무 레벨은 단순 제품 홍보가 아니라 병목, 트레이드오프, 양산성, 수율, 패키징, 고객 검증 기준까지 다룹니다.
- 홈과 글 상세에서는 기술 다이어그램을 먼저 보여 주되, 장식이 아니라 학습할 구조의 예고편으로 사용합니다.
- 시장 변화가 빠른 주제는 글의 `updatedAt`과 출처 확인일을 함께 관리합니다.

## 참고한 사례

- Khan Academy: 자기 속도 학습과 이해 공백을 먼저 채우는 개인화 학습을 강조합니다. https://www.khanacademy.org/video
- Brilliant: 나이와 배경이 다른 학습자를 위해 레벨 기반, 짧은 상호작용, 개념 클릭 경험을 강조합니다. https://brilliant.org/smartereveryday/
- SEMI University: 반도체 제조·전자 산업을 위한 온라인 전문 교육 카탈로그를 제공합니다. https://www.semi.org/en/semi-university
- SEMI/Purdue AI and Data Analysis Courses: 반도체 교육이 AI, 데이터 분석, 제조 분석까지 확장되는 흐름을 보여줍니다. https://www.semi.org/en/semi-press-releases/semi-and-purdue-university-launch-ai-and-data-analysis-online-courses
- Coursera Semiconductor Devices: 고급 수준 강좌는 대학 수준 수학·물리·전기전자 기초를 선수지식으로 둡니다. https://www.coursera.org/specializations/semiconductor-devices
- K-MOOC 반도체 공정 입문: 한국어 온라인 강좌로 웨이퍼, 클리닝, 포토리소그래피, 증착, 식각을 다룹니다. https://www.kmooc.kr/view/course/detail/9988
- Samsung Semiconductor HBM/EUV/DRAM 자료: 최신 제품과 기술 흐름의 공식 근거로 사용합니다. https://semiconductor.samsung.com/kr/dram/hbm/
- SK hynix Newsroom HBM/HBF/AI Memory 자료: AI 메모리와 시스템 병목 관점을 보강하는 공식 근거로 사용합니다. https://news.skhynix.co.kr/
- Semiconductor Engineering Knowledge Center: EUV, 리소그래피, 첨단 공정 이슈를 심화 참고 자료로 사용합니다. https://semiengineering.com/knowledge-center/
- All About Circuits: DRAM, MOSFET 등 전자회로 기초를 기술적으로 풀어내는 참고 구조로 사용합니다. https://www.allaboutcircuits.com/technical-articles/introduction-to-dram-dynamic-random-access-memory/
