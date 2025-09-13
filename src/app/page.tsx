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
          I'm <b>Ransomwave</b>, a small but passionate indie game developer
          based in Spain.
          <br />
          <br />
          You may recognize me from the singleplayer game{" "}
          <b>get a drink at 3 am</b>
          , my solo project which has amassed over 70,000,000 plays on Roblox.
          <br />
          <br />
          I enjoy programming in general. In my free time, I like to work on
          small projects & learn new things.
          <br />
          <br />
          Check out my{" "}
          <Link className="underline font-bold" href="/games">
            games
          </Link>
          ,{" "}
          <Link className="underline font-bold" href="/other-projects">
            projects
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
