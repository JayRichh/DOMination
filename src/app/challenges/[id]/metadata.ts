import { challenges } from "../data";
import type { Metadata } from "next";

interface MetadataProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { id } = await params;
  const challenge = challenges.find(c => c.id === id);

  if (!challenge) {
    return {
      title: "Challenge Not Found | CSS Battle",
      description: "The requested challenge could not be found.",
    };
  }

  return {
    title: `${challenge.title} | CSS Battle`,
    description: challenge.description,
    openGraph: {
      title: `${challenge.title} | CSS Battle`,
      description: challenge.description,
      type: "website",
      images: [
        {
          url: `/screenshots/challenges/${challenge.id}.png`,
          width: 1200,
          height: 630,
          alt: challenge.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${challenge.title} | CSS Battle`,
      description: challenge.description,
      images: [`/screenshots/challenges/${challenge.id}.png`],
    },
  };
}

export async function generateStaticParams() {
  return challenges.map((challenge) => ({
    id: challenge.id,
  }));
}
