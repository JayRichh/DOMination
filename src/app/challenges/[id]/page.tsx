import { notFound } from "next/navigation";
import { challenges } from "../data";
import { ChallengePage } from "./ChallengePage";
import { generateMetadata } from "./metadata";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return challenges.map((challenge) => ({
    id: challenge.id,
  }));
}

export { generateMetadata };

export default async function Page({ params }: Props) {
  // Destructure id from params Promise
  const { id } = await params;
  const challenge = challenges.find((c) => c.id === id);

  if (!challenge) {
    notFound();
  }

  return <ChallengePage challenge={challenge} />;
}
