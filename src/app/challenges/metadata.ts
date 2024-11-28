import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: {}
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  _props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error('NEXT_PUBLIC_BASE_URL environment variable is required');
  }

  // Get parent metadata (allows extending it)
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "Challenges", // Will be templated to "Challenges | DOMination"
    description: "Test your CSS skills with our collection of creative challenges. From beginner to expert level, improve your CSS mastery through hands-on practice.",
    openGraph: {
      title: "DOMination Challenges",
      description: "Explore a diverse collection of CSS challenges designed to test and improve your CSS skills through practical, hands-on exercises.",
      url: new URL("/challenges", process.env.NEXT_PUBLIC_BASE_URL).toString(),
      images: [
        {
          url: new URL("/screenshots/challenges.png", process.env.NEXT_PUBLIC_BASE_URL).toString(),
          width: 1200,
          height: 630,
          alt: "DOMination Challenges"
        },
        ...previousImages
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "DOMination Challenges",
      description: "Master CSS through interactive challenges and real-time feedback",
      images: [new URL("/screenshots/challenges.png", process.env.NEXT_PUBLIC_BASE_URL).toString()]
    }
  };
}
