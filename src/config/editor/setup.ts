import type * as Monaco from 'monaco-editor';
import { cssSnippets, cssProperties, cssValues, cssFunctions, createCompletionItem } from './snippets';
import { editorTheme, editorOptions } from './theme';

export function setupEditor(monaco: typeof Monaco) {
  // Set up theme
  monaco.editor.defineTheme('css-battle', editorTheme);
  monaco.editor.setTheme('css-battle');

  // Register CSS language features
  monaco.languages.registerCompletionItemProvider('css', {
    provideCompletionItems: (model: Monaco.editor.ITextModel, position: Monaco.Position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions = [
        // CSS Properties
        ...cssProperties.map(prop => 
          createCompletionItem(
            monaco,
            prop,
            monaco.languages.CompletionItemKind.Property,
            `${prop}: $1;`,
            range,
            `CSS Property: ${prop}`
          )
        ),

        // CSS Values
        ...cssValues.map(value =>
          createCompletionItem(
            monaco,
            value,
            monaco.languages.CompletionItemKind.Value,
            value,
            range,
            `CSS Value: ${value}`
          )
        ),

        // CSS Functions
        ...cssFunctions.map(func =>
          createCompletionItem(
            monaco,
            func,
            monaco.languages.CompletionItemKind.Function,
            `${func}($1)`,
            range,
            `CSS Function: ${func}`
          )
        ),

        // CSS Snippets
        ...cssSnippets.map(snippet =>
          createCompletionItem(
            monaco,
            snippet.label,
            monaco.languages.CompletionItemKind.Snippet,
            snippet.insertText,
            range,
            snippet.documentation
          )
        ),
      ];

      return { suggestions };
    },
  });

  // Register hover provider
  monaco.languages.registerHoverProvider('css', {
    provideHover: (model: Monaco.editor.ITextModel, position: Monaco.Position) => {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const text = word.word;
      const range = {
        startLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn,
      };

      // Check if word is a CSS property
      if (cssProperties.includes(text as any)) {
        return {
          range,
          contents: [
            { value: `**${text}**` },
            { value: `CSS Property: ${text}` },
          ],
        };
      }

      // Check if word is a CSS value
      if (cssValues.includes(text as any)) {
        return {
          range,
          contents: [
            { value: `**${text}**` },
            { value: `CSS Value: ${text}` },
          ],
        };
      }

      // Check if word is a CSS function
      if (cssFunctions.includes(text as any)) {
        return {
          range,
          contents: [
            { value: `**${text}**` },
            { value: `CSS Function: ${text}` },
          ],
        };
      }

      return null;
    },
  });

  // Register formatting provider
  monaco.languages.registerDocumentFormattingEditProvider('css', {
    provideDocumentFormattingEdits: (model: Monaco.editor.ITextModel) => {
      const text = model.getValue();
      const formatted = text
        .replace(/\s*{\s*/g, ' {\n  ')
        .replace(/\s*}\s*/g, '\n}\n')
        .replace(/;\s*/g, ';\n  ')
        .replace(/\n\s*\n/g, '\n')
        .trim();

      return [
        {
          range: model.getFullModelRange(),
          text: formatted,
        },
      ];
    },
  });

  return {
    theme: editorTheme,
    options: editorOptions,
  };
}
