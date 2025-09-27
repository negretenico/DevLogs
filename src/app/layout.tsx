import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DevLogs",
    template: "%s | DevLogs",
  },
  description: "Technical writings and development insights",
  keywords: [
    "development",
    "programming",
    "technical writing",
    "software engineering",
  ],
  authors: [{ name: "Nicholas Negrete" }],
  creator: "Nicholas Negrete",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://negretenico.github.io/DevLogs",
    title: "DevLogs",
    description: "Technical writings and development insights",
    siteName: "DevLogs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevLogs",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
