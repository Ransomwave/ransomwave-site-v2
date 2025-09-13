import AsciiBanner from "@/components/ascii-banner";
import ProfilePicture from "@/components/pfp";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-[100%] md:text-[1.2vw] mb-[2%] text-center">
        WELCOME TO RANSOMWAVE.GAMES!
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-[10%]">
        {" "}
        {/* This is a flexbox */}
        <p className="w-[95%] sm:w-[60%] leading-5 md:text-[.9em]">
          I'm <b>Ransomwave</b>, an indie game developer with ~4 years
          experience in Lua/Luau, developing mostly for Roblox.
          <br />
          <br />
          You may recognize me work from the singleplayer game{" "}
          <b>get a drink at 3 am</b>
          , my solo project which has amassed over 70,000,000 plays on Roblox.
          <br />
          <br />
          Although I've mostly found success in game development, I also enjoy
          programming in general. In my free time, I like to work on small
          projects & learn new things.
          <br />
          <br />
          Check out my{" "}
          <Link className="underline" href="/games">
            games
          </Link>
          ,{" "}
          <Link className="underline" href="/projects">
            non-game projects
          </Link>
          , & more!
          <br />
          <br />
        </p>
        <ProfilePicture />
      </div>
    </>
  );
}
