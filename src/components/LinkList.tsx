"use client";

import { useEffect, useRef, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Props = {
  links: LinkItem[];
};

function recordClick(id: string) {
  const body = JSON.stringify({ id });
  // 새 탭으로 이동해도 요청이 끊기지 않도록 sendBeacon 우선 사용
  if (navigator.sendBeacon?.("/api/click", new Blob([body], { type: "application/json" }))) {
    return;
  }
  fetch("/api/click", {
    method: "POST",
    body,
    keepalive: true,
    headers: { "Content-Type": "application/json" },
  }).catch(() => {});
}

export default function LinkList({ links }: Props) {
  // 데이터를 받기 전에는 모두 0회로 시작
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(links.map((l) => [l.id, 0])),
  );
  // 서버 값이 도착하기 전에 누른 클릭은 따로 세어 두었다가 서버 값에 더해 줍니다.
  const pendingClicks = useRef<Record<string, number>>({});

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져오기
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/click", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Record<string, number>) => {
        const pending = pendingClicks.current;
        pendingClicks.current = {};
        setCounts(
          Object.fromEntries(
            links.map((l) => [l.id, (data[l.id] ?? 0) + (pending[l.id] ?? 0)]),
          ),
        );
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error("클릭 수 불러오기 실패:", err);
      })
      .finally(() => {
        pendingClicks.current = {};
      });
    return () => controller.abort();
  }, [links]);

  function handleClick(id: string) {
    recordClick(id);
    // 화면에는 바로 +1 반영
    pendingClicks.current[id] = (pendingClicks.current[id] ?? 0) + 1;
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  return (
    <ul className="mt-11 flex w-full flex-col gap-4">
      {links.map((link, i) => (
        <li
          key={link.id}
          className="animate-rise"
          style={{ animationDelay: `${120 + i * 70}ms` }}
        >
          <LinkCard
            title={link.title}
            url={link.url}
            emoji={link.emoji}
            clicks={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
