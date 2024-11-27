"use client";

import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import type * as Monaco from 'monaco-editor';
import { setupEditor } from "~/config/editor";
import type { EditorProps } from "~/types/components";
import { useTheme } from "./ThemeProvider";
import { ValidationMessage } from "./ValidationMessage";

const KEYBOARD_SHORTCUTS = [
  { key: 'Ctrl + Space', description: 'Show suggestions' },
  { key: 'Ctrl + S', description: 'Format code' },
  { key: 'Ctrl + /', description: 'Toggle comment' },
  { key: 'Alt + ↑/↓', description: 'Move line up/down' },
  { key: 'Ctrl + ]', description: 'Indent line' },
  { key: 'Ctrl + [', description: 'Outdent line' },
  { key: 'Ctrl + F', description: 'Find' },
  { key: 'Ctrl + H', description: 'Replace' },
  { key: 'Alt + Click', description: 'Add cursor' },
  { key: 'Ctrl + Z', description: 'Undo' },
  { key: 'Ctrl + Y', description: 'Redo' },
];

export function Editor({ 
  defaultValue = "", 
  onChange, 
  language = "css",
  value
}: EditorProps) {
  const [mounted, setMounted] = useState(false);
  const [editor, setEditor] = useState<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { theme } = useTheme();

  // Wait for client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update editor value when prop changes
  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getValue()) {
      editor.setValue(value);
    }
  }, [editor, value]);

  // Update editor theme when app theme changes
  useEffect(() => {
    if (editor) {
      editor.updateOptions({
        theme: theme === 'dark' ? 'custom-dark' : 'custom-light'
      });
    }
  }, [editor, theme]);

  // Validate HTML syntax
  const validateHtml = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const errors = Array.from(doc.querySelectorAll('parsererror'));
    return errors.length ? errors[0].textContent : null;
  };

  // Validate CSS syntax
  const validateCss = (content: string) => {
    try {
      const style = document.createElement('style');
      style.textContent = content;
      document.head.appendChild(style);
      document.head.removeChild(style);
      return null;
    } catch (error) {
      return error instanceof Error ? error.message : 'Invalid CSS syntax';
    }
  };

  // Handle editor initialization
  const handleEditorDidMount = (editor: Monaco.editor.IStandaloneCodeEditor, monaco: typeof Monaco) => {
    setEditor(editor);

    // Set initial value
    if (value !== undefined) {
      editor.setValue(value);
    }

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      editor.getAction('editor.action.formatDocument')?.run();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP, () => {
      editor.trigger('keyboard', 'editor.action.triggerSuggest', {});
    });

    // Add context menu actions
    editor.addAction({
      id: 'format-code',
      label: 'Format Code',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      contextMenuGroupId: 'modification',
      run: (ed) => {
        ed.getAction('editor.action.formatDocument')?.run();
      }
    });

    editor.addAction({
      id: 'toggle-suggestions',
      label: 'Show Suggestions',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP],
      contextMenuGroupId: 'help',
      run: (ed) => {
        ed.trigger('keyboard', 'editor.action.triggerSuggest', {});
      }
    });

    // Language-specific actions
    if (language === 'html') {
      editor.addAction({
        id: 'wrap-with-div',
        label: 'Wrap with div',
        contextMenuGroupId: 'modification',
        run: (ed) => {
          const selection = ed.getSelection();
          if (selection) {
            const text = ed.getModel()?.getValueInRange(selection) || '';
            ed.executeEdits('wrap-with-div', [{
              range: selection,
              text: `<div>\n  ${text}\n</div>`
            }]);
          }
        }
      });
    }

    if (language === 'css') {
      editor.addAction({
        id: 'insert-color',
        label: 'Insert Color',
        contextMenuGroupId: 'modification',
        run: (ed) => {
          ed.trigger('keyboard', 'editor.action.quickCommand', {});
        }
      });
    }

    // Add validation on content change
    editor.onDidChangeModelContent(() => {
      const content = editor.getValue();
      
      // Clear previous error
      setValidationError(null);

      // Skip validation for empty content
      if (!content.trim()) return;

      // Validate based on language
      const error = language === 'html' 
        ? validateHtml(content)
        : validateCss(content);

      if (error) {
        setValidationError(error);
      }
    });
  };

  // Handle editor setup before mount
  const handleEditorWillMount = (monaco: typeof Monaco) => {
    setupEditor(monaco);
  };

  // Handle editor changes
  const handleEditorChange = (value: string | undefined) => {
    onChange?.(value || "");
  };

  if (!mounted) {
    return (
      <div className="h-full flex items-center justify-center bg-muted text-muted-foreground">
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm">Loading editor...</div>
          <div className="text-xs text-muted-foreground">
            Press Ctrl+Space for suggestions
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {/* Editor Controls */}
      <div className="absolute top-0 right-0 z-[100] flex items-center gap-2 p-2">
        <button
          onClick={() => editor?.getAction('editor.action.formatDocument')?.run()}
          className="p-1.5 rounded-md text-[#6B8AFF]/80 hover:text-[#6B8AFF] dark:text-muted-foreground dark:hover:text-foreground transition-colors"
          title="Format Code (Ctrl + S)"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <button
          onClick={() => editor?.trigger('keyboard', 'editor.action.triggerSuggest', {})}
          className="p-1.5 rounded-md text-[#6B8AFF]/80 hover:text-[#6B8AFF] dark:text-muted-foreground dark:hover:text-foreground transition-colors"
          title="Show Suggestions (Ctrl + Space)"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </button>
        <div className="relative">
          <button
            onClick={() => setShowShortcuts(prev => !prev)}
            className="p-1.5 rounded-md text-[#6B8AFF]/80 hover:text-[#6B8AFF] dark:text-muted-foreground dark:hover:text-foreground transition-colors"
            title="Keyboard Shortcuts"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          {showShortcuts && (
            <div 
              className="fixed top-12 right-4 w-64 p-4 rounded-lg bg-card/30 backdrop-blur-sm border border-border/40 shadow-lg z-[9999]"
              style={{ 
                maxHeight: 'calc(100vh - 6rem)',
                overflowY: 'auto'
              }}
            >
              <div className="text-sm font-medium text-[#6B8AFF] dark:text-foreground mb-2">Keyboard Shortcuts</div>
              <div className="space-y-2">
                {KEYBOARD_SHORTCUTS.map(({ key, description }) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span className="font-mono text-[#6B8AFF]/80 dark:text-muted-foreground">{key}</span>
                    <span className="text-[#6B8AFF]/60 dark:text-muted-foreground">{description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Editor Instance */}
      <div className="h-full w-full overflow-hidden rounded-md border border-border/40 bg-background">
        <MonacoEditor
          defaultValue={defaultValue}
          value={value}
          language={language}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          options={{
            theme: theme === 'dark' ? 'custom-dark' : 'custom-light',
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
          }}
        />
      </div>

      {/* Validation Message */}
      {validationError && (
        <div className="absolute bottom-4 right-4 z-[9999]">
          <ValidationMessage 
            type="error" 
            message={validationError}
            onClose={() => setValidationError(null)}
          />
        </div>
      )}

      {/* Portal container for Monaco editor widgets */}
      <div id="monaco-editor-widgets" className="fixed left-0 top-0 z-[9999]" />
    </div>
  );
}
