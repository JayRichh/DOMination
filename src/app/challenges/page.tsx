import { Suspense } from "react";
import { PageLayout } from "~/components/PageLayout";
import { challenges } from "./data";
import { ChallengesList } from "./ChallengesList";

async function getChallenges() {
  // Simulate async data fetching
  await new Promise(resolve => setTimeout(resolve, 0));
  return challenges;
}

export default async function ChallengesPage() {
  const challenges = await getChallenges();

  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Challenges
          </h1>
          <p className="text-muted-foreground">
            Test your CSS skills with these creative challenges
          </p>
        </div>

        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video rounded-lg border border-border bg-card animate-pulse"
              />
            ))}
          </div>
        }>
          <ChallengesList challenges={challenges} />
        </Suspense>
      </div>
    </PageLayout>
  );
}
