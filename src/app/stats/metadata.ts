import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistics | DOMination",
  description: "Track your DOMination progress with detailed statistics, performance metrics, and visual analytics",
  openGraph: {
    title: "DOMination Statistics",
    description: "View your DOMination performance metrics, challenge completion stats, and progress over time",
    images: [
      {
        url: "/screenshots/stats.png",
        width: 1200,
        height: 630,
        alt: "DOMination Statistics Dashboard"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "DOMination Statistics",
    description: "Track your DOMination progress with detailed statistics and analytics",
    images: ["/screenshots/stats.png"]
  }
};
