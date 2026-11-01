# 링크나무

내 모든 링크를 한 페이지에 모아 두고, 하나의 URL로 공유하는 Link in Bio 서비스입니다.

## 기술 스택
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- MongoDB Atlas (링크 클릭 수 저장)
- Vercel (배포)

## 시작하기

```bash
npm install
cp .env.local.example .env.local   # MONGODB_URI 값 채우기 (선택)
npm run dev
```

http://localhost:3000 에서 확인합니다.

## 스크립트
| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |

## 내 정보 바꾸기
- 이름, 소개, 링크: `src/data/profile.ts`
- 프로필 사진: `public/` 에 이미지를 넣고 `profile.ts`의 `image` 경로 수정

## 폴더 구조
```
src/
  app/
    page.tsx            메인 페이지
    layout.tsx          공통 레이아웃
    api/click/route.ts  클릭 수 기록 API
  components/           화면 컴포넌트
  data/profile.ts       프로필·링크 데이터
  lib/mongodb.ts        MongoDB 연결
```

## 환경 변수
`.env.local` 에 저장하며 절대 커밋하지 않습니다. `MONGODB_URI`가 없으면 클릭 수 기록 없이 페이지만 동작합니다.
