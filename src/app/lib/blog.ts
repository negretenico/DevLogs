// src/app/lib/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  readingTime: number;
  author?: string;
  ogImage?: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
  author?: string;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function generateExcerpt(content: string, excerpt?: string): string {
  if (excerpt) return excerpt;

  // Remove markdown syntax for better excerpts
  const plainText = content
    .replace(/^#+\s+/gm, "") // Remove headers
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
    .replace(/\*(.*?)\*/g, "$1") // Remove italic
    .replace(/`([^`]+)`/g, "$1") // Remove inline code
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links but keep text
    .trim();

  return plainText.length > 160
    ? plainText.substring(0, 160).replace(/\s+\S*$/, "") + "..."
    : plainText;
}

export function getAllPostSlugs(): string[] {
  // Create posts directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    try {
      fs.mkdirSync(postsDirectory, { recursive: true });
      console.log("Created posts directory");
    } catch (error) {
      console.error("Error creating posts directory:", error);
    }
    return [];
  }

  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => fileName.replace(/\.md$/, ""));
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
}

export function getPostBySlug(slug: string): PostData {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    // Ensure date is properly formatted
    let postDate = data.date;
    if (postDate) {
      // Handle various date formats
      if (postDate instanceof Date) {
        postDate = postDate.toISOString().split("T")[0];
      } else if (typeof postDate === "string") {
        // Try to parse and reformat the date
        try {
          const parsedDate = new Date(postDate);
          if (!isNaN(parsedDate.getTime())) {
            postDate = parsedDate.toISOString().split("T")[0];
          }
        } catch (e) {
          console.warn(`Invalid date format for post ${slug}:`, postDate);
          postDate = new Date().toISOString().split("T")[0];
        }
      }
    } else {
      postDate = new Date().toISOString().split("T")[0];
    }

    // Ensure tags is always an array
    let tags = data.tags || [];
    if (typeof tags === "string") {
      tags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    } else if (!Array.isArray(tags)) {
      tags = [];
    }

    return {
      slug,
      title: data.title || "Untitled",
      date: postDate,
      excerpt: generateExcerpt(content, data.excerpt),
      content,
      tags,
      readingTime: calculateReadingTime(content),
      author: data.author,
      ogImage: data.ogImage,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    throw new Error(`Failed to load post: ${slug}`);
  }
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => {
      try {
        const post = getPostBySlug(slug);
        return {
          slug: post.slug,
          title: post.title,
          date: post.date,
          excerpt: post.excerpt,
          tags: post.tags,
          readingTime: post.readingTime,
          author: post.author,
        } as PostMeta;
      } catch (error) {
        console.error(`Error loading post ${slug}:`, error);
        return null;
      }
    })
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getLatestPosts(): PostMeta[] {
  const posts = getAllPosts();
  return posts.slice(0, 5);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const allTags = posts.flatMap((post) => post.tags);
  const uniqueTags = Array.from(new Set(allTags))
    .filter((tag) => tag && tag.trim().length > 0) // Filter out empty tags
    .sort();

  console.log("All tags found:", uniqueTags); // Debug log
  return uniqueTags;
}

export function getPostsByTag(tag: string): PostMeta[] {
  const posts = getAllPosts();
  const filteredPosts = posts.filter((post) =>
    post.tags.some((postTag) => postTag?.toLowerCase() === tag?.toLowerCase())
  );

  console.log(`Posts for tag "${tag}":`, filteredPosts.length); // Debug log
  return filteredPosts;
}

export async function markdownToHtml(markdown: string): Promise<string> {
  try {
    const result = await remark()
      .use(html, { sanitize: false })
      .process(markdown);
    return result.toString();
  } catch (error) {
    console.error("Error converting markdown to HTML:", error);
    throw new Error("Failed to process markdown content");
  }
}

// Utility function to check if posts directory exists and has posts
export function getPostsStatus() {
  const exists = fs.existsSync(postsDirectory);
  const slugs = exists ? getAllPostSlugs() : [];

  return {
    directoryExists: exists,
    postCount: slugs.length,
    posts: slugs,
  };
}
