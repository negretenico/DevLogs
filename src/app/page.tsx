import format from "@/app/lib/format";
import Image from "next/image";
import Layout from "@/app/components/Layout";
import { getLatestPosts } from "@/app/lib/blog";
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
const PostsComponent = ({ posts }: any) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">
          No posts yet. Add your first markdown file to the{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">posts/</code>{" "}
          directory!
        </p>
      </div>
    );
  }
  return posts.map((post) => (
    <article
      key={post.slug}
      className="border-b border-gray-200 pb-8 last:border-b-0"
    >
      <div className="space-y-3">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
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

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          <Link prefetch href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed">{post.excerpt}</p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                prefetch
                key={tag}
                href={`/tags/${tag}`}
                className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        <div className="pt-2">
          <Link
            prefetch
            href={`/posts/${post.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  ));
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
          <PostsComponent posts={posts} />
        </div>
      </div>
    </Layout>
  );
}
