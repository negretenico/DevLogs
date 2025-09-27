import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Layout from "@/app/layout";
import { getAllTags, getPostsByTag } from "@/app/lib/blog";
import format from "@/app/lib/format";

interface Props {
  params: { tag: string };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const posts = getPostsByTag(params.tag);

  if (posts.length === 0) {
    return {
      title: "Tag Not Found",
    };
  }

  return {
    title: `Posts tagged "${params.tag}"`,
    description: `All posts tagged with ${params.tag}`,
  };
}

export default async function TagPage({ params }: Props) {
  const posts = getPostsByTag(params.tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="space-y-4">
          <a
            href="/tags"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← All tags
          </a>
          <h1 className="text-4xl font-bold text-gray-900">
            Posts tagged "{params.tag}"
          </h1>
          <p className="text-gray-600">
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border-b border-gray-200 pb-8 last:border-b-0"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <time dateTime={post.date}>
                    {format(new Date(post.date))}
                  </time>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  <a href={`/posts/${post.slug}`}>{post.title}</a>
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
