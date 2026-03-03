import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

const postsDirectory = path.join(process.cwd(), "src", "content", "blog");

interface BlogPostMeta {
  slug: string;
  title?: string;
  description?: string;
  date?: string;
  thumbnailUrl?: string;
}

export async function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    fileNames.map(async (file): Promise<BlogPostMeta> => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, file);
      const source = fs.readFileSync(fullPath, "utf8");
      const { frontmatter } = await compileMDX<Omit<BlogPostMeta, "slug">>({
        source,
        options: {
          parseFrontmatter: true,
        },
      });

      return {
        slug,
        ...frontmatter,
      };
    }),
  );

  // Sort newest first; undated posts go last
  return posts.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
