import GameCard from "@/components/game-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Games",
  description:
    "A collection of all my published Roblox games. Click on a game to play!",
};

export default function Games() {
  return (
    <>
      <h1 className="text-[100%] md:text-[1.2vw] text-center">MY GAMES</h1>
      <p className="leading-5 md:text-[.9em] text-center mx-auto">
        A collection of all my published games. Click on a game to play!
      </p>

      <h2 className="text-[100%] md:text-[1.2vw] mt-[2%] text-center">
        Ransomwave's Games
      </h2>
      <p className="leading-5 md:text-[.9em] text-center mx-auto px-[5%]">
        Published under "Ransomwave's Games", these are games made primarely
        from passion. From story-driven adventures to experimental game
        mechanics, these are some of my best and most popular.
      </p>
      <div className="flex flex-row items-stretch flex-wrap justify-center mt-4 gap-4">
        <GameCard
          title="get a drink at 3 am"
          link="https://www.roblox.com/games/8197423034/"
          placeId="8197423034"
        />
        <GameCard
          title="The Guide of The Realm: Reimagined"
          link="https://www.roblox.com/games/105011289253000/"
          description="The Guide Of The Realm (TGOTR) is a story adventure game that has been lost media since its removal in 2018. This is a reimagining of that game."
        />
        <GameCard
          title="World RNG"
          link="https://www.roblox.com/games/17745004956/"
          description="Test your luck by rolling for unique countries with varying rarities. I made this game to test my abilities and create a scalable project."
        />
        <GameCard
          title="TTRE"
          link="https://www.roblox.com/games/3196621022/"
        />
        <GameCard
          title="COMPLEX"
          link="https://www.roblox.com/games/85925579614336"
          description="An immersive exploration, platformer & horror narrative experience made in just 3 days. My solo submission for the RDC 2025.
 "
        />
      </div>

      <h2 className="text-[100%] md:text-[1.2vw] mt-[2%] text-center">
        Windows 93
      </h2>
      <p className="leading-5 md:text-[.9em] text-center mx-auto px-[5%]">
        WINDOWS 93 is my secondary publishing outlet. Here, I publish scalable,
        widely-appealing games that are easy to pick up and play.
      </p>
      <div className="flex flex-row items-stretch flex-wrap justify-center mt-4 gap-4">
        <GameCard
          title="MAD CAROUSEL"
          link="https://www.roblox.com/games/70527455113620/"
          githubUrl="https://github.com/Ransomwave/mad-carousel"
        />
        <GameCard
          title="Steal a SOUL"
          link="https://www.roblox.com/games/127603676641718/"
          description='Game inspired by "Steal a Brainrot", where you have to Steal a Deltarune or Undertale character.'
        />
      </div>
    </>
  );
}
