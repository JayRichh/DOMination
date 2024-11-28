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
    title: "Leaderboard", // Will be templated to "Leaderboard | DOMination"
    description: "Compete with CSS artists worldwide and track your ranking in the global DOMination leaderboard",
    openGraph: {
      title: "DOMination Leaderboard",
      description: "See how you rank against the best CSS artists worldwide. Track global rankings, scores, and achievements.",
      url: new URL("/leaderboard", process.env.NEXT_PUBLIC_BASE_URL).toString(),
      images: [
        {
          url: new URL("/screenshots/compare.png", process.env.NEXT_PUBLIC_BASE_URL).toString(),
          width: 1200,
          height: 630,
          alt: "DOMination Leaderboard"
        },
        ...previousImages
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "DOMination Leaderboard",
      description: "Compete with CSS artists worldwide and track your ranking",
      images: [new URL("/screenshots/compare.png", process.env.NEXT_PUBLIC_BASE_URL).toString()]
    }
  };
}
