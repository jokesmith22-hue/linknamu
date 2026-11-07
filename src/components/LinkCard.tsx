"use client";

type Props = {
  id: string;
  title: string;
  url: string;
  emoji?: string;
  clicks?: number;
};

function recordClick(id: string) {
  const body = JSON.stringify({ id });
  // 새 탭으로 이동해도 요청이 끊기지 않도록 sendBeacon 우선 사용
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/click", new Blob([body], { type: "application/json" }));
  } else {
    fetch("/api/click", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } });
  }
}

export default function LinkCard({ id, title, url, emoji, clicks }: Props) {
  // mailto: 같은 링크는 새 탭을 열면 빈 탭만 남으므로 웹 주소일 때만 새 탭으로 엽니다.
  const isWeb = url.startsWith("http");

  return (
    <a
      href={url}
      target={isWeb ? "_blank" : undefined}
      rel={isWeb ? "noopener noreferrer" : undefined}
      onClick={() => recordClick(id)}
      // 글래스모피즘: 반투명 흰 배경 + 배경 흐림 + 밝은 테두리 + 위쪽 안쪽 하이라이트
      // 호버는 배경이 조금 더 불투명해지고 그림자가 살짝 짙어지는 정도로만
      className="relative flex h-[60px] w-full items-center justify-center rounded-[22px] border border-white/70 bg-white/40 px-16 text-[15px] font-semibold text-stone-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_24px_-14px_rgba(160,80,30,0.35)] backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow] duration-200 ease-out hover:bg-white/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_28px_-14px_rgba(160,80,30,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
    >
      {emoji && (
        <span
          aria-hidden="true"
          className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 text-lg shadow-[0_1px_2px_rgba(160,80,30,0.08)]"
        >
          {emoji}
        </span>
      )}
      {title}
      {clicks !== undefined && (
        <span className="absolute right-5 text-xs font-normal tabular-nums text-stone-400">
          {clicks.toLocaleString()}회
        </span>
      )}
    </a>
  );
}
