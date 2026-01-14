import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const postsDirectory = path.join(process.cwd(), "src", "content", "blog");

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
  const { data } = matter(source);

  return {
    title: `${data.title} - Blog`,
    description:
      data.description ?? "Read the latest blog post from Ransomwave's Games.",
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
    li: (props: React.ComponentProps<"li">) => (
      <li className="mb-2" {...props} />
    ),
    a: (props: React.ComponentProps<"a">) => (
      <a className="text-red-500 underline" target="_blank" {...props} />
    ),
    code: (props: React.ComponentProps<"code">) => (
      <code
        className="bg-[rgba(0,0,0,0.4)] px-1 py-0.6 rounded font-mono"
        {...props}
      />
    ),
    img: (props: React.ComponentProps<"img">) => (
      <div className="flex justify-center max-h-[1000px]">
        <img className="my-4 rounded-md shadow-md object-contain" {...props} />
      </div>
    ),
  };

  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);

  return (
    <article>
      <h1 className="text-center md:text-[1.2vw] mb-[1%]">{data.title}</h1>
      <p className="text-center md:text-[1vw] mb-[2%]">{data.date}</p>
      <div className="mx-[5%]">
        <MDXRemote source={content} components={mdxComponents} />
      </div>
    </article>
  );
}
