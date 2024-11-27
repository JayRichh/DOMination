import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistics | CSS Battle",
  description: "Track your CSS Battle progress with detailed statistics, performance metrics, and visual analytics",
  openGraph: {
    title: "CSS Battle Statistics",
    description: "View your CSS Battle performance metrics, challenge completion stats, and progress over time",
    images: [
      {
        url: "/screenshots/stats.png",
        width: 1200,
        height: 630,
        alt: "CSS Battle Statistics Dashboard"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Battle Statistics",
    description: "Track your CSS Battle progress with detailed statistics and analytics",
    images: ["/screenshots/stats.png"]
  }
};
