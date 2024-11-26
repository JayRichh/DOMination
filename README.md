# CSSBattle

A full-featured web app for recreating CSS battles. Allowing users to test their Web Dev skills by replicating target designs using HTML/ CSS, providing real-time previews, scoring based on accuracy and code efficiency, and interactive comparison tools.  <br>

![CSSBattle App](https://github.com/user-attachments/assets/058d479e-1781-442d-b05d-023c1d51f7dd)

## Core Technologies

- **Next.js 15.0.3 (App Router)**
- **TypeScript 5**
- **Tailwind CSS 3.4.1**
- **Framer Motion 11**
- **Monaco Editor** for an enhanced coding experience

## Setup

```bash
git clone https://github.com/JayRichh/cssbattle
cd cssbattle
npm install
npm run dev
```

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

### UI Components

- **Form Elements with Validation:** Utilizes `react-hook-form` and `zod` for robust form handling and validation.
- **Data Display:** Includes badges, cards, and tooltips for presenting information effectively.
- **Layout Components:** Features accordions, modals, and tabs for organized content presentation.
- **Feedback Mechanisms:** Implements progress bars, spinners, and toast notifications for user feedback.
- **Visual Effects:** Enhances the UI with gradient backgrounds and smooth animations.

### Code Editor Integration

- **Monaco Editor:** Provides a powerful code editing experience with syntax highlighting, autocomplete, and real-time error detection.
- **Custom Snippets:** Offers predefined CSS snippets to assist users in writing code efficiently.
- **Live Syntax Validation:** Highlights syntax errors and provides immediate feedback to users.

### Live Preview and Comparison Tools

- **Live Preview Pane:** Renders user-submitted CSS in real-time for instant visual feedback.
- **Target Display Pane:** Shows the design that users aim to replicate.
- **Comparison Slider:** Enables users to slide between their output and the target to visually identify differences.
- **Toggle Difference Highlighting:** Highlights pixel-level differences to help users pinpoint areas for improvement.

### Scoring System

- **Accuracy Calculation:** Compares the user's output with the target using image comparison algorithms to determine pixel-perfect accuracy.
- **Code Efficiency Scoring:** Rewards users for writing concise and optimized CSS code.
- **Final Score Composition:** Combines accuracy and efficiency scores to provide a comprehensive final score.
- **Feedback Messages:** Offers constructive feedback based on the user's performance to encourage improvement.

### Helper Tools for HTML/CSS

- **CSS Snippets:** Predefined snippets for common CSS properties to assist users in writing code faster.
- **Property Reference Tooltips:** Provides information about CSS properties when hovered or selected.
- **Color Picker Integration:** Allows users to select colors directly within the editor.
- **Live Syntax Validation:** Highlights syntax errors and provides real-time feedback.

### Responsive and Accessible Design

- **Tailwind CSS:** Ensures a consistent and responsive layout across different devices and screen sizes.
- **Accessibility Features:** Keyboard navigable components, appropriate ARIA labels, and screen-reader friendly elements.

### Data Persistence and State Management

- **Local Storage Integration:** Persists user submissions and progress using `localStorage`.
- **Custom React Hooks:** Manages state and side effects efficiently with custom hooks like `useLocalStorage`, `useImageComparison`, and `useDebounce`.

## Configuration

### Next.js

- **App Router Setup:** Utilizes Next.js 15's App Router for improved routing and layout management.
- **Strict Mode Enabled:** Enforces strict mode for better error handling and performance.
- **Webpack Optimizations:** Optimized for efficient bundling and canvas performance.

### Tailwind CSS

- **Custom Color Schemes:** Defined using HSL variables for flexibility and consistency.
- **Dark Mode Support:** Provides an optional dark theme for better user experience.
- **Custom Animations and Gradients:** Enhances visual appeal with smooth animations and gradient backgrounds.
- **Container Queries:** Ensures responsive design by adapting components based on container size.

### TypeScript

- **Strict Type Checking:** Enforces type safety and reduces runtime errors.
- **Path Aliases Configured:** Simplifies import statements with defined path aliases.
- **Type Definitions:** Includes comprehensive type definitions for challenges, submissions, and general utilities.

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
