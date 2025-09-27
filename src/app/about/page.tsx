import type { Metadata } from "next";
import Layout from "@/app/components/Layout";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about DevLogs and the author",
};

export default function About() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1>About DevLogs</h1>
        <p>
          Welcome to DevLogs, where I share my technical writings, development
          insights, and lessons learned from building software.
        </p>
        <p>
          This blog is built with Next.js 14 using the App Router, styled with
          Tailwind CSS, and deployed automatically to GitHub Pages whenever new
          content is pushed.
        </p>
        <h2>What You'll Find Here</h2>
        <ul>
          <li>Technical tutorials and guides</li>
          <li>Development best practices</li>
          <li>Lessons learned from real projects</li>
          <li>Tool reviews and recommendations</li>
        </ul>
      </div>
    </Layout>
  );
}
