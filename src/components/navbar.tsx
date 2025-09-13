"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-center items-center p-4 gap-4 text-white">
      <Link
        href="/"
        className="font-bold hover:text-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
      >
        home
      </Link>
      <Link
        href="/games"
        className="font-bold hover:text-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
      >
        games
      </Link>
      <Link
        href="/other-projects"
        className="font-bold hover:text-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
      >
        other projects
      </Link>
      <Link
        href="/blog"
        className="font-bold hover:text-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
      >
        blog
      </Link>
    </div>
  );
}
