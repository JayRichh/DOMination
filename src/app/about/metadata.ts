import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | CSS Battle",
  description: "Learn about CSS Battle - Master CSS through creative challenges and interactive learning",
  openGraph: {
    title: "About CSS Battle",
    description: "Master CSS by recreating targets with code. Engage in fun and interactive challenges to elevate your CSS skills.",
    images: [
      {
        url: "/screenshots/editor.png",
        width: 1200,
        height: 630,
        alt: "CSS Battle Editor Interface"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About CSS Battle",
    description: "Master CSS through creative challenges and interactive learning",
    images: ["/screenshots/editor.png"]
  }
};
