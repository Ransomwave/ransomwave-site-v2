"use client";

import ProjectCard from "@/components/project-card";

export default function OtherProjectsPage() {
  return (
    <>
      <h1 className="text-[100%] md:text-[1.2vw] mb-[2%] text-center">
        OTHER PROJECTS
      </h1>

      <p className="leading-5 md:text-[.9em] text-center mx-auto">
        A collection of my non-game projects, including open-source repositories
        and web applications.
      </p>

      <div className="flex flex-row items-stretch flex-wrap justify-center mt-4 gap-4">
        {/* <ProjectCard
          title="Project 1"
          description="Description for Project 1"
          technologies={["React", "Node.js", "CSS"]}
          githubUrl="https://github.com/user/project1"
          liveUrl="https://project1.example.com"
        /> */}

        <ProjectCard
          title="Azul"
          description="Azul is a two-way synchronization tool between Roblox Studio and your local filesystem. "
          technologies={["TypeScript", "Node.js", "Luau"]}
          githubUrl="https://github.com/Ransomwave/azul"
          imageUrl="/images/projects/azul-logo.png"
        />

        <ProjectCard
          title="ransomwave.games"
          description="Source code for this website. Features a custom API to fetch Roblox game stats."
          technologies={[
            "Next.js",
            "TailwindCSS",
            "TypeScript",
            "Vercel",
            "ExpressJS",
          ]}
          githubUrl="https://github.com/Ransomwave/ransomwave-site-v2"
          liveUrl="https://ransomwave.games"
          imageUrl="/images/projects/ransomwave-logo.png"
        />

        <ProjectCard
          title="Roblox Stream Donations"
          description="An ExpressJS server that dynamically alerts of Robux donations donations to an OBS Web source, with support for Donation messages, TTS, & more! (Similar to Streamlabs alerts)"
          technologies={["HTML", "JS", "ExpressJS", "Luau"]}
          githubUrl="https://github.com/Ransomwave/Roblox-Stream-Donations"
        />

        <ProjectCard
          title="Bacon Man (Bot)"
          description="Bacon Man is a Discord bot built using Nextcord that provides various features including game stats retrieval, starboard functionality, attachment limit enforcement, & more. I created this bot to manage my own Discord server."
          technologies={["Python", "Discord.py", "Nextcord"]}
          githubUrl="https://github.com/Ransomwave/bacon-man-bot"
        />

        <ProjectCard
          title="Aseprite Extrude Tool"
          description="Aseprite script to extrude tilesets and reduce texture bleeding on game engines. Originally made as a web app by @sergiss, ported to Aseprite Lua by me."
          technologies={["Lua"]}
          githubUrl="https://github.com/Ransomwave/aseprite-extrude-tool"
        />
      </div>
    </>
  );
}
