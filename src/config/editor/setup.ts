import type * as Monaco from 'monaco-editor';
import { cssSnippets, htmlSnippets } from './snippets';
import { darkTheme, lightTheme } from './theme';

export function setupEditor(monaco: typeof Monaco) {
  // Register themes
  monaco.editor.defineTheme('custom-dark', darkTheme);
  monaco.editor.defineTheme('custom-light', lightTheme);

  // Set theme based on system preference - only run on client side
  if (typeof window !== 'undefined') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    monaco.editor.setTheme(prefersDark ? 'custom-dark' : 'custom-light');

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      monaco.editor.setTheme(e.matches ? 'custom-dark' : 'custom-light');
    });
  }

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

  // Add custom hover providers - only run on client side
  if (typeof window !== 'undefined') {
    monaco.languages.registerHoverProvider('css', {
      provideHover: (model, position) => {
        const word = model.getWordAtPosition(position);
        if (!word) return null;

        // Color value hover
        if (word.word.match(/^#[0-9a-fA-F]{3,8}$/)) {
          return {
            contents: [
              { value: '**Color Preview**' },
              {
                value: `\`${word.word}\`\n\n<div style="width: 20px; height: 20px; background: ${word.word}; border: 1px solid #ccc;"></div>`
              }
            ],
            range: {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn
            }
          };
        }

        // Unit value hover
        if (word.word.match(/^\d+(.?\d+)?(px|em|rem|vh|vw|%)$/)) {
          return {
            contents: [
              { value: '**Unit Value**' },
              { value: `\`${word.word}\` - CSS measurement unit` }
            ],
            range: {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn
            }
          };
        }

        return null;
      }
    });
  }
}

function formatHTML(html: string): string {
  let formatted = '';
  let indent = 0;
  const lines = html.split(/>\s*</);
  
  lines.forEach((line, i) => {
    // Handle self-closing tags
    if (line.match(/\/$/)) {
      formatted += '\n' + '  '.repeat(indent) + line.trim() + (i < lines.length - 1 ? '>' : '') + (i === 0 ? '' : '<');
      return;
    }

    // Handle closing tags
    if (line.match(/^\/\w/)) {
      indent = Math.max(0, indent - 1);
      formatted += '\n' + '  '.repeat(indent) + line.trim() + (i < lines.length - 1 ? '>' : '') + (i === 0 ? '' : '<');
      return;
    }

    // Handle opening tags
    formatted += '\n' + '  '.repeat(indent) + line.trim() + (i < lines.length - 1 ? '>' : '') + (i === 0 ? '' : '<');
    if (!line.match(/^\//) && line.match(/^[\w\-]+(?!\/)/) && !line.match(/\/$/)) {
      indent++;
    }
  });
  
  return formatted.trim();
}

function formatCSS(css: string): string {
  // Remove extra whitespace
  css = css.replace(/\s+/g, ' ').trim();

  // Format selectors
  css = css.replace(/\s*{\s*/g, ' {\n  ');
  css = css.replace(/\s*}\s*/g, '\n}\n\n');

  // Format properties
  css = css.replace(/;\s*/g, ';\n  ');
  css = css.replace(/:\s*/g, ': ');

  // Format media queries
  css = css.replace(/@media[^{]+{\s*/g, (match) => match.trim() + '\n  ');

  // Clean up extra newlines
  css = css.replace(/\n\s*\n/g, '\n\n');
  css = css.replace(/\n\s*}/g, '\n}');

  return css.trim();
}

export const editorOptions = {
  theme: 'custom-dark',
  fontSize: 15,
  lineHeight: 1.6,
  letterSpacing: 0.5,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  minimap: { enabled: false },
  lineNumbers: "on",
  roundedSelection: false,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  padding: { top: 16 },
  wordWrap: "on",
  formatOnPaste: true,
  formatOnType: true,
  tabSize: 2,
  renderLineHighlight: "all",
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: "on",
  cursorBlinking: "smooth",
  cursorSmoothCaretAnimation: "on",
  smoothScrolling: true,
  folding: true,
  lineDecorationsWidth: 10,
  scrollbar: {
    useShadows: false,
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8,
  },
  overviewRulerBorder: false,
  overviewRulerLanes: 0,
  hideCursorInOverviewRuler: true,
  glyphMargin: false,
  quickSuggestions: {
    other: true,
    comments: true,
    strings: true,
  },
  contextmenu: true,
  mouseWheelZoom: true,
  suggest: {
    showKeywords: true,
    showSnippets: true,
    showClasses: true,
    showColors: true,
    showFiles: true,
    showFunctions: true,
    showModules: true,
    showProperties: true,
    showWords: true,
    showValues: true,
  },
  hover: {
    above: false,
    delay: 100,
    sticky: true
  },
  parameterHints: {
    enabled: true,
    cycle: true
  },
  fixedOverflowWidgets: true
};
