import fs from "fs";
import path from "path";
import { Category, BlogPost } from "./blog-types";

export async function getAllPosts(): Promise<BlogPost[]> {
  const postsDir = path.join(process.cwd(), "content/blogs");
  if (!fs.existsSync(postsDir)) {
    return [];
  }
  const files = fs.readdirSync(postsDir);
  const posts: BlogPost[] = [];
  
  for (const file of files) {
    if (file.endsWith(".json")) {
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      try {
        posts.push(JSON.parse(content));
      } catch (e) {
        console.error("Failed to parse JSON for", file, e);
      }
    }
  }
  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getPostsByCategory(category: Category): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  if (category === "Recent") {
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  return posts.filter((post) => post.category === category);
}
