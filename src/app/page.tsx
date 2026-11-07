import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";
import { getClickCounts } from "@/lib/mongodb";

// 클릭 수를 매 요청마다 새로 읽어옵니다.
export const dynamic = "force-dynamic";

// wireframe.png 구조:
//   ① 원형 프로필 사진  ② 이름  ③ 한 줄 소개
//   ④ 링크 카드 3개 (세로 배치)
export default async function Home() {
  const counts = await getClickCounts();
  const dbEnabled = Boolean(process.env.MONGODB_URI);

  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col items-center px-7 pt-20 pb-20 sm:px-8 sm:pt-24">
      {/* 글래스 카드 뒤에서 은은하게 비치는 따뜻한 빛 번짐 (장식용) */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[38%] -left-24 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl" />
        <div className="absolute top-[55%] -right-20 h-80 w-80 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute -top-24 left-1/2 h-64 w-[28rem] -translate-x-1/2 rounded-full bg-amber-100/70 blur-3xl" />
      </div>

      {/* ①②③ 프로필 */}
      <ProfileHeader
        name={profile.name}
        bio={profile.bio}
        image={profile.image}
      />

      {/* ④ 링크 카드 목록 */}
      <ul className="mt-11 flex w-full flex-col gap-4">
        {profile.links.map((link, i) => (
          <li
            key={link.id}
            className="animate-rise"
            style={{ animationDelay: `${120 + i * 70}ms` }}
          >
            <LinkCard
              id={link.id}
              title={link.title}
              url={link.url}
              emoji={link.emoji}
              clicks={dbEnabled ? counts[link.id] ?? 0 : undefined}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
