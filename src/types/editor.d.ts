import type * as Monaco from 'monaco-editor';
import type { EditorLanguage } from '~/config/editor';

export type MonacoEditor = Monaco.editor.IStandaloneCodeEditor;

export interface EditorRef {
  editor: MonacoEditor | null;
  formatCode: () => void;
  showSuggestions: () => void;
}

export interface EditorProps {
  defaultValue?: string;
  language?: EditorLanguage;
  onChange?: (value: string) => void;
  onSave?: () => void;
  readOnly?: boolean;
  height?: string | number;
  width?: string | number;
  className?: string;
  options?: Monaco.editor.IStandaloneEditorConstructionOptions;
}

export interface EditorTheme extends Monaco.editor.IStandaloneThemeData {
  colors: {
    [key: string]: string;
  };
}

export interface EditorSnippet {
  description: string;
  content: string;
}

export interface EditorSnippets {
  [key: string]: EditorSnippet;
}

export interface EditorInstance {
  getValue(): string;
  setValue(value: string): void;
  getAction(id: string): { run(): void } | null;
  trigger(source: string, handlerId: string, payload: unknown): void;
  layout(): void;
  focus(): void;
  dispose(): void;
}

export interface EditorError {
  message: string;
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
  source?: string;
}

export interface EditorValidation {
  errors: EditorError[];
  warnings: EditorError[];
}
