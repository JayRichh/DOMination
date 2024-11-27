import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard | CSS Battle",
  description: "Compete with CSS artists worldwide and track your ranking in the global CSS Battle leaderboard",
  openGraph: {
    title: "CSS Battle Leaderboard",
    description: "See how you rank against the best CSS artists worldwide. Track global rankings, scores, and achievements.",
    images: [
      {
        url: "/screenshots/challenges.png",
        width: 1200,
        height: 630,
        alt: "CSS Battle Leaderboard"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Battle Leaderboard",
    description: "Compete with CSS artists worldwide and track your ranking",
    images: ["/screenshots/challenges.png"]
  }
};
