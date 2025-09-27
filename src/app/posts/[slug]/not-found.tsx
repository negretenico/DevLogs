import { Metadata } from "next";
import Link from "next/link";
import Layout from "@/app/components/Layout";

export const metadata: Metadata = {
  title: "Post Not Found",
  description: "The requested post could not be found.",
};

export default function NotFound() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Post Not Found</h1>
          <p className="text-gray-600 text-lg">
            The post you're looking for doesn't exist. It may have been moved or
            deleted.
          </p>
        </div>

        <div className="space-x-4">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Back to Posts
          </Link>
          <Link
            href="/tags"
            className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Browse by Tags
          </Link>
        </div>

        <div className="text-6xl text-gray-300 font-bold">404</div>
      </div>
    </Layout>
  );
}
