export type LinkItem = {
  id: string;
  title: string;
  url: string;
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
  bio: "AI다루는 정형외과 의사| 요즘에는 AI개발에 관심이 많아요",
  // 표시 크기(176px)에 맞춘 placeholder. next/image 최적화를 위해 PNG로 요청
  image: "https://placehold.co/176x176/orange/white/png",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/your-id" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/in/your-id" },
    { id: "blog", title: "Blog", url: "https://your-blog.example.com" },
  ],
};
