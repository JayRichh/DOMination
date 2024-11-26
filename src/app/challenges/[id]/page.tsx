import { notFound } from "next/navigation";
import { challenges } from "../data";
import { ChallengePage } from "./ChallengePage";
import { generateMetadata } from "./metadata";

type Props = {
  params: { id: string };
};

export function generateStaticParams() {
  return challenges.map((challenge) => ({
    id: challenge.id,
  }));
}

export { generateMetadata };

export default async function Page({ params }: Props) {
  const challenge = challenges.find((c) => c.id === params.id);

  if (!challenge) {
    notFound();
  }

  return <ChallengePage challenge={challenge} />;
}
