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
    title: "Statistics", // Will be templated to "Statistics | DOMination"
    description: "Track your DOMination progress with detailed statistics, performance metrics, and visual analytics",
    openGraph: {
      title: "DOMination Statistics",
      description: "View your DOMination performance metrics, challenge completion stats, and progress over time",
      url: new URL("/stats", process.env.NEXT_PUBLIC_BASE_URL).toString(),
      images: [
        {
          url: new URL("/screenshots/stats.png", process.env.NEXT_PUBLIC_BASE_URL).toString(),
          width: 1200,
          height: 630,
          alt: "DOMination Statistics Dashboard"
        },
        ...previousImages
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "DOMination Statistics",
      description: "Track your DOMination progress with detailed statistics and analytics",
      images: [new URL("/screenshots/stats.png", process.env.NEXT_PUBLIC_BASE_URL).toString()]
    }
  };
}
