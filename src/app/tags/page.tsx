import type { Metadata } from "next";
import Layout from "@/app/components/Layout";
import { getAllTags, getPostsByTag } from "@/app/lib/blog";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Tags",
  description: "Browse posts by tags",
};

const Tag = ({ tag, count }: any) => {
  return (
    <Link
      key={tag}
      href={`/tags/${tag}`}
      className="bg-blue-100 text-blue-800 text-center px-4 py-2 rounded-full hover:bg-blue-200 transition-colors"
    >
      #{tag} ({count})
    </Link>
  );
};

export default async function Tags() {
  const tags = getAllTags();
  const tagsWithCounts = tags.map((tag) => ({
    tag,
    count: getPostsByTag(tag).length,
  }));

  return (
    <Layout>
      <div className="w-full min-w-full">
        <div className="space-y-4">
          <div className="border-b border-gray-600 pb-2 min-w-full w-full">
            <p className="text-3xl font-bold text-gray-800 pt-2">Tags</p>
          </div>
          <div className="flex flex-row gap-2 w-full">
            {tagsWithCounts.map((t) => (
              <Tag key={t.tag} {...t} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
