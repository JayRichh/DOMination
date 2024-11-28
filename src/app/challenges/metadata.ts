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

  const title = "Challenges | DOMination";
  const description = "Test your CSS skills with our collection of creative challenges. From beginner to expert level, improve your CSS mastery through hands-on practice.";
  const challengesImageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/screenshots/challenges.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/challenges`,
      images: [
        {
          url: challengesImageUrl,
          width: 1200,
          height: 630,
          alt: "DOMination Challenges"
        },
        ...previousImages
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [challengesImageUrl]
    }
  };
}
