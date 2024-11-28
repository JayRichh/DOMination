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
  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images || [];

  const title = "Statistics | DOMination";
  const description = "Track your DOMination progress with detailed statistics, performance metrics, and visual analytics";
  const statsImageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/screenshots/stats.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/stats`,
      images: [
        {
          url: statsImageUrl,
          width: 1200,
          height: 630,
          alt: "DOMination Statistics Dashboard"
        },
        ...previousImages
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [statsImageUrl]
    }
  };
}
