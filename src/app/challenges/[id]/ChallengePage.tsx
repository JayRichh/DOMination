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

interface ValidationState {
  type: 'error' | 'warning' | 'success' | 'info';
  message: string;
}

export function ChallengePage({ challenge }: ChallengePageProps) {
  const [userHtml, setUserHtml] = useState("");
  const [userCss, setUserCss] = useState("");
  const [score, setScore] = useState<ChallengeScore | null>(null);
  const [mounted, setMounted] = useState(false);
  const [validation, setValidation] = useState<ValidationState | null>(null);
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

  const validateSubmission = () => {
    // Check for empty content
    if (!userHtml.trim() || !userCss.trim()) {
      setValidation({
        type: 'error',
        message: 'Both HTML and CSS content are required'
      });
      return false;
    }

    // Check for minimum content length
    const minLength = 10;
    if (userHtml.trim().length < minLength || userCss.trim().length < minLength) {
      setValidation({
        type: 'warning',
        message: 'Your solution seems too short. Make sure you\'ve included all necessary code.'
      });
      return false;
    }

    // Basic HTML structure validation
    if (!userHtml.includes('<')) {
      setValidation({
        type: 'error',
        message: 'Invalid HTML structure'
      });
      return false;
    }

    // Basic CSS validation
    if (!userCss.includes('{')) {
      setValidation({
        type: 'error',
        message: 'Invalid CSS structure'
      });
      return false;
    }

    return true;
  };

  const handleHtmlChange = useCallback((newHtml: string) => {
    setUserHtml(newHtml);
    setScore(null);
    setValidation(null);
    updateChallengeContent(challenge.id, newHtml, userCss);
  }, [challenge.id, userCss]);

  const handleCssChange = useCallback((newCss: string) => {
    setUserCss(newCss);
    setScore(null);
    setValidation(null);
    updateChallengeContent(challenge.id, userHtml, newCss);
  }, [challenge.id, userHtml]);

  const handleSubmit = useCallback(async () => {
    if (!userPreviewRef.current || !targetPreviewRef.current) return;
    
    // Clear previous validation
    setValidation(null);

    // Validate submission
    if (!validateSubmission()) {
      return;
    }

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

      // Show success message based on score
      if (newScore.visualScore >= 95) {
        setValidation({
          type: 'success',
          message: 'Perfect match! Great job!'
        });
      } else if (newScore.visualScore >= 80) {
        setValidation({
          type: 'success',
          message: 'Very close! Keep refining for a perfect match.'
        });
      } else if (newScore.visualScore >= 50) {
        setValidation({
          type: 'info',
          message: 'Good start! Try to get closer to the target design.'
        });
      } else {
        setValidation({
          type: 'warning',
          message: 'Keep trying! Your solution is quite different from the target.'
        });
      }
    } catch (err) {
      setValidation({
        type: 'error',
        message: err instanceof Error ? err.message : 'An error occurred while scoring your solution'
      });
      console.error('Score update error:', err);
    }
  }, [userHtml, userCss, challenge.id, challenge.optimalCodeLength]);

  if (!mounted) return null;

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="h-16 border-b border-border/40 bg-background/90 backdrop-blur-lg shadow-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link 
            href="/challenges"
            className="text-sm font-medium text-[#6B8AFF]/60 hover:text-[#6B8AFF] dark:text-muted-foreground dark:hover:text-foreground transition-colors"
          >
            ← Back to Challenges
          </Link>
          <h1 className="text-lg font-bold text-[#6B8AFF]/80 dark:text-foreground">
            {challenge.title}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {score && (
            <div className="flex gap-6 px-4 py-2 rounded-lg bg-card/30 backdrop-blur-sm border border-border/40">
              <div className="text-center">
                <div className="text-lg font-bold text-[#6B8AFF] dark:text-primary">
                  {score.characterScore.toFixed(1)}
                </div>
                <div className="text-xs text-[#6B8AFF]/60 dark:text-muted-foreground">
                  {score.characterCount}/{challenge.optimalCodeLength}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#6B8AFF] dark:text-accent">
                  {score.visualScore.toFixed(1)}%
                </div>
                <div className="text-xs text-[#6B8AFF]/60 dark:text-muted-foreground">
                  Match
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#6B8AFF] dark:text-foreground">
                  {score.combinedScore.toFixed(1)}
                </div>
                <div className="text-xs text-[#6B8AFF]/60 dark:text-muted-foreground">
                  Total
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-[#6B8AFF]/10 hover:bg-[#6B8AFF]/20 dark:bg-primary/10 dark:hover:bg-primary/20 text-[#6B8AFF] dark:text-primary transition-colors"
          >
            Submit Solution
          </button>
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-2 min-h-0">
        {/* Left Panel - Editors */}
        <section className="grid grid-rows-2 min-h-0 border-r border-border/40 bg-muted/30">
          <div className="min-h-0 border-b border-border/40">
            <div className="h-8 px-4 flex items-center justify-between border-b border-border/40 bg-card/30 backdrop-blur-sm">
              <span className="text-sm font-medium text-[#6B8AFF]/80 dark:text-foreground">HTML Editor</span>
              <span className="text-xs text-[#6B8AFF]/60 dark:text-muted-foreground">
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
            <div className="h-8 px-4 flex items-center justify-between border-b border-border/40 bg-card/30 backdrop-blur-sm">
              <span className="text-sm font-medium text-[#6B8AFF]/80 dark:text-foreground">CSS Editor</span>
              <span className="text-xs text-[#6B8AFF]/60 dark:text-muted-foreground">
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
        <section className="grid grid-rows-[1fr_auto] min-h-0 bg-muted/30">
          <div className="grid grid-rows-2 gap-6 p-6 min-h-0 overflow-auto">
            <div className="space-y-2 min-h-0">
              <h3 className="text-sm font-medium text-[#6B8AFF]/80 dark:text-foreground">Your Output</h3>
              <div 
                ref={userPreviewRef}
                className="h-[calc(100%-2rem)] rounded-lg overflow-hidden shadow-lg module-container-inner"
              >
                <PreviewPane
                  html={userHtml}
                  css={userCss}
                  backgroundColor={challenge.backgroundColor}
                />
              </div>
            </div>

            <div className="space-y-2 min-h-0">
              <h3 className="text-sm font-medium text-[#6B8AFF]/80 dark:text-foreground">Target</h3>
              <div 
                ref={targetPreviewRef}
                className="h-[calc(100%-2rem)] rounded-lg overflow-hidden shadow-lg module-container-inner"
              >
                <PreviewPane
                  html={challenge.targetHtml}
                  css={challenge.targetCss}
                  backgroundColor={challenge.backgroundColor}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 p-6 bg-card/30 backdrop-blur-sm">
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

      {/* Validation Messages */}
      {validation && (
        <div className="fixed bottom-4 right-4 z-[9999]">
          <ValidationMessage 
            type={validation.type} 
            message={validation.message}
            onClose={() => setValidation(null)}
          />
        </div>
      )}
    </div>
  );
}
