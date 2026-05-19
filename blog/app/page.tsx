import { getAllPosts } from "@/lib/blog-data";
import BlogListClient from "./BlogListClient";

export default async function Home() {
  const posts = await getAllPosts();
  return <BlogListClient allPosts={posts} />;
}
