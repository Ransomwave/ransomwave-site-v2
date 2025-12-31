"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";

interface GameCardProps {
  title: string;
  link: string;
  description?: string;
  placeId?: string;
  githubUrl?: string;
}

interface RobloxGameData {
  id: number;
  name: string;
  description: string;
  visits: number;
  activePlayers: number;
  favoritedCount: number;
  thumbnailUrl: string | null;
  iconUrl: string | null;
  placeId: string;
  universeId: number;
  creator: any;
  maxPlayers: number;
  created: string;
  updated: string;
  genre: string;
  error?: string;
}

const GameCard = ({
  title,
  link,
  placeId,
  description,
  githubUrl,
}: GameCardProps) => {
  // Extract place ID from Roblox URL if not provided
  const extractPlaceId = (url: string): string | null => {
    if (placeId) return placeId;
    const robloxMatch = url.match(/roblox\.com\/games\/(\d+)/);
    return robloxMatch ? robloxMatch[1] : null;
  };

  const gameId = extractPlaceId(link);
  const isRobloxGame = gameId && link.includes("roblox.com");

  // Fetch Roblox data using React Query
  const {
    data: robloxData,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["roblox-game", gameId],
    queryFn: async (): Promise<RobloxGameData> => {
      const response = await fetch(`/api/roblox/game/${gameId}`);
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    },
    enabled: !!isRobloxGame, // Only run query if it's a Roblox game
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  const formatNumber = (num: number): string => {
    // if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
    // if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    // if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toLocaleString();
    // return num.toString();
  };

  const displayData = robloxData
    ? {
        ...robloxData,
        // Use explicit description if provided, otherwise use API description
        description: description || robloxData.description,
      }
    : {
        name: title,
        description: description || "",
        visits: 0,
        activePlayers: 0,
        thumbnailUrl: null,
        iconUrl: null,
      };

  return (
    <div className="border border-[#ffffff62] bg-[rgba(0,0,0,0.3)] backdrop-blur-xs rounded-md shadow-[black_0_0_15px] p-4 lg:w-[40%] md:w-[60%] max-w-[100%] text-center relative flex flex-col">
      {/* Game Thumbnail */}
      <div className="relative pb-[5%]">
        <Image
          src={
            displayData.thumbnailUrl ||
            "/images/game-assets/thumbnail-placeholder.webp"
          }
          alt={displayData.name}
          width={500}
          height={300}
          className="w-[80%] h-auto rounded-md mx-auto"
          priority={false}
        />
        {/* Game Icon Overlay */}
        {displayData.iconUrl && (
          <div className="absolute bottom-[1%] left-[5%]">
            <Image
              src={displayData.iconUrl}
              alt={`${displayData.name} icon`}
              width={70}
              height={70}
              className="rounded-md w-[70%] drop-shadow-[0_0_5px_black]"
            />
          </div>
        )}
      </div>

      {/* Stats Overlay */}
      <div className="absolute top-[7%] left-[17%] drop-shadow-[0_0_2px_black] select-none">
        {loading ? (
          <div className="text-sm drop-shadow-[0_0_2px_black]">Loading...</div>
        ) : error ? (
          <div className="text-sm text-red-400 drop-shadow-[0_0_2px_black]">
            Error loading stats
          </div>
        ) : (
          <>
            {/* Active Players */}
            <div className="flex items-center gap-2 mb-1">
              <Icon
                icon="ri:user-3-line"
                className="drop-shadow-[0_0_2px_black]"
              />
              <span className="text-sm font-medium drop-shadow-[0_0_2px_black]">
                {formatNumber(displayData.activePlayers)}
              </span>
            </div>

            {/* Total Visits */}
            <div className="flex items-center gap-2">
              <Icon
                icon="ri:play-large-line"
                className="drop-shadow-[0_0_2px_black]"
              />
              <span className="text-sm font-medium drop-shadow-[0_0_2px_black]">
                {formatNumber(displayData.visits)}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Game Info */}
      <h2 className="text-lg font-semibold mb-2">{displayData.name}</h2>
      <p className="text-sm w-[100%] mb-4 text-gray-300 line-clamp-4">
        {displayData.description || "No description available."}
      </p>

      {/* Buttons */}
      <div className="mt-auto flex gap-2">
        {link && (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-sm transition-colors bg-[rgba(255,255,255,0.1)] rounded-md p-2 py-3 hover:bg-[rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
          >
            <Icon icon="ri:play-large-fill" className="mx-auto" />
          </Link>
        )}
        {githubUrl && (
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-sm transition-colors bg-[rgba(255,255,255,0.1)] rounded-md p-2 py-3 hover:bg-[rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
          >
            <Icon icon="ri:github-fill" />
            <span>GitHub</span>
          </Link>
        )}
        {!githubUrl && !link && (
          <div className="flex-1 text-sm bg-[rgba(255,255,255,0.1)] rounded-md p-2 py-3 text-gray-400 flex items-center justify-center gap-2">
            <Icon icon="ri:github-fill" />
            <span>Check out code</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;
