import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | DOMination",
  description: "Learn about DOMination - Master CSS through creative challenges and interactive learning",
  openGraph: {
    title: "About DOMination",
    description: "Master CSS by recreating targets with code. Engage in fun and interactive challenges to elevate your CSS skills.",
    images: [
      {
        url: "/screenshots/editor.png",
        width: 1200,
        height: 630,
        alt: "DOMination Editor Interface"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About DOMination",
    description: "Master CSS through creative challenges and interactive learning",
    images: ["/screenshots/editor.png"]
  }
};
