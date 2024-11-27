import type { ReactNode } from 'react';
import type { EditorLanguage } from '~/config/editor';
import type { EditorInstance } from './editor';

export interface EditorProps {
  defaultValue?: string;
  value?: string;
  language?: EditorLanguage;
  onChange?: (value: string) => void;
  onSave?: () => void;
  readOnly?: boolean;
  height?: string | number;
  width?: string | number;
  className?: string;
}

export interface PreviewPaneProps {
  html: string;
  css: string;
  backgroundColor: string;
  onError?: (error: string) => void;
}

export interface SliderProps {
  userOutput: ReactNode;
  targetOutput: ReactNode;
  xrayMode: boolean;
}

export interface ComparisonSliderProps {
  userOutput: ReactNode;
  targetOutput: ReactNode;
  orientation?: 'horizontal' | 'vertical';
}

export interface EditorRef {
  editor: EditorInstance | null;
  formatCode: () => void;
  showSuggestions: () => void;
}

export interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error) => void;
}

export interface ErrorMessageProps {
  message: string;
  details?: string;
  onRetry?: () => void;
}

export interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
}

export interface ValidationMessageProps {
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
  onClose?: () => void;
}
