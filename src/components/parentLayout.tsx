"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function ParentLayout({
  backTitle = "",
  children,
}: any) {
  const router = useRouter();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        {!!backTitle && <button onClick={() => router.back()} className="text-xs">{backTitle}</button>}
        {children}
      </main>
      <footer className="text-xs row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <span>© {new Date().getFullYear()} lol™</span>
        <span>All Rights Reserved (I guess).</span>
        <span>Powered by hope, caffeine, and way too many console logs.</span>
      </footer>
    </div>
  );
}
