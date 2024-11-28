import { challenges } from "../data";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error('NEXT_PUBLIC_BASE_URL environment variable is required');
  }

  // Get parent metadata (allows extending it)
  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images || [];

  // Get the challenge data - wrap in Promise to properly handle async context
  const challenge = await Promise.resolve(challenges.find(c => c.id === params.id));

  if (!challenge) {
    return {
      title: "Challenge Not Found",
      description: "The requested challenge could not be found.",
      openGraph: {
        title: "Challenge Not Found | DOMination",
        description: "The requested challenge could not be found.",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/challenges/${params.id}`,
        images: previousImages
      },
      twitter: {
        card: "summary_large_image",
        title: "Challenge Not Found | DOMination",
        description: "The requested challenge could not be found.",
        images: previousImages
      }
    };
  }

  const title = `${challenge.title} | CSS Challenge`;
  const description = `Test your CSS skills with the ${challenge.title} challenge - ${challenge.description}`;
  const challengeImageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/screenshots/challenges/${challenge.id}.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/challenges/${params.id}`,
      images: [
        {
          url: challengeImageUrl,
          width: 1200,
          height: 630,
          alt: challenge.title,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [challengeImageUrl]
    },
  };
}

export async function generateStaticParams() {
  return challenges.map((challenge) => ({
    id: challenge.id,
  }));
}
