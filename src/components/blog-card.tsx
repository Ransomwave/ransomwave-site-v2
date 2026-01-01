"use client";

import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  title: string;
  link: string;
  description: string;
  imageUrl?: string;
  date: string;
}

export default function BlogCard({
  title,
  link,
  description,
  imageUrl,
  date,
}: BlogCardProps) {
  return (
    <div className="border border-[#ffffff62] bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(23,23,23,0.3)] backdrop-blur-xs rounded-md shadow-[black_0_0_15px] overflow-hidden mb-5">
      <Link href={link} className="">
        {imageUrl && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4 flex flex-col h-full">
          <h2 className="text-xl mb-2 text-white">{title}</h2>
          <p className="text-sm text-gray-300 mb-4 flex-grow">{description}</p>
          <p className="text-xs text-gray-400 mt-auto">
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </Link>
    </div>
  );
}
