"use client";

import Image from "next/image";

export default function BackgroundLayer() {
  return (
    <>
      {/* Animated background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-cover bg-[url('/images/bg/bg.webp')] animate-[bg-scroll_5s_linear_infinite]" />

      {/* Top overlay */}
      <Image
        src="/images/bg/top.webp"
        alt="Top Black Bar"
        width={1920}
        height={1080}
        className="fixed top-0 left-0 w-full -z-10 hidden md:block"
        priority
      />

      {/* Bottom overlay */}
      <Image
        src="/images/bg/bottom.webp"
        alt="Bottom Black Bar"
        width={1920}
        height={1080}
        className="fixed bottom-0 left-0 w-full -z-10 hidden md:block"
        priority
      />
    </>
  );
}
