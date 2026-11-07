import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image: string;
};

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex animate-rise flex-col items-center text-center">
      {/* 위는 밝고 아래는 살짝 어두운 테두리 + 겹친 그림자로 은은한 입체감 */}
      <div className="relative rounded-full bg-gradient-to-b from-white to-orange-100 p-[5px] shadow-[0_20px_40px_-18px_rgba(160,80,30,0.5),0_4px_12px_-4px_rgba(160,80,30,0.18)]">
        <Image
          src={image}
          alt={`${name} 프로필 사진`}
          width={116}
          height={116}
          priority
          className="h-[116px] w-[116px] rounded-full object-cover"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[5px] rounded-full shadow-[inset_0_-8px_16px_rgba(120,60,20,0.10),inset_0_2px_2px_rgba(255,255,255,0.7)]"
        />
      </div>
      <h1 className="mt-7 text-[22px] font-bold tracking-tight text-stone-900">
        {name}
      </h1>
      <p className="mt-2 max-w-[18rem] text-[15px] leading-relaxed text-balance text-stone-500">
        {bio}
      </p>
    </header>
  );
}
