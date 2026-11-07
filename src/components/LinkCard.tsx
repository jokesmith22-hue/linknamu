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
      className="relative block w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-emerald-500 active:translate-y-0"
    >
      {emoji && (
        <span aria-hidden="true" className="mr-2">
          {emoji}
        </span>
      )}
      {title}
      {clicks !== undefined && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-normal text-stone-400">
          {clicks.toLocaleString()}회
        </span>
      )}
    </a>
  );
}
