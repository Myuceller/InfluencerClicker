# Clout Clicker

한국어 기반 인플루언서 풍자 방치형 클리커 게임입니다.

## Play

Production build:

```text
https://influencer-clicker.vercel.app
```

Current core loop:

```text
콘텐츠 탭
→ 좋아요 증가
→ 팔로워 증가
→ 수익화
→ 업그레이드로 더 많은 좋아요 생산
```

## Feedback

초기 피드백에서는 아래를 중점적으로 확인합니다.

- 모바일에서 한 손으로 플레이하기 편한가?
- 숫자가 올라가는 감각이 충분한가?
- 업그레이드를 샀을 때 변화가 보이는가?
- 언제 지루해지는가?
- 어떤 설명이 부족한가?

피드백 모집은 공개 출시보다 작은 테스트 그룹에서 먼저 진행합니다.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand
- Framer Motion
- Prisma
- PostgreSQL
- Auth.js

## Local Setup

```bash
cp .env.example .env.local
docker compose up -d
npm install
npm run db:migrate:dev
npm run dev
```

기본 로컬 URL은 `http://localhost:3000`입니다.

## Environment Variables

```env
DATABASE_URL=
AUTH_SECRET=
AUTH_URL=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_KAKAO_ID=
AUTH_KAKAO_SECRET=
```

- `AUTH_URL`
  - 로컬: `http://localhost:3000`
  - 운영: 배포된 실제 도메인
- `AUTH_SECRET`
  - 긴 랜덤 문자열을 사용합니다.

로컬 환경변수 누락 여부는 값 출력 없이 키 이름만 검사합니다.

```bash
npm run env:check
```

## OAuth Callback URLs

로컬 개발:

```text
http://localhost:3000/api/auth/callback/google
http://localhost:3000/api/auth/callback/kakao
```

운영 배포:

```text
https://YOUR_DOMAIN/api/auth/callback/google
https://YOUR_DOMAIN/api/auth/callback/kakao
```

Google과 Kakao OAuth 콘솔에는 로컬 URL과 운영 URL을 모두 등록합니다.

## Deployment

권장 조합:

- App: Vercel
- Database: Prisma Postgres 또는 다른 managed PostgreSQL

운영 배포 순서:

1. Vercel 프로젝트를 생성하고 저장소를 연결합니다.
2. Vercel Environment Variables에 위 환경변수를 등록합니다.
3. 운영 DB에 마이그레이션을 적용합니다.

```bash
npm run db:migrate:deploy
```

4. 배포 도메인을 확인한 뒤 `AUTH_URL`을 운영 URL로 설정합니다.
5. Google / Kakao OAuth 앱에 운영 콜백 URL을 등록합니다.

`postinstall`에서 `prisma generate`를 실행하므로 배포 환경에서도 Prisma Client가 생성됩니다.

## Roadmap

See [ROADMAP.md](./ROADMAP.md).
