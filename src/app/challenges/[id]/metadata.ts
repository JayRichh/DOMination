import type { Metadata } from "next";
import { challenges } from "../data";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const challenge = challenges.find((c) => c.id === params.id);
  
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
