import type { ReactNode } from 'react';
import type { MonacoEditor } from './editor';

export interface EditorProps {
  defaultValue?: string;
  targetHtml?: string;
  onChange?: (value: string) => void;
}

export interface PreviewPaneProps {
  html: string;
  css: string;
  backgroundColor: string;
}

export interface ComparisonSliderProps {
  userOutput: ReactNode;
  targetOutput: ReactNode;
}

export interface GradientBackgroundProps {
  variant?: "default" | "radial" | "mesh";
  interactive?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface EditorRef {
  editor: MonacoEditor | null;
  formatCode: () => void;
  showSuggestions: () => void;
}
