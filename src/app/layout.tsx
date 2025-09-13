import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";

// Components
import BackgroundLayer from "@/components/background";
import AsciiBanner from "@/components/ascii-banner";
import Navbar from "@/components/navbar";
import Socials from "@/components/socials";
import QueryProvider from "@/components/query-provider";

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
        <link rel="icon" type="image/svg" href="/fav.ico" />
      </head>

      {/* Actual content */}
      <body className={`text-lg antialiased dark `}>
        <QueryProvider>
          <BackgroundLayer />

          <div className="w-[90%] sm:w-[55%] sm:max-w-[1300px] md:mt-[10%] relative mx-auto">
            <AsciiBanner />
            <Navbar />
            <div className="border-1 border-[#ffffff62] bg-[rgba(0,0,0,0.3)] backdrop-blur-xs rounded-md shadow-[black_0_0_15px] p-4 sm:p-8">
              {children}
              <Socials />
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
