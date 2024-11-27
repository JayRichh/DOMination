"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Editor } from "~/components/Editor";
import { PreviewPane } from "~/components/PreviewPane";
import { ComparisonSlider } from "~/components/ComparisonSlider";
import type { Challenge, ChallengeScore } from "~/types/challenge";
import { saveChallengeState, getChallengeState, updateChallengeWithScore } from "~/utils/challengeState";
import { generateChallengeScore } from "~/utils/scoring";

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
  const [score, setScore] = useState<ChallengeScore | null>(null);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userPreviewRef = useRef<HTMLDivElement>(null);
  const targetPreviewRef = useRef<HTMLDivElement>(null);

  // Initialize CSS and load saved state on mount
  useEffect(() => {
    setUserCss(getStarterCSS(challenge));
    const savedState = getChallengeState(challenge.id);
    if (savedState?.lastAttempt) {
      setScore(savedState.lastAttempt);
      setUserCss(savedState.lastAttempt.css || getStarterCSS(challenge));
    }
    setMounted(true);
  }, [challenge]);

  const handleCssChange = useCallback((newCss: string) => {
    setUserCss(newCss);
    setScore(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!userPreviewRef.current || !targetPreviewRef.current) return;
    setError(null);

    try {
      const newScore = await generateChallengeScore(
        userCss,
        challenge.optimalCodeLength,
        userPreviewRef.current,
        targetPreviewRef.current
      );

      setScore(newScore);
      updateChallengeWithScore(challenge.id, newScore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving the score');
      console.error('Score update error:', err);
    }
  }, [userCss, challenge.optimalCodeLength, challenge.id]);

  if (!mounted) return null;

  return (
    <div className="container max-w-7xl mx-auto grid grid-rows-[auto_1fr] h-[calc((100vh-4rem))]">
      {/* Header - Fixed height, always visible */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {challenge.title}
            </h1>
            <p className="text-muted-foreground">
              {challenge.description}
            </p>
            {score && (
              <div className="mt-2 text-sm">
                <p>Characters: {score.characterCount} ({score.characterScore.toFixed(1)})</p>
                <p>Visual Match: {score.pixelAccuracy.toFixed(1)}% ({score.visualScore.toFixed(1)})</p>
                <p>Total Score: {score.combinedScore.toFixed(1)}</p>
              </div>
            )}
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>

          <div className="flex items-center gap-6 flex-shrink-0">
            {score && (
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {score.characterScore.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Characters</div>
                  <div className="text-xs text-muted-foreground">
                    {score.characterCount}/{challenge.optimalCodeLength}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">
                    {score.visualScore.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Visual</div>
                  <div className="text-xs text-muted-foreground">
                    {score.pixelAccuracy.toFixed(2)}% match
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {score.combinedScore.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
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

      {/* Main Content - Grid Layout */}
      <main className="grid grid-cols-2 min-h-0">
        {/* Left Panel - Editor */}
        <section className="grid grid-rows-[auto_1fr] min-h-0 border-r border-border bg-muted">
          {/* HTML Preview - Fixed height */}
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">HTML Structure</h3>
            <div className="p-3 rounded-lg bg-background/50 border border-border overflow-auto max-h-40">
              <pre className="text-sm font-mono text-muted-foreground">
                {challenge.targetHtml}
              </pre>
            </div>
          </div>

          {/* CSS Editor - Fills remaining space */}
          <div className="min-h-0">
            <Editor 
              defaultValue={getStarterCSS(challenge)}
              targetHtml={challenge.targetHtml}
              onChange={handleCssChange}
            />
          </div>
        </section>

        {/* Right Panel - Preview */}
        <section className="grid grid-rows-[1fr_auto] min-h-0 bg-muted">
          {/* Preview Grid */}
          <div className="grid grid-rows-2 gap-6 p-6 min-h-0 overflow-auto">
            {/* User Preview */}
            <div className="space-y-2 min-h-0">
              <h3 className="text-sm font-medium text-muted-foreground">Your Output</h3>
              <div 
                ref={userPreviewRef}
                className="h-[calc(100%-2rem)] rounded-lg overflow-hidden shadow-lg"
              >
                <PreviewPane
                  html={challenge.targetHtml}
                  css={userCss}
                  backgroundColor={challenge.backgroundColor}
                />
              </div>
            </div>

            {/* Target Preview */}
            <div className="space-y-2 min-h-0">
              <h3 className="text-sm font-medium text-muted-foreground">Target</h3>
              <div 
                ref={targetPreviewRef}
                className="h-[calc(100%-2rem)] rounded-lg overflow-hidden shadow-lg"
              >
                <PreviewPane
                  html={challenge.targetHtml}
                  css={challenge.targetCss}
                  backgroundColor={challenge.backgroundColor}
                />
              </div>
            </div>
          </div>

          {/* Comparison Tools - Fixed height */}
          <div className="border-t border-border p-6 bg-background/60 backdrop-blur-xl">
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
        </section>
      </main>
    </div>
  );
}
