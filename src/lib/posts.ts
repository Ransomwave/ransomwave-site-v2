import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src", "content", "blog");
console.log("Posts directory:", postsDirectory);

interface BlogPostMeta {
  slug: string;
  title?: string;
  description?: string;
  date?: string;
  thumbnailUrl?: string;
}

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map<BlogPostMeta>((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, file);
    const content = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(content);

    return {
      slug,
      ...data,
    };
  });

  // Sort newest first; undated posts go last
  return posts.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
