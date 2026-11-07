import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 외부 프로필 이미지(placehold.co)를 next/image로 불러오기 위한 허용 목록
    remotePatterns: [{ protocol: "https", hostname: "placehold.co" }],
  },
};

export default nextConfig;
