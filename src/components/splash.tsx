"use client";

import { useEffect, useState } from "react";

const splashWords = [
  "Welcome!",
  "Everchanging!",
  "This is the rarest splash text. Lucky!",
  "I'll miss you, Neocities",
  "I <3 the web",
  "Coded using Next.js!",
  "Coded with magic!",
  "Minecraft enjoyer.",
  '"One of the websites of all time" -IGN',
  "Sub to my YouTube!",
  "Play my games!",
  "Follow my socials!",
  "This is the best landing page. Change my mind.",
  // "My real name is\n[REDACTED]",
  // "My social security number is\n[REDACTED]",
  // "My credit card number is \n[REDACTED]",
  "[REDACTED]",
  "Probably an alien",
  "Probably an extraterrestrial being",
  // "IT'S PIZZA TIME!!",
  "Shout out to my buddies:\nto, too and two",
  "Shout out to my buddies:\ntheir, there and they're",
  "Minecraft?",
  "Terraria?",
  "Roblox?",
  "????????????????",
  "Made with <3!",
  "Splash text inspired by Minecraft!",
  "Now with a GOOD codebase!",
  "how_to_make_good_website.mp4",
  "Now with ASCII art!",
  // "* But nobody came.",
  // "* have you ever heard of a talking flower?",
  "* It's you!",
  "* Despite everything, it's still you.",
  // "* NOW'S YOUR CHANCE TO BE A [[BIG SHOT]]!!",
  "* [[Hyperlink Blocked]]",
  "Join my group!",
  "Website built on hopes and dreams",
  "Every copy of this website is personalized",
  "Join the Discord!",
];

const bdaySplashes = ["Bring out le cake!!", "Guess who got 1 year older"];
const foolSplashes = ["APRIL FOOLS!!"];
const octoberSplashes = [
  "BOO!",
  "Spooky!",
  "It is the spooky month!",
  "2spooky4me",
];
const givethankSplashes = [
  'The "worst" holiday!',
  "Happy Thanksgiving!",
  "Happy Givesthanking! ...wait.",
  "Turkey's not as good as chicken lol",
];
const snowySplashes = [
  "Merry Christmas!!",
  "Happy Chrimas!",
  "Happy Holidays!",
  "¡Feliz Navidad!",
  "No Bed of Roses for you!",
  "Christmas is a corporate invention!",
  "Happy birthday, Jesus!",
];
const newyearSplash = ["Happy New Year!", "World's ending today!"];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getSplash(): string {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;

  if (day === 25 && month === 4) {
    return randomItem(bdaySplashes);
  } else if (day === 1 && month === 4) {
    return randomItem(foolSplashes);
  } else if (month === 10) {
    return randomItem(octoberSplashes);
  } else if (month === 11 && day === 28) {
    return randomItem(givethankSplashes);
  } else if (month === 12 && (day === 18 || day === 25)) {
    return randomItem(snowySplashes);
  } else if (month === 1 && day === 1) {
    return randomItem(newyearSplash);
  }

  return randomItem(splashWords);
}

export default function SplashText() {
  const [splash, setSplash] = useState<string>("");

  useEffect(() => {
    setSplash(getSplash());
  }, []);

  return (
    <>
      <div className="rotate-[-10deg]">
        <p className="absolute text-yellow-300 ml-[60%] text-[100%] text-shadow-[3px_3px_#070700] text-center animate-[pop_0.58s_infinite] whitespace-pre-line font-[minecraft]">
          {splash}
        </p>
      </div>
    </>
  );
}
