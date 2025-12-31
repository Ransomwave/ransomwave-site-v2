import BlogCard from "@/components/blog-card";
import { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog - Ransomwave's Games",
  description:
    "Welcome to my blog! Read about my latest updates, dev insights, projects, and more!",
};

export default function BlogIndex() {
  const blogPosts = getAllPosts();

  return (
    <div className="text-center">
      <h1 className="text-[100%] md:text-[1.2vw] mb-[2%] text-center">Blog</h1>
      {blogPosts.map((post) => (
        <BlogCard
          key={post.slug}
          title={post.title || post.slug}
          imageUrl={post.thumbnailUrl || ""}
          description={post.description || ""}
          date={post.date || "Undated"}
          link={`/blog/${post.slug}`}
        />
      ))}
    </div>
  );
}
