"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { Editor } from "~/components/Editor";
import { PreviewPane } from "~/components/PreviewPane";
import { ComparisonSlider } from "~/components/ComparisonSlider";
import { ValidationMessage } from "~/components/ValidationMessage";
import { ThemeToggle } from "~/components/ThemeToggle";
import type { Challenge, ChallengeScore } from "~/types/challenge";
import { getChallengeState, updateChallengeWithScore, updateChallengeContent } from "~/utils/challengeState";
import { generateChallengeScore } from "~/utils/scoring";

interface ChallengePageProps {
  challenge: Challenge;
}

const getStarterCSS = (challenge: Challenge) => 
  challenge.starterCss || `/* ${challenge.title} */
/* Try to match the target! */

.square {
  width: 100px;
  height: 100px;
  background: ${challenge.foregroundColor};
}

/* Colors:
 * Background: ${challenge.backgroundColor}
 * Foreground: ${challenge.foregroundColor}
 */`;

const getStarterHTML = (challenge: Challenge) =>
  challenge.starterHtml || challenge.targetHtml;

export function ChallengePage({ challenge }: ChallengePageProps) {
  const [userHtml, setUserHtml] = useState("");
  const [userCss, setUserCss] = useState("");
  const [score, setScore] = useState<ChallengeScore | null>(null);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userPreviewRef = useRef<HTMLDivElement>(null);
  const targetPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedState = getChallengeState(challenge.id);
    setUserHtml(savedState?.currentHtml || getStarterHTML(challenge));
    setUserCss(savedState?.currentCss || getStarterCSS(challenge));
    if (savedState?.lastAttempt) {
      setScore(savedState.lastAttempt);
    }
    setMounted(true);
  }, [challenge]);

  const handleHtmlChange = useCallback((newHtml: string) => {
    setUserHtml(newHtml);
    setScore(null);
    updateChallengeContent(challenge.id, newHtml, userCss);
  }, [challenge.id, userCss]);

  const handleCssChange = useCallback((newCss: string) => {
    setUserCss(newCss);
    setScore(null);
    updateChallengeContent(challenge.id, userHtml, newCss);
  }, [challenge.id, userHtml]);

  const handleSubmit = useCallback(async () => {
    if (!userPreviewRef.current || !targetPreviewRef.current) return;
    setError(null);

    try {
      const newScore = await generateChallengeScore(
        userHtml,
        userCss,
        challenge.optimalCodeLength,
        userPreviewRef.current,
        targetPreviewRef.current
      );

      setScore(newScore);
      updateChallengeWithScore(challenge.id, newScore, userHtml, userCss);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving the score');
      console.error('Score update error:', err);
    }
  }, [userHtml, userCss, challenge.optimalCodeLength, challenge.id]);

  if (!mounted) return null;

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="h-16 border-b border-border bg-background/90 backdrop-blur-lg shadow-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link 
            href="/challenges"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Challenges
          </Link>
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {challenge.title}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {score && (
            <div className="flex gap-6 px-4 py-2 rounded-md bg-background/50 border border-border">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">
                  {score.characterScore.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {score.characterCount}/{challenge.optimalCodeLength}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-accent">
                  {score.visualScore.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground">
                  Match
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {score.combinedScore.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Total
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Submit Solution
          </button>
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-2 min-h-0">
        {/* Left Panel - Editors */}
        <section className="grid grid-rows-2 min-h-0 border-r border-border bg-muted">
          <div className="min-h-0 border-b border-border">
            <div className="h-8 px-4 flex items-center justify-between border-b border-border bg-background/50">
              <span className="text-sm font-medium">HTML Editor</span>
              <span className="text-xs text-muted-foreground">
                Press Ctrl+S to format
              </span>
            </div>
            <div className="h-[calc(100%-2rem)]">
              <Editor
                language="html"
                value={userHtml}
                onChange={handleHtmlChange}
              />
            </div>
          </div>
          <div className="min-h-0">
            <div className="h-8 px-4 flex items-center justify-between border-b border-border bg-background/50">
              <span className="text-sm font-medium">CSS Editor</span>
              <span className="text-xs text-muted-foreground">
                Press Ctrl+Space for suggestions
              </span>
            </div>
            <div className="h-[calc(100%-2rem)]">
              <Editor
                language="css"
                value={userCss}
                onChange={handleCssChange}
              />
            </div>
          </div>
        </section>

        {/* Right Panel - Preview */}
        <section className="grid grid-rows-[1fr_auto] min-h-0 bg-muted">
          <div className="grid grid-rows-2 gap-6 p-6 min-h-0 overflow-auto">
            <div className="space-y-2 min-h-0">
              <h3 className="text-sm font-medium text-muted-foreground">Your Output</h3>
              <div 
                ref={userPreviewRef}
                className="h-[calc(100%-2rem)] rounded-lg overflow-hidden shadow-lg"
              >
                <PreviewPane
                  html={userHtml}
                  css={userCss}
                  backgroundColor={challenge.backgroundColor}
                />
              </div>
            </div>

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

          <div className="border-t border-border p-6 bg-background/60 backdrop-blur-xl">
            <ComparisonSlider
              userOutput={
                <PreviewPane
                  html={userHtml}
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
      </div>

      {/* Error Messages */}
      {error && (
        <div className="fixed bottom-4 right-4 z-50">
          <ValidationMessage type="error" message={error} />
        </div>
      )}
    </div>
  );
}
