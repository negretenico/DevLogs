import format from "@/app/lib/format";
import Image from "next/image";
import Layout from "@/app/components/Layout";
import { getLatestPosts } from "@/app/lib/blog";
import { Posts } from "@/app/components/Posts";

import Link from "next/link";
const Header = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <Image
        src={"/thinking.png"}
        height={256}
        width={256}
        alt="thinking"
        priority
      />
      <div className="text-center space-y-4 ">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          DevLogs
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          I’m a Software Engineer passionate about distributed systems, but I
          also ❤️ React and TypeScript — the perfect balance of backend power
          and frontend creativity.
        </p>
      </div>
    </div>
  );
};

export default async function Home() {
  const posts = getLatestPosts();
  return (
    <Layout>
      <div className="space-y-12">
        <Header />
        <div>
          <p className="text-gray-600 text-lg">
            Welcome to my personal blog 📚, where I write about the technologies
            I love — from frontend frameworks like React and TypeScript to
            backend tools like Spring Boot. I also share thoughts on building
            scalable, reliable software systems and the lessons I pick up along
            the way.
          </p>
        </div>
        <div className="space-y-8">
          <div className="border-b border-gray-600 pb-2">
            <p className="text-lg font-semibold">Latest Posts</p>
          </div>
          <Posts posts={posts} />
        </div>
      </div>
    </Layout>
  );
}
