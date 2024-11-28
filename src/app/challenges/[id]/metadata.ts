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

  // Get the challenge data
  const challenge = challenges.find(c => c.id === params.id);

  // Get parent metadata (allows extending it)
  const previousImages = (await parent).openGraph?.images || [];

  if (!challenge) {
    return {
      title: "Challenge Not Found", // Will be templated to "Challenge Not Found | DOMination"
      description: "The requested challenge could not be found.",
    };
  }

  return {
    title: challenge.title, // Will be templated to "{challenge.title} | DOMination"
    description: challenge.description,
    openGraph: {
      title: challenge.title,
      description: challenge.description,
      type: "website",
      url: new URL(`/challenges/${params.id}`, process.env.NEXT_PUBLIC_BASE_URL).toString(),
      images: [
        {
          url: new URL(`/screenshots/challenges/${challenge.id}.png`, process.env.NEXT_PUBLIC_BASE_URL).toString(),
          width: 1200,
          height: 630,
          alt: challenge.title,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: challenge.title,
      description: challenge.description,
      images: [new URL(`/screenshots/challenges/${challenge.id}.png`, process.env.NEXT_PUBLIC_BASE_URL).toString()]
    },
  };
}

export async function generateStaticParams() {
  return challenges.map((challenge) => ({
    id: challenge.id,
  }));
}
