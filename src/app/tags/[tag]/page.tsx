import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Layout from "@/app/components/Layout";
import { getAllTags, getPostsByTag } from "@/app/lib/blog";
import { Posts } from "@/app/components/Posts";
import Header from "@/app/components/Header";

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
      <div className="space-y-8 pt-2">
        <div className="space-y-4">
          <Header text={`Posts tagged "${params.tag}"`}>
            <p className="text-gray-600">
              {posts.length} post{posts.length !== 1 ? "s" : ""}
            </p>
          </Header>
        </div>

        <div className="space-y-8">
          <Posts posts={posts} />
        </div>
      </div>
    </Layout>
  );
}
