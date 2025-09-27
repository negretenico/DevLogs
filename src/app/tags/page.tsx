import type { Metadata } from "next";
import Layout from "@/app/components/Layout";
import { getAllTags, getPostsByTag } from "@/app/lib/blog";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse posts by tags",
};

export default async function Tags() {
  const tags = getAllTags();
  const tagsWithCounts = tags.map((tag) => ({
    tag,
    count: getPostsByTag(tag).length,
  }));

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Tags</h1>
        <div className="flex flex-wrap gap-3">
          {tagsWithCounts.map(({ tag, count }) => (
            <a
              key={tag}
              href={`/tags/${tag}`}
              className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors"
            >
              #{tag} ({count})
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
}
