import html2canvas from 'html2canvas';
import type { ChallengeScore } from "~/types/challenge";

// Constants for scoring calculations
const CHAR_SCORE_WEIGHT = 0.4;  // 40% weight for character count score
const VISUAL_SCORE_WEIGHT = 0.6; // 60% weight for visual accuracy score

/**
 * Calculate character count score based on optimal length
 * @param actualLength Current solution character count
 * @param optimalLength Target character count for the challenge
 * @returns Score between 0-100
 */
export function calculateCharacterScore(actualLength: number, optimalLength: number): number {
  // If actual length is less than or equal to optimal, give bonus points
  // Maximum bonus is now 5 points to avoid over-rewarding extremely short solutions
  if (actualLength <= optimalLength) {
    const bonusPoints = Math.min(5, ((optimalLength - actualLength) / optimalLength) * 100);
    return Math.min(100, 100 + bonusPoints);
  }
  
  // Otherwise, deduct points based on how much longer the solution is
  // Using sqrt to make the penalty less aggressive for slightly longer solutions
  const penalty = Math.sqrt((actualLength - optimalLength) / optimalLength) * 100;
  return Math.max(0, 100 - penalty);
}

/**
 * Calculate pixel accuracy score by comparing DOM snapshots
 * @param userPreview User's solution preview element
 * @param targetPreview Target solution preview element
 * @returns Score between 0-100 based on pixel accuracy
 */
export async function calculateVisualScore(
  userPreview: HTMLElement,
  targetPreview: HTMLElement
): Promise<number> {
  // Convert both previews to canvas for pixel comparison
  const userCanvas = await html2canvas(userPreview);
  const targetCanvas = await html2canvas(targetPreview);
  
  const width = userCanvas.width;
  const height = userCanvas.height;
  
  const userCtx = userCanvas.getContext('2d');
  const targetCtx = targetCanvas.getContext('2d');
  
  if (!userCtx || !targetCtx) return 0;
  
  const userImageData = userCtx.getImageData(0, 0, width, height);
  const targetImageData = targetCtx.getImageData(0, 0, width, height);
  
  let matchingPixels = 0;
  const totalPixels = width * height;
  
  // Compare each pixel with a small tolerance for anti-aliasing
  for (let i = 0; i < userImageData.data.length; i += 4) {
    const isMatch = 
      Math.abs(userImageData.data[i] - targetImageData.data[i]) <= 5 && // R
      Math.abs(userImageData.data[i + 1] - targetImageData.data[i + 1]) <= 5 && // G
      Math.abs(userImageData.data[i + 2] - targetImageData.data[i + 2]) <= 5 && // B
      Math.abs(userImageData.data[i + 3] - targetImageData.data[i + 3]) <= 5;   // A
    
    if (isMatch) matchingPixels++;
  }
  
  // Calculate accuracy to 2 decimal places
  const accuracy = Number(((matchingPixels / totalPixels) * 100).toFixed(2));
  return accuracy;
}

/**
 * Calculate combined score from character and visual scores
 */
export function calculateCombinedScore(characterScore: number, visualScore: number): number {
  return Number((
    (characterScore * CHAR_SCORE_WEIGHT + visualScore * VISUAL_SCORE_WEIGHT)
  ).toFixed(2));
}

/**
 * Generate a complete score object for a challenge attempt
 */
export async function generateChallengeScore(
  userCss: string,
  optimalLength: number,
  userPreview: HTMLElement,
  targetPreview: HTMLElement
): Promise<ChallengeScore> {
  // Normalize CSS by removing unnecessary whitespace
  const normalizedCss = userCss.trim().replace(/\s+/g, ' ');
  const characterCount = normalizedCss.length;
  const characterScore = calculateCharacterScore(characterCount, optimalLength);
  const pixelAccuracy = await calculateVisualScore(userPreview, targetPreview);
  const visualScore = pixelAccuracy; // Direct mapping as it's already 0-100
  
  return {
    characterScore,
    visualScore,
    combinedScore: calculateCombinedScore(characterScore, visualScore),
    characterCount,
    pixelAccuracy,
    timestamp: new Date().toISOString(),
    css: normalizedCss // Store normalized CSS
  };
}
