import type { Metadata } from "next";
import { challenges } from "../data";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Destructure id from params Promise
  const { id } = await params;
  const challenge = challenges.find((c) => c.id === id);
  
  if (!challenge) {
    return {
      title: "Challenge Not Found - CSS Battle",
      description: "The requested challenge could not be found.",
    };
  }

  return {
    title: `${challenge.title} - CSS Battle`,
    description: challenge.description,
    openGraph: {
      title: `${challenge.title} - CSS Battle`,
      description: challenge.description,
      type: "website",
    },
  };
}
