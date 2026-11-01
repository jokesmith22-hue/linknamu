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
  name: "김도현",
  bio: "AI를 다루는 정형외과 의사",
  image: "/profile.svg", // public/ 에 실제 사진을 넣고 경로를 바꾸세요
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/your-id" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/in/your-id" },
    { id: "blog", title: "Blog", url: "https://your-blog.example.com" },
  ],
};
