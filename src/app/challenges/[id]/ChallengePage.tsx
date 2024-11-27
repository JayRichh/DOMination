"use client";

import { useState, useCallback, useEffect } from "react";
import { Editor } from "~/components/Editor";
import { PreviewPane } from "~/components/PreviewPane";
import { ComparisonSlider } from "~/components/ComparisonSlider";
import type { Challenge } from "~/types/challenge";
import { saveChallengeState, getChallengeState } from "~/utils/challengeState";

interface ChallengePageProps {
  challenge: Challenge;
}

const getStarterCSS = (challenge: Challenge) => `/* ${challenge.title} */
/* Try to match the target! */

.square {
  /* Add your styles here */
  width: 100px;
  height: 100px;
  background: ${challenge.foregroundColor};
}

/* Colors:
 * Background: ${challenge.backgroundColor}
 * Foreground: ${challenge.foregroundColor}
 */
`;

export function ChallengePage({ challenge }: ChallengePageProps) {
  const [userCss, setUserCss] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Initialize CSS and load saved state on mount
  useEffect(() => {
    setUserCss(getStarterCSS(challenge));
    const savedState = getChallengeState(challenge.id);
    if (savedState) {
      setScore(savedState.score);
    }
    setMounted(true);
  }, [challenge]);

  const handleCssChange = useCallback((newCss: string) => {
    setUserCss(newCss);
    setScore(null);
  }, []);

  const handleSubmit = useCallback(() => {
    const codeEfficiencyScore = Math.max(
      0,
      100 - (userCss.length - challenge.optimalCodeLength) / 2
    );
    const finalScore = Math.round(codeEfficiencyScore);
    setScore(finalScore);
    saveChallengeState(challenge.id, finalScore);
  }, [userCss, challenge.optimalCodeLength, challenge.id]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex-none border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {challenge.title}
            </h1>
            <p className="text-muted-foreground">
              {challenge.description}
            </p>
          </div>

          <div className="flex items-center gap-6">
            {score !== null && (
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {score}
                </div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
            )}
            <button
              onClick={handleSubmit}
              className="btn btn-primary min-w-32"
            >
              Submit Solution
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Editor */}
        <div className="flex-1 flex flex-col border-r border-border bg-muted overflow-hidden">
          {/* HTML Preview */}
          <div className="flex-none p-4 border-b border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">HTML Structure</h3>
            <div className="p-3 rounded-lg bg-background/50 border border-border overflow-auto max-h-40">
              <pre className="text-sm font-mono text-muted-foreground">
                {challenge.targetHtml}
              </pre>
            </div>
          </div>

          {/* CSS Editor */}
          <div className="flex-1 overflow-auto">
            <Editor 
              defaultValue={getStarterCSS(challenge)}
              targetHtml={challenge.targetHtml}
              onChange={handleCssChange}
            />
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="flex-1 flex flex-col bg-muted overflow-hidden">
          <div className="flex-1 grid grid-rows-2 gap-6 p-6 overflow-auto">
            {/* User Preview */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Your Output</h3>
              <div className="h-full rounded-lg overflow-hidden shadow-lg">
                <PreviewPane
                  html={challenge.targetHtml}
                  css={userCss}
                  backgroundColor={challenge.backgroundColor}
                />
              </div>
            </div>

            {/* Target Preview */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Target</h3>
              <div className="h-full rounded-lg overflow-hidden shadow-lg">
                <PreviewPane
                  html={challenge.targetHtml}
                  css={challenge.targetCss}
                  backgroundColor={challenge.backgroundColor}
                />
              </div>
            </div>
          </div>

          {/* Comparison Tools */}
          <div className="flex-none border-t border-border p-6 bg-background/60 backdrop-blur-xl">
            <ComparisonSlider
              userOutput={
                <PreviewPane
                  html={challenge.targetHtml}
                  css={userCss}
                  backgroundColor={challenge.backgroundColor}
                />
              }
              targetOutput={
                <PreviewPane
                  html={challenge.targetHtml}
                  css={challenge.targetCss}
                  backgroundColor={challenge.backgroundColor}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
