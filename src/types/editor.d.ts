import type * as Monaco from 'monaco-editor';

export interface MonacoTheme extends Monaco.editor.IStandaloneThemeData {}
export interface MonacoEditor extends Monaco.editor.IStandaloneCodeEditor {}
export interface MonacoCompletionItem extends Monaco.languages.CompletionItem {}
export interface MonacoRange extends Monaco.IRange {}
export interface MonacoPosition extends Monaco.Position {}

export interface CssSnippet {
  label: string;
  detail: string;
  insertText: string;
  documentation: string;
}

export interface EditorConfig {
  theme: MonacoTheme;
  options: Monaco.editor.IStandaloneEditorConstructionOptions;
  completions: {
    css: CssSnippet[];
    properties: string[];
    values: string[];
    functions: string[];
  };
}
