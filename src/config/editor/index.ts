export * from './setup';
export * from './snippets';
export * from './theme';

// Re-export common types
export type {
  MonacoTheme,
  MonacoEditor,
  MonacoCompletionItem,
  MonacoRange,
  MonacoPosition,
  CssSnippet,
  EditorConfig,
} from '~/types/editor';

// Default configuration
export const defaultEditorConfig = {
  language: 'css',
  theme: 'css-battle',
  defaultValue: `/* Write your CSS here */\n\n`,
} as const;
