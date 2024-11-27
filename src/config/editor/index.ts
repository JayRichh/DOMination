import { setupEditor, editorOptions } from './setup';
import { htmlSnippets, cssSnippets } from './snippets';
import { editorTheme } from './theme';

export const defaultEditorConfig = {
  defaultValue: '',
  language: 'css',
  theme: 'custom',
};

export {
  setupEditor,
  editorOptions,
  htmlSnippets,
  cssSnippets,
  editorTheme,
};

export type EditorLanguage = 'html' | 'css';

export interface EditorConfig {
  defaultValue: string;
  language: EditorLanguage;
  theme: string;
}

export interface EditorInstance {
  getValue(): string;
  setValue(value: string): void;
  getAction(id: string): { run(): void } | null;
  trigger(source: string, handlerId: string, payload: unknown): void;
}
