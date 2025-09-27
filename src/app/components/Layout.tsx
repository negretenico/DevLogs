import { ReactNode } from "react";
import Link from "next/link";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link
              prefetch
              href="/"
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              DevLogs
            </Link>
            <div className="flex space-x-8">
              <Link
                prefetch
                href="/posts"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Posts
              </Link>
              <Link
                prefetch
                href="/about"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <Link
                prefetch
                href="/tags"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Tags
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {children}
      </main>

      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>
              &copy; 2025 DevLogs. Built with Next.js and deployed on GitHub
              Pages.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
