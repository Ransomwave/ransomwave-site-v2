"use client";

import SplashText from "./splash";

export default function AsciiBanner() {
  return (
    <div className="text-center text-[1.5vw] mt-10 max-[640px]:text-[3vw]">
      <pre className="text-center bg-clip-text inline-flex text-[70%]/[1.3] max-w-full overflow-hidden bg-gradient-to-r from-red-700 via-red-700 to-red-50 bg-[length:180%_180%] text-transparent animate-[gradient-animation_2s_ease_infinite] drop-shadow-[2px_2px_5px_black]">
        <span className="font-extrabold select-none">
          {`   ___  ___   _  __________  __  ____      _____ _   ______
  / _ \\/ _ | / |/ / __/ __ \\/  |/  / | /| / / _ | | / / __/
 / , _/ __ |/    /\\ \\/ /_/ / /|_/ /| |/ |/ / __ | |/ / _/  
/_/|_/_/ |_/_/|_/___/\\____/_/  /_/ |__/|__/_/ |_|___/___/  `}
        </span>
      </pre>

      <SplashText />
    </div>
  );
}
