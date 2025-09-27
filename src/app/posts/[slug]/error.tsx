"use client";
import Layout from "@/app/components/Layout";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Post caused error",
};
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Something went wrong!
          </h1>
          <p className="text-gray-600 text-lg">
            We encountered an error while loading this post.
          </p>
        </div>

        <div className="space-x-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Go Home
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 p-4 bg-red-50 rounded-lg text-left">
            <summary className="cursor-pointer text-red-800 font-medium">
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 text-sm text-red-700 overflow-auto">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </Layout>
  );
}
