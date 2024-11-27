import type * as Monaco from 'monaco-editor';
import { cssSnippets, htmlSnippets } from './snippets';
import { editorTheme } from './theme';

export function setupEditor(monaco: typeof Monaco) {
  // Register custom theme
  monaco.editor.defineTheme('custom', editorTheme);

  // HTML Language Configuration
  monaco.languages.registerCompletionItemProvider('html', {
    provideCompletionItems: (model, position) => {
      const suggestions = Object.entries(htmlSnippets).map(([key, value]) => ({
        label: key,
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: value.description,
        insertText: value.content,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column,
          endColumn: position.column
        }
      }));

      return { suggestions };
    }
  });

  // CSS Language Configuration
  monaco.languages.registerCompletionItemProvider('css', {
    provideCompletionItems: (model, position) => {
      const suggestions = Object.entries(cssSnippets).map(([key, value]) => ({
        label: key,
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: value.description,
        insertText: value.content,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column,
          endColumn: position.column
        }
      }));

      return { suggestions };
    }
  });

  // HTML Formatting Configuration
  monaco.languages.registerDocumentFormattingEditProvider('html', {
    provideDocumentFormattingEdits: (model) => {
      const text = model.getValue();
      const formatted = formatHTML(text);
      return [{
        range: model.getFullModelRange(),
        text: formatted
      }];
    }
  });

  // CSS Formatting Configuration
  monaco.languages.registerDocumentFormattingEditProvider('css', {
    provideDocumentFormattingEdits: (model) => {
      const text = model.getValue();
      const formatted = formatCSS(text);
      return [{
        range: model.getFullModelRange(),
        text: formatted
      }];
    }
  });
}

function formatHTML(html: string): string {
  let formatted = '';
  let indent = 0;
  const lines = html.split(/>\s*</);
  
  lines.forEach((line, i) => {
    if (line.match(/^\/\w/)) indent--;
    formatted += '\n' + '  '.repeat(indent) + line.trim() + (i < lines.length - 1 ? '>' : '') + (i === 0 ? '' : '<');
    if (!line.match(/^\//) && line.match(/^[\w\-]+(?!\/)/) && !line.match(/\/$/)) indent++;
  });
  
  return formatted.trim();
}

function formatCSS(css: string): string {
  return css
    .replace(/\s*{\s*/g, ' {\n  ')
    .replace(/\s*}\s*/g, '\n}\n')
    .replace(/;\s*/g, ';\n  ')
    .replace(/,\s*/g, ', ')
    .replace(/\n\s*\n/g, '\n')
    .replace(/\n\s*}/g, '\n}')
    .trim();
}

export const editorOptions = {
  theme: 'custom',
  fontSize: 14,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  minimap: { enabled: false },
  lineNumbers: 'on',
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
  wordWrap: 'on',
  formatOnPaste: true,
  formatOnType: true,
  suggestOnTriggerCharacters: true,
  quickSuggestions: {
    other: true,
    comments: true,
    strings: true
  }
};
