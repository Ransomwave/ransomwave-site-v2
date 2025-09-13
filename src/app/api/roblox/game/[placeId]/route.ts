import { NextRequest, NextResponse } from "next/server";

// In-memory cache for development (use Redis/external cache in production)
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

export async function GET(
  request: NextRequest,
  { params }: { params: { placeId: string } }
) {
  const { placeId } = params;

  // Check cache first
  const cacheKey = `roblox-game-${placeId}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    console.log(`Returning cached data for placeId: ${placeId}`);
    return NextResponse.json(cachedData.data, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
      },
    });
  }

  try {
    console.log(`Fetching fresh data for placeId: ${placeId}`);

    // Get universe ID from place ID
    const universeResponse = await fetch(
      `https://apis.roblox.com/universes/v1/places/${placeId}/universe`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      }
    );

    console.log(`Universe response status: ${universeResponse.status}`);

    if (!universeResponse.ok) {
      const errorText = await universeResponse.text();
      console.error("Universe API error:", errorText);
      throw new Error(
        `Failed to fetch universe data: ${universeResponse.status}`
      );
    }

    const universeData = await universeResponse.json();
    console.log("Universe data:", universeData);

    if (!universeData.universeId) {
      throw new Error("No universe ID found");
    }

    const universeId = universeData.universeId;

    // Fetch game details using a more reliable endpoint
    const gameResponse = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${universeId}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      }
    );

    console.log(`Game response status: ${gameResponse.status}`);

    if (!gameResponse.ok) {
      const errorText = await gameResponse.text();
      console.error("Game API error:", errorText);

      // Try alternative API endpoint
      const altGameResponse = await fetch(
        `https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeId}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        }
      );

      if (altGameResponse.ok) {
        const altGameData = await altGameResponse.json();
        console.log("Alternative game data:", altGameData);

        if (altGameData && altGameData.length > 0) {
          const game = altGameData[0];

          // Fetch thumbnails separately - using correct endpoint for main game image
          let thumbnail = null;
          try {
            const thumbnailResponse = await fetch(
              `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&size=768x432&format=Png&isCircular=false`
            );

            if (thumbnailResponse.ok) {
              const thumbnailData = await thumbnailResponse.json();
              thumbnail =
                thumbnailData.data?.[0]?.thumbnails?.[0]?.imageUrl || null;
            }

            // Fallback to place icon if thumbnail fails
            if (!thumbnail) {
              const iconResponse = await fetch(
                `https://thumbnails.roblox.com/v1/places/gameicons?placeIds=${placeId}&size=512x512&format=Png&isCircular=false`
              );

              if (iconResponse.ok) {
                const iconData = await iconResponse.json();
                thumbnail = iconData.data?.[0]?.imageUrl || null;
              }
            }
          } catch (error) {
            console.warn("Failed to fetch thumbnail:", error);
          }
          const result = {
            id: parseInt(placeId),
            name: game.name || "Unknown Game",
            description: game.description || "No description available",
            visits: game.placeVisits || 0,
            activePlayers: game.playersOnline || 0,
            favoritedCount: 0,
            thumbnailUrl: thumbnail,
            iconUrl: thumbnail, // Use thumbnail as icon fallback
            placeId: placeId,
            universeId: universeId,
            creator: game.builder || null,
            maxPlayers: game.maxPlayers || 0,
            created: game.created || null,
            updated: game.updated || null,
            genre: "Unknown",
          };

          return NextResponse.json(result);
        }
      }

      throw new Error(`Failed to fetch game data: ${gameResponse.status}`);
    }

    const gameData = await gameResponse.json();
    console.log("Game data:", gameData);

    if (!gameData.data || gameData.data.length === 0) {
      throw new Error("No game data found");
    }

    const game = gameData.data[0];

    // Fetch game thumbnail (main game image) - using correct endpoint
    let thumbnail = null;
    try {
      const thumbnailResponse = await fetch(
        `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&size=768x432&format=Png&isCircular=false`
      );

      if (thumbnailResponse.ok) {
        const thumbnailData = await thumbnailResponse.json();
        thumbnail = thumbnailData.data?.[0]?.thumbnails?.[0]?.imageUrl || null;
      }

      // Fallback to place thumbnail if universe thumbnail fails
      if (!thumbnail) {
        const placeThumbnailResponse = await fetch(
          `https://thumbnails.roblox.com/v1/places/gameicons?placeIds=${placeId}&size=512x512&format=Png&isCircular=false`
        );

        if (placeThumbnailResponse.ok) {
          const placeThumbnailData = await placeThumbnailResponse.json();
          thumbnail = placeThumbnailData.data?.[0]?.imageUrl || null;
        }
      }
    } catch (thumbError) {
      console.warn("Failed to fetch thumbnail:", thumbError);
    }

    // Fetch game icon (with error handling)
    let icon = null;
    try {
      const iconResponse = await fetch(
        `https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`
      );

      if (iconResponse.ok) {
        const iconData = await iconResponse.json();
        icon = iconData.data?.[0]?.imageUrl || null;
      }
    } catch (iconError) {
      console.warn("Failed to fetch icon:", iconError);
    }

    const result = {
      id: game.id,
      name: game.name,
      description: game.description,
      visits: game.visits,
      activePlayers: game.playing,
      favoritedCount: game.favoritedCount,
      thumbnailUrl: thumbnail,
      iconUrl: icon,
      placeId: placeId,
      universeId: universeId,
      creator: game.creator,
      maxPlayers: game.maxPlayers,
      created: game.created,
      updated: game.updated,
      genre: game.genre,
    };

    // Cache the successful result
    cache.set(cacheKey, { data: result, timestamp: Date.now() });

    console.log("Final result:", result);
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Error fetching Roblox data:", error);

    // Return fallback data instead of error
    const fallbackResult = {
      id: parseInt(placeId),
      name: "Game",
      description: "Unable to load game description",
      visits: 0,
      activePlayers: 0,
      favoritedCount: 0,
      thumbnailUrl: null,
      iconUrl: null,
      placeId: placeId,
      universeId: 0,
      creator: null,
      maxPlayers: 0,
      created: null,
      updated: null,
      genre: "Unknown",
      error: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(fallbackResult);
  }
}
