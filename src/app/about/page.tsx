import type { Metadata } from "next";
import Layout from "@/app/components/Layout";
import { PropsWithChildren } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
export const metadata: Metadata = {
  title: "About",
  description: "Learn more about DevLogs and the author",
};

export default function About() {
  return (
    <Layout>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800 pt-2">About DevLogs</h1>
        <p className="text-gray-600 text-lg">
          Welcome to DevLogs, where I share my technical writings, development
          insights, and lessons learned from building software.
        </p>
        <div className="border-b-2 border-gray-200 my-6"></div>
        <Header text="Technologies used">
          <p className="text-gray-600 text-lg">
            This blog is built with
            <Link
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
              href="https://nextjs.org/docs/app/api-reference/components/link"
            >
              {" "}
              Next.js 15 using the App Router
            </Link>
            , styled with
            <Link
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
              href="https://tailwindcss.com/docs/installation/using-vite"
            >
              Tailwind CSS
            </Link>
            , and deployed automatically to
            <Link
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
              href="https://docs.github.com/en/pages"
            >
              {" "}
              GitHub Pages{" "}
            </Link>
            whenever new content is pushed.
          </p>
        </Header>
        <Header text="What You'll Find Here">
          <ul className="text-gray-600 text-lg">
            <li>
              <span className="animate-pulse text-green-400">✅</span>{" "}
              Development best practices
            </li>
            <li>
              <span className="animate-pulse text-white-400">📖</span> Lessons
              learned from real projects
            </li>
            <li>
              <span className="animate-pulse text-grey-400">🛠️</span> Tool
              reviews and recommendations
            </li>
            <li>
              <span className="animate-pulse text-red-400">🚀</span> Tips for
              faster development
            </li>
          </ul>
        </Header>
      </div>
    </Layout>
  );
}
