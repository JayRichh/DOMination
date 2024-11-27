import { challenges } from "./data";
import { ChallengeList } from "./ChallengeList";

export default function ChallengesPage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            CSS Challenges
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Select a challenge to start coding. Each challenge tests different CSS concepts and skills,
            helping you become a better developer.
          </p>
        </div>

        <ChallengeList challenges={challenges} />
      </div>
    </div>
  );
}