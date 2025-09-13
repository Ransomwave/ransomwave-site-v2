"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  technologies = [],
  githubUrl,
  liveUrl,
}) => {
  return (
    <div className="border border-[#ffffff62] bg-[rgba(0,0,0,0.3)] backdrop-blur-xs rounded-md shadow-[black_0_0_15px] p-4 lg:w-[40%] md:w-[60%] max-w-[100%] text-center relative flex flex-col h-[500px]">
      {/* Project Image */}
      <div className="relative pb-[5%]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={500}
            height={300}
            className="w-[80%] h-auto rounded-md mx-auto"
            priority={false}
          />
        ) : (
          <div className="w-[80%] h-48 mx-auto bg-[rgba(255,255,255,0.1)] rounded-md flex items-center justify-center">
            <Icon icon="ri:code-box-line" className="text-6xl text-gray-400" />
          </div>
        )}
      </div>

      {/* Project Info */}
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm w-[100%] mb-4 text-gray-300 line-clamp-4">
        {description || "No description available."}
      </p>

      {/* Technologies */}
      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-[rgba(255,255,255,0.1)] text-white text-xs rounded-full border border-[#ffffff30]"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-auto flex gap-2">
        {githubUrl && (
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-sm transition-colors bg-[rgba(255,255,255,0.1)] rounded-md p-2 py-3 hover:bg-[rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
          >
            <Icon icon="ri:github-fill" />
            <span>GitHub</span>
          </Link>
        )}
        {liveUrl && (
          <Link
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-sm transition-colors bg-[rgba(255,255,255,0.1)] rounded-md p-2 py-3 hover:bg-[rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
          >
            <Icon icon="ri:external-link-line" />
            <span>Live URL</span>
          </Link>
        )}
        {!githubUrl && !liveUrl && (
          <div className="flex-1 text-sm bg-[rgba(255,255,255,0.1)] rounded-md p-2 py-3 text-gray-400 flex items-center justify-center gap-2">
            <Icon icon="ri:github-fill" />
            <span>Check out code</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
