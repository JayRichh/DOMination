"use client";

import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import type * as Monaco from 'monaco-editor';
import { setupEditor, editorOptions, defaultEditorConfig } from "~/config/editor";
import type { EditorProps } from "~/types/components";

export function Editor({ 
  defaultValue = defaultEditorConfig.defaultValue, 
  onChange, 
  language = "css",
  value
}: EditorProps) {
  const [mounted, setMounted] = useState(false);
  const [editor, setEditor] = useState<Monaco.editor.IStandaloneCodeEditor | null>(null);

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
    <div className="h-full w-full overflow-hidden rounded-md border border-border bg-background">
      <MonacoEditor
        defaultValue={defaultValue}
        value={value}
        language={language}
        theme={defaultEditorConfig.theme}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          ...editorOptions,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
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
        }}
      />
    </div>
  );
}
