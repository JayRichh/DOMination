# DOMination

A full-featured web app for recreating CSS battles. Allowing users to test their Web Dev skills by replicating target designs using HTML/ CSS, providing real-time previews, scoring based on accuracy and code efficiency, and interactive comparison tools.  <br>

![image](https://github.com/user-attachments/assets/ef884398-74f2-42cd-b715-9f501d7442aa)

<div style="display: flex; flex-direction: row; align-items: flex-start; gap: 20px;">

  <!-- Left Column: Tech and Setup -->
  <div style="flex: 1;">
    <h2>Core Technologies</h2>
    <ul>
      <li><strong>Next.js 15.0.3 (App Router)</strong></li>
      <li><strong>TypeScript 5</strong></li>
      <li><strong>Tailwind CSS 3.4.1</strong></li>
      <li><strong>Framer Motion 11</strong></li>
      <li><strong>Monaco Editor</strong> for an enhanced coding experience</li>
    </ul>

# Setup
```
git clone https://github.com/JayRichh/cssbattle
cd cssbattle
npm install
npm run dev
```
  </div>

  <div style="flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
    <img src="https://github.com/user-attachments/assets/cac8ebb8-b034-4351-ba0c-ee8771565ed3" alt="Project Screenshot 1" style="width: 100%; border-radius: 8px;" />
    <img src="https://github.com/user-attachments/assets/581f371c-88ef-4f16-88d3-960ad30328b9" alt="Project Screenshot 2" style="width: 100%; border-radius: 8px;" />
  </div>
  
![image](https://github.com/user-attachments/assets/f22dc49c-1290-4f80-a076-34846853ba66)

</div>

## Project Structure

```
src/
├── app/                    
│   ├── page.tsx                 # Home page component
│   ├── globals.css              # Global styles using Tailwind CSS
│   ├── challenges/
│   │   ├── index.tsx            # Challenges list page
│   │   └── [id]/
│   │       ├── page.tsx         # Individual challenge page
│   │       └── data.ts          # Challenge data (HTML, CSS, metadata)
│   ├── components/
│   │   ├── Editor/
│   │   │   ├── Editor.tsx           # Monaco Editor component
│   │   │   └── EditorHelpers.tsx    # Helper components for the editor
│   │   ├── Preview/
│   │   │   ├── PreviewPane.tsx      # User's live preview pane
│   │   │   ├── TargetPane.tsx       # Challenge target display
│   │   │   ├── ComparisonSlider.tsx # Slider for comparing outputs
│   │   │   └── ToggleDifference.tsx # Toggle to highlight differences
│   │   ├── UI/
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   └── ...                 # Other reusable UI components
│   │   ├── Header.tsx               # Application header
│   │   ├── Footer.tsx               # Application footer
│   │   └── ScoreDisplay.tsx         # Displays scoring results
│   ├── hooks/
│   │   ├── useLocalStorage.ts       # Custom hook for local storage management
│   │   ├── useImageComparison.ts    # Custom hook for image comparison logic
│   │   ├── useDebounce.ts           # Custom hook for debouncing
│   │   └── useHelpers.ts            # Custom hooks for HTML/CSS helpers
│   ├── utils/
│   │   ├── colorUtils.ts            # Utility functions for color handling
│   │   ├── imageUtils.ts            # Functions for canvas and image processing
│   │   ├── scoringUtils.ts          # Scoring algorithms and utilities
│   │   ├── htmlCssHelpers.ts        # Helper functions for generating HTML/CSS
│   │   └── constants.ts             # Application constants
│   └── types/
│       ├── challenge.d.ts           # Type definitions for challenges
│       ├── submission.d.ts          # Type definitions for user submissions
│       └── index.d.ts               # General type definitions
├── public/
│   └── assets/
│       ├── images/                  # Static images for challenges and UI
│       └── icons/                   # Icons for UI components
├── package.json                     # Project dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── tailwind.config.js               # Tailwind CSS configuration

```

## Features

### Code Editor Integration

- **Monaco Editor:** Provides a clean code editing experience with syntax highlighting, autocomplete, and real-time error detection.
- **Custom Snippets:** Offers predefined CSS snippets to assist users in writing code efficiently.
- **Live Syntax Validation:** Highlights syntax errors and provides immediate feedback to users.

### Live Preview and Comparison Tools

- **Live Preview Pane:** Renders user-submitted CSS in real-time for instant visual feedback.
- **Target Display Pane:** Shows the design that users aim to replicate.
- **Comparison Slider:** Enables users to slide between their output and the target to visually identify differences.
- **Toggle Difference Highlighting:** Highlights pixel-level differences to help users pinpoint areas for improvement.


### Scoring System

The scoring system evaluates solutions based on two main criteria: code efficiency (character count) and visual accuracy. The final score is a weighted combination of these factors:

### Character Score (40% of total)
- Measures code efficiency based on character count compared to the optimal length
- Character count is normalized by removing unnecessary whitespace
- Scoring formula:
  ```
  If length <= optimal:
    bonus = min(5, ((optimal - length) / optimal) * 100)
    score = min(100, 100 + bonus)
  If length > optimal:
    penalty = sqrt((length - optimal) / optimal) * 100
    score = max(0, 100 - penalty)
  ```
- Solutions shorter than optimal length receive up to 5 bonus points
- Penalty for longer solutions uses square root scaling for more balanced scoring

### Visual Score (60% of total)
- Pixel-by-pixel comparison between your solution and the target
- Uses advanced DOM snapshot comparison with html2canvas
- 5-unit tolerance for RGB and alpha channels to handle anti-aliasing
- Direct percentage mapping: matching pixels / total pixels * 100
- Score ranges from 0 to 100

### Combined Score
Final score is calculated as:
```
combinedScore = (characterScore * 0.4 + visualScore * 0.6).toFixed(2)
```

This scoring system rewards:
- Clean, efficient code that meets the optimal character count
- Pixel-perfect visual accuracy
- Balance between code golf and visual fidelity


### Data Persistence and Statistics

- **Local Storage Integration:**
  - Persists all challenge attempts and scores using `localStorage`
  - Stores best scores, last attempts, and complete submission history
  - Each submission includes timestamp, character count, visual score, and actual CSS used
  
- **Statistics Dashboard:**
  - Overall progress tracking with total challenges attempted/completed
  - Per-challenge performance metrics:
    - Best combined score achieved
    - Character count improvement over time
    - Visual accuracy trends
    - Historical submission timeline
  - Detailed attempt history with:
    - Submission timestamps
    - Character and visual scores
    - Code snippets from each attempt

- **Custom React Hooks:**
  - `useLocalStorage`: Manages persistent state with automatic JSON serialization
  - `useImageComparison`: Handles real-time visual difference calculation
  - `useDebounce`: Optimizes performance for live preview updates
  - `useChallengeStats`: Aggregates and calculates performance metrics

## Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run format       # Prettier formatting
```

## License

MIT
