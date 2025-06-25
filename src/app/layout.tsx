import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";

// Components
import BackgroundLayer from "@/components/background";
import AsciiBanner from "@/components/ascii-banner";
import Navbar from "@/components/navbar";

const epilogueFont = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ransomwave's Games",
  description:
    "Welcome to my website! Check out Ransomwave's portfolio, Roblox games, community, projects & more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark max-w-screen overflow-x-hidden" lang="en">
      <head>
        {/* <meta
          name="keywords"
          content="Ransomwave, Ransomwave's Games, Roblox, Ransomwave Roblox, Ransomwave Games, gada3, get a drink at 3 am"
        />
        <meta name="robots" content="index, follow" /> */}
      </head>

      {/* Actual content */}
      <body className={`${epilogueFont.variable} text-lg antialiased dark `}>
        <BackgroundLayer />

        <div className="w-[90%] sm:w-[60%] md:mt-[10%] relative mx-auto">
          <AsciiBanner />
          <Navbar />
          <div className=""></div>
          {children}
        </div>
      </body>
    </html>
  );
}
