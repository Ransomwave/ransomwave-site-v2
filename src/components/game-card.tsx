"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

interface GameCardProps {
  title: string;
  link: string;
  description?: string;
  placeId?: string;
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

const GameCard = ({ title, link, placeId, description }: GameCardProps) => {
  const [robloxData, setRobloxData] = useState<RobloxGameData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract place ID from Roblox URL if not provided
  const extractPlaceId = (url: string): string | null => {
    if (placeId) return placeId;

    const robloxMatch = url.match(/roblox\.com\/games\/(\d+)/);
    return robloxMatch ? robloxMatch[1] : null;
  };

  useEffect(() => {
    const gameId = extractPlaceId(link);

    if (gameId && link.includes("roblox.com")) {
      setLoading(true);
      setError(null);

      fetch(`/api/roblox/game/${gameId}`)
        .then((response) => {
          return response.json();
        })
        .then((data: RobloxGameData) => {
          if (data.error) {
            console.warn("API returned with error:", data.error);
            setError(data.error);
          }
          setRobloxData(data);
        })
        .catch((err) => {
          console.error("Error fetching Roblox data:", err);
          setError("Failed to load game data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [link, placeId]);

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
    <div className="border border-[#ffffff62] bg-[rgba(0,0,0,0.3)] backdrop-blur-xs rounded-md shadow-[black_0_0_15px] p-4 lg:w-[40%] md:w-[60%] max-w-[100%] text-center relative">
      {/* Game Thumbnail */}
      <div className="relative pb-[5%]">
        <Image
          src={
            displayData.thumbnailUrl ||
            "/images/game-assets/thumbnail-placeholder.jpg"
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
            Error
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

      <div className="mt-auto">
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm text-red-500 hover:underline transition-colors hover:text-red-400"
        >
          Play Now
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
