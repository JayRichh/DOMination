import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ChallengePage } from "./ChallengePage";
import { challenges } from "../data";
import type { Challenge } from "~/types/challenge";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getChallenge(id: string): Promise<Challenge | undefined> {
  // Simulate async data fetching
  await new Promise(resolve => setTimeout(resolve, 0));
  return challenges.find(c => c.id === id);
}

async function ChallengeContent({ id }: { id: string }) {
  const challenge = await getChallenge(id);

  if (!challenge) {
    notFound();
  }

  return <ChallengePage challenge={challenge} />;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense>
      <ChallengeContent id={id} />
    </Suspense>
  );
}

export async function generateStaticParams() {
  return challenges.map((challenge) => ({
    id: challenge.id,
  }));
}
