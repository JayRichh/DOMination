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
  // Guard against invalid inputs
  if (optimalLength <= 0) {
    throw new Error('Optimal length must be greater than 0');
  }
  if (actualLength < 0) {
    throw new Error('Actual length cannot be negative');
  }

  // If actual length is less than or equal to optimal, give bonus points
  // Maximum bonus is now 5 points to avoid over-rewarding extremely short solutions
  if (actualLength <= optimalLength) {
    // Ensure type safety by explicitly handling division by zero
    const lengthDifference: number = optimalLength - actualLength;
    const lengthRatio: number = lengthDifference / optimalLength;
    const rawBonusPoints: number = lengthRatio * 100;
    const cappedBonusPoints: number = Math.min(5, rawBonusPoints);
    return Math.min(100, 100 + cappedBonusPoints);
  }
  
  // Otherwise, deduct points based on how much longer the solution is
  // Using sqrt to make the penalty less aggressive for slightly longer solutions
  const lengthDifference: number = actualLength - optimalLength;
  const lengthRatio: number = lengthDifference / optimalLength;
  const penalty: number = Math.sqrt(lengthRatio) * 100;
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
  
  // Compare each pixel with a stricter tolerance for anti-aliasing
  for (let i = 0; i < userImageData.data.length; i += 4) {
    const isMatch = 
      Math.abs(userImageData.data[i] - targetImageData.data[i]) <= 2 && // R
      Math.abs(userImageData.data[i + 1] - targetImageData.data[i + 1]) <= 2 && // G
      Math.abs(userImageData.data[i + 2] - targetImageData.data[i + 2]) <= 2 && // B
      Math.abs(userImageData.data[i + 3] - targetImageData.data[i + 3]) <= 2;   // A
    
    if (isMatch) matchingPixels++;
  }
  
  // Calculate accuracy to 2 decimal places with a minimum threshold
  const accuracy = Number(((matchingPixels / totalPixels) * 100).toFixed(2));
  // If accuracy is below 20%, return 0 to indicate a significant mismatch
  return accuracy < 20 ? 0 : accuracy;
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
 * Clean and normalize CSS content by removing comments and unnecessary whitespace
 * @param css Raw CSS content
 * @returns Cleaned CSS content
 */
function cleanCssContent(css: string): string {
  if (typeof css !== 'string') {
    throw new Error('CSS content must be a string');
  }

  return css
    // Remove CSS comments (both single and multi-line)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove single-line comments if any
    .replace(/\/\/.*/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace around special characters
    .replace(/\s*([{}:;,])\s*/g, '$1')
    // Remove trailing semicolons in blocks
    .replace(/;}/g, '}')
    // Remove empty blocks
    .replace(/[^{}]+\{\}/g, '')
    // Remove leading/trailing whitespace
    .trim();
}

/**
 * Clean HTML content by removing comments and unnecessary whitespace
 * @param html Raw HTML content
 * @returns Cleaned HTML content
 */
function cleanHtmlContent(html: string): string {
  if (typeof html !== 'string') {
    throw new Error('HTML content must be a string');
  }

  return html
    // Remove HTML comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Remove whitespace between tags
    .replace(/>\s+</g, '><')
    // Normalize whitespace in text content
    .replace(/\s+/g, ' ')
    // Remove leading/trailing whitespace
    .trim();
}

/**
 * Generate a complete score object for a challenge attempt
 */
export async function generateChallengeScore(
  userHtml: string,
  userCss: string,
  optimalLength: number,
  userPreview: HTMLElement,
  targetPreview: HTMLElement
): Promise<ChallengeScore> {
  if (!userHtml || !userCss || !optimalLength || !userPreview || !targetPreview) {
    throw new Error('Missing required parameters for score generation');
  }

  try {
    // Extract and normalize HTML and CSS content
    const htmlContent = cleanHtmlContent(userHtml);
    const cssContent = cleanCssContent(userCss);
    
    // Get character count excluding comments and unnecessary whitespace
    const characterCount = htmlContent.length + cssContent.length;
    
    // Calculate scores
    const characterScore = calculateCharacterScore(characterCount, optimalLength);
    const pixelAccuracy = await calculateVisualScore(userPreview, targetPreview);
    const visualScore = pixelAccuracy;
    const combinedScore = calculateCombinedScore(characterScore, visualScore);

    return {
      characterScore,
      visualScore,
      combinedScore,
      characterCount,
      pixelAccuracy,
      html: userHtml,
      css: userCss,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating challenge score:', error);
    throw new Error('Failed to generate challenge score');
  }
}
