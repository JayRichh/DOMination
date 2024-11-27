import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard | DOMination",
  description: "Compete with CSS artists worldwide and track your ranking in the global DOMination leaderboard",
  openGraph: {
    title: "DOMination Leaderboard",
    description: "See how you rank against the best CSS artists worldwide. Track global rankings, scores, and achievements.",
    images: [
      {
        url: "/screenshots/challenges.png",
        width: 1200,
        height: 630,
        alt: "DOMination Leaderboard"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "DOMination Leaderboard",
    description: "Compete with CSS artists worldwide and track your ranking",
    images: ["/screenshots/challenges.png"]
  }
};
