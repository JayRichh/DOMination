import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Challenges | DOMination",
  description: "Test your CSS skills with our collection of creative challenges. From beginner to expert level, improve your CSS mastery through hands-on practice.",
  openGraph: {
    title: "DOMination Challenges",
    description: "Explore a diverse collection of CSS challenges designed to test and improve your CSS skills through practical, hands-on exercises.",
    images: [
      {
        url: "/screenshots/challenges.png",
        width: 1200,
        height: 630,
        alt: "DOMination Challenges"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "DOMination Challenges",
    description: "Master CSS through interactive challenges and real-time feedback",
    images: ["/screenshots/challenges.png"]
  }
};
