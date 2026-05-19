export type Category =
  | "Recent"
  | "Learnings"
  | "Concept"
  | "Interviews"
  | "Experience"
  | "Life Lessons";

export interface BlogPost {
  slug: string;
  title: string;
  tagline: string;
  category: Category;
  date: string;
  readTime: string;
  views: number;
  thumbnail: string;
  content: string;
}

export const categories: Category[] = [
  "Recent",
  "Learnings",
  "Concept",
  "Interviews",
  "Experience",
  "Life Lessons",
];
