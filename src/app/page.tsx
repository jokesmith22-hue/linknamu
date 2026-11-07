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
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-4 py-16">
      {/* ①②③ 프로필 */}
      <ProfileHeader
        name={profile.name}
        bio={profile.bio}
        image={profile.image}
      />

      {/* ④ 링크 카드 목록 */}
      <ul className="mt-10 flex w-full flex-col gap-4">
        {profile.links.map((link) => (
          <li key={link.id}>
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
