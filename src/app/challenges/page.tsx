import Link from "next/link";
import { challenges } from "./data";

function ChallengeCard({ challenge }: { challenge: typeof challenges[0] }) {
  return (
    <Link
      href={`/challenges/${challenge.id}`}
      className="group relative overflow-hidden rounded-xl bg-background/40 backdrop-blur-xl border border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
    >
      {/* Hover Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Challenge Preview */}
      <div className="aspect-square p-6 relative">
        <div 
          className="w-full h-full rounded-lg overflow-hidden shadow-lg"
          style={{ backgroundColor: challenge.backgroundColor }}
        >
          <iframe
            srcDoc={`
              <!DOCTYPE html>
              <html>
                <head>
                  <style>
                    * {
                      margin: 0;
                      padding: 0;
                      box-sizing: border-box;
                    }
                    
                    html, body {
                      width: 100%;
                      height: 100vh;
                      overflow: hidden;
                      background-color: ${challenge.backgroundColor};
                    }

                    body {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      min-height: 100vh;
                    }

                    /* Target CSS */
                    ${challenge.targetCss}
                  </style>
                </head>
                <body>
                  ${challenge.targetHtml}
                </body>
              </html>
            `}
            className="w-full h-full border-0"
            sandbox="allow-scripts"
            loading="lazy"
          />
        </div>
      </div>

      {/* Challenge Info */}
      <div className="p-6 border-t border-border/50 relative">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {challenge.title}
          </h2>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            #{challenge.id}
          </span>
        </div>
        <p className="text-muted-foreground">
          {challenge.description}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full border border-border/50"
              style={{ backgroundColor: challenge.backgroundColor }}
              title="Background Color"
            />
            <div 
              className="w-3 h-3 rounded-full border border-border/50"
              style={{ backgroundColor: challenge.foregroundColor }}
              title="Foreground Color"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            Target: {challenge.optimalCodeLength} chars
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function ChallengesPage() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>
    </div>
  );
}
