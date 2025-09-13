import GameCard from "@/components/game-card";

export default function Games() {
  return (
    <>
      <h1 className="text-[100%] md:text-[1.2vw] mb-[2%] text-center">
        MY GAMES
      </h1>
      <p className="leading-5 md:text-[.9em] text-center mx-auto">
        A collection of all my published Roblox games. Click on a game to play!
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
          description="Test your luck by rolling for unique countries with varying rarities. I made this game to test my abilities and create a scalable project featuring lots of Server & Client communication as well as robust UI."
        />
        <GameCard
          title="Steal a SOUL"
          link="https://www.roblox.com/games/127603676641718/"
          description='Game inspired by "Steal a Brainrot", where you have to Steal a Deltarune or Undertale character.'
        />
        <GameCard
          title="TTRE"
          link="https://www.roblox.com/games/3196621022/"
        />
        <GameCard
          title="MAD CAROUSEL"
          link="https://www.roblox.com/games/70527455113620/"
        />
      </div>
    </>
  );
}
