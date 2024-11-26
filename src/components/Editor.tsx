"use client";

import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import type * as Monaco from 'monaco-editor';
import { setupEditor, editorOptions, defaultEditorConfig } from "~/config/editor";
import type { EditorProps } from "~/types/components";

export function Editor({ defaultValue = defaultEditorConfig.defaultValue, onChange }: EditorProps) {
  const [mounted, setMounted] = useState(false);
  const [editor, setEditor] = useState<Monaco.editor.IStandaloneCodeEditor | null>(null);

  // Wait for client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle editor initialization
  const handleEditorDidMount = (editor: Monaco.editor.IStandaloneCodeEditor, monaco: typeof Monaco) => {
    setEditor(editor);

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Format the code
      editor.getAction('editor.action.formatDocument')?.run();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP, () => {
      // Toggle CSS property suggestions
      editor.trigger('keyboard', 'editor.action.triggerSuggest', {});
    });

    // Add context menu actions
    editor.addAction({
      id: 'format-css',
      label: 'Format CSS',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      contextMenuGroupId: 'modification',
      run: (ed) => {
        ed.getAction('editor.action.formatDocument')?.run();
      }
    });

    editor.addAction({
      id: 'toggle-suggestions',
      label: 'Show CSS Suggestions',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP],
      contextMenuGroupId: 'help',
      run: (ed) => {
        ed.trigger('keyboard', 'editor.action.triggerSuggest', {});
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
    <div className="h-full w-full overflow-hidden rounded-md border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="text-sm font-medium">CSS Editor</div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground">
            Ctrl+S to format • Ctrl+Space for suggestions
          </div>
        </div>
      </div>
      <MonacoEditor
        defaultValue={defaultValue}
        language={defaultEditorConfig.language}
        theme={defaultEditorConfig.theme}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
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
