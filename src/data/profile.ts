export type LinkItem = {
  id: string;
  title: string;
  url: string;
  emoji?: string;
};

export type Profile = {
  name: string;
  bio: string;
  image: string;
  links: LinkItem[];
};

// ⚠️ 보여주기용 더미 값입니다. 나중에 실제 내용으로 바꾸세요.
export const profile: Profile = {
  name: "제노팝",
  bio: "AI다루는 정형외과 의사| AI개발에 관심이 많아요",
  // 안경 + 푸른 수술모자를 쓴 정형외과 의사 일러스트 (public/profile-doctor.svg)
  image: "/profile-doctor.svg",
  links: [
    { id: "github", emoji: "🐙", title: "깃허브", url: "https://github.com/jokesmith22-hue" },
    { id: "blog", emoji: "📓", title: "블로그", url: "https://blog.naver.com/jokesmith22" },
    { id: "email", emoji: "📬", title: "이메일", url: "mailto:jokesmith22@naver.com" },
  ],
};
