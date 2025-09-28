import format from "@/app/lib/format";
import Image from "next/image";
import Layout from "@/app/components/Layout";
import { getAllPosts } from "@/app/lib/blog";
import Link from "next/link";
import { Posts } from "@/app/components/Posts";

export default async function Home() {
  const posts = getAllPosts();
  return (
    <Layout>
      <div className="space-y-12">
        <div className="space-y-8">
          <div className="border-b border-gray-600 pb-2">
            <p className="text-3xl font-bold text-gray-800 pt-2">All Posts</p>
          </div>
          <Posts posts={posts} />
        </div>
      </div>
    </Layout>
  );
}
