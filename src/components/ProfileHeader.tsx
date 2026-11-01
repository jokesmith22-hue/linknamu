import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image: string;
};

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={image}
        alt={`${name} 프로필 사진`}
        width={176}
        height={176}
        priority
        className="h-44 w-44 rounded-full border-4 border-white object-cover shadow-md"
      />
      <h1 className="mt-5 text-2xl font-bold">{name}</h1>
      <p className="mt-2 text-base text-stone-600">{bio}</p>
    </header>
  );
}
