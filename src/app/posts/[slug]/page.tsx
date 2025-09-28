import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Layout from "@/app/components/Layout";
import { getAllPostSlugs, getPostBySlug, markdownToHtml } from "@/app/lib/blog";
import format from "@/app/lib/format";
import Link from "next/link";
interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      images: post.ogImage ? [post.ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.ogImage ? [post.ogImage] : undefined,
    },
  };
}

export default async function Post({ params }: Props) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch (e) {
    notFound();
  }
  const contentHtml = await markdownToHtml(post.content);

  return (
    <Layout>
      <article className="max-w-3xl mx-auto">
        <header className="space-y-6 mb-8">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to posts
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
            <time dateTime={post.date}>{format(new Date(post.date))}</time>
            <span>•</span>
            <span>{post.readingTime} min read</span>
            {post.author && (
              <>
                <span>•</span>
                <span>by {post.author}</span>
              </>
            )}
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-900 prose-pre:text-gray-100"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <footer className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to posts
            </Link>
          </div>
        </footer>
      </article>
    </Layout>
  );
}
