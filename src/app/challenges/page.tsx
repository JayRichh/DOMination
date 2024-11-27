import { Suspense } from "react";
import { PageLayout } from "~/components/PageLayout";
import { Text } from "~/components/ui/Text";
import { challenges } from "./data";
import { ChallengesList } from "./ChallengesList";
import { StatsOverview } from "./StatsOverview";
import { getAllChallengeStates } from "~/utils/challengeState";

async function getChallenges() {
  await new Promise(resolve => setTimeout(resolve, 0));
  return challenges;
}

function getCompletedChallenges(): string[] {
  const states = getAllChallengeStates();
  return Object.entries(states)
    .filter(([_, state]) => state.bestScore?.combinedScore === 100)
    .map(([id]) => id);
}

export default async function ChallengesPage() {
  const challenges = await getChallenges();
  const completedChallenges = getCompletedChallenges();

  return (
    <PageLayout>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <Text variant="h1" className="mb-4 text-[#6B8AFF]/80 dark:text-foreground font-bold">
                CSS Challenges
              </Text>
              <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#6B8AFF]/20 dark:bg-primary/20">
                <div className="absolute top-0 left-0 right-0 h-full bg-[#6B8AFF]/40 dark:bg-primary/40" style={{ width: '50%', animation: 'moveUnderline 2s ease-in-out infinite' }}></div>
              </div>
            </div>
            <Text variant="body-lg" className="text-[#6B8AFF]/60 dark:text-muted-foreground mt-6">
              Test your CSS skills with these creative challenges. Each challenge presents a unique opportunity to improve your CSS mastery through hands-on practice.
            </Text>
          </div>

          <Suspense fallback={
            <div className="mb-12 animate-pulse">
              <div className="h-16 bg-muted rounded-lg mb-4" />
              <div className="h-2 bg-muted rounded-full" />
            </div>
          }>
            <StatsOverview challenges={challenges} />
          </Suspense>

          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-muted animate-pulse"
                />
              ))}
            </div>
          }>
            <ChallengesList 
              challenges={challenges} 
              completedChallenges={completedChallenges}
            />
          </Suspense>
        </div>
      </div>
    </PageLayout>
  );
}
