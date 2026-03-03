import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import SyntaxHighlighter from "react-syntax-highlighter";
import { irBlack } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ImageGrid from "@/components/image-grid";

const postsDirectory = path.join(process.cwd(), "src", "content", "blog");

interface BlogFrontmatter {
  title?: string;
  description?: string;
  date?: string;
  thumbnailUrl?: string;
}

const mdxComponents = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h1 className="mt-6 mb-3 text-2xl " {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-6 text-xl text-gray-400" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-6 mb-3 text-lg" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mb-4 leading-7" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="list-disc list-inside mb-4" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="list-decimal list-inside mb-4" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => <li className="mb-2" {...props} />,
  a: (props: React.ComponentProps<"a">) => (
    <a className="text-red-500 underline" target="_blank" {...props} />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code className="bg-[rgba(0,0,0,0.7)] px-1 py-0.5 rounded" {...props} />
  ),
  pre: (props: React.ComponentProps<"pre"> & { children?: any }) => {
    const className = props.children?.props?.className || "";
    const language = className.replace("language-", "") || "text";
    const code = props.children?.props?.children || "";

    return (
      <SyntaxHighlighter
        style={irBlack}
        language={language}
        showLineNumbers={true}
        wrapLongLines={true}
        customStyle={{
          backgroundColor: "rgba(0,0,0,0.7)",
          borderRadius: "0.375rem",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        {String(code)}
      </SyntaxHighlighter>
    );
  },
  img: (props: React.ComponentProps<"img">) => (
    <>
      <img
        className="mb-1 rounded-md shadow-md w-auto h-auto max-w-sm md:max-w-xl lg:max-w-2xl mx-auto"
        {...props}
      />
      {props.alt ? (
        <span className="block text-center text-sm text-gray-400 mb-3 italic">
          {props.alt}
        </span>
      ) : null}
    </>
  ),
  ImageGrid,
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-4 border-gray-500 pl-4 italic text-gray-400 my-4"
      {...props}
    />
  ),
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return {
      title: "Blog Post - Ransomwave's Games",
      description: "Read the latest blog post from Ransomwave's Games.",
    };
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { frontmatter } = await compileMDX<BlogFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
  });

  return {
    title: `${frontmatter.title ?? "Blog Post"} - Blog`,
    description:
      frontmatter.description ??
      "Read the latest blog post from Ransomwave's Games.",
  };
}

export async function generateStaticParams() {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory);

  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { content: renderedContent, frontmatter } =
    await compileMDX<BlogFrontmatter>({
      source,
      options: {
        parseFrontmatter: true,
      },
      components: mdxComponents,
    });

  return (
    <article>
      <h1 className="text-center md:text-[1.2vw] mb-[1%]">
        {frontmatter.title ?? "Untitled"}
      </h1>
      <p className="text-center md:text-[1vw] mb-[2%]">
        {frontmatter.date ?? "Undated"}
      </p>
      <div className="mx-[5%]">{renderedContent}</div>
    </article>
  );
}
