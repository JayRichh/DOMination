import type * as Monaco from 'monaco-editor';

export const editorTheme: Monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    // HTML
    { token: 'tag', foreground: '#7dd3fc' },
    { token: 'tag.id', foreground: '#7dd3fc' },
    { token: 'tag.class', foreground: '#7dd3fc' },
    { token: 'attribute.name', foreground: '#fda4af' },
    { token: 'attribute.value', foreground: '#86efac' },
    { token: 'delimiter.html', foreground: '#94a3b8' },
    { token: 'metatag.content.html', foreground: '#86efac' },
    
    // CSS
    { token: 'selector', foreground: '#7dd3fc' },
    { token: 'property', foreground: '#fda4af' },
    { token: 'value', foreground: '#86efac' },
    { token: 'unit', foreground: '#86efac' },
    { token: 'number', foreground: '#86efac' },
    { token: 'delimiter.css', foreground: '#94a3b8' },
    { token: 'keyword.css', foreground: '#7dd3fc' },
    
    // Comments
    { token: 'comment', foreground: '#64748b', fontStyle: 'italic' },
    { token: 'comment.html', foreground: '#64748b', fontStyle: 'italic' },
    { token: 'comment.css', foreground: '#64748b', fontStyle: 'italic' },
    
    // Special
    { token: 'string', foreground: '#86efac' },
    { token: 'keyword', foreground: '#7dd3fc' },
    { token: 'variable', foreground: '#fda4af' },
    { token: 'operator', foreground: '#94a3b8' },
    { token: 'bracket', foreground: '#94a3b8' },
    
    // Numbers and Units
    { token: 'number.hex', foreground: '#86efac' },
    { token: 'number.decimal', foreground: '#86efac' },
    { token: 'unit.px', foreground: '#86efac' },
    { token: 'unit.em', foreground: '#86efac' },
    { token: 'unit.rem', foreground: '#86efac' },
    { token: 'unit.percentage', foreground: '#86efac' },
    
    // Functions and At-Rules
    { token: 'function', foreground: '#7dd3fc' },
    { token: 'at-rule', foreground: '#7dd3fc' },
    
    // Pseudo Classes/Elements
    { token: 'pseudo.class', foreground: '#fda4af' },
    { token: 'pseudo.element', foreground: '#fda4af' }
  ],
  colors: {
    'editor.background': '#0f172a',
    'editor.foreground': '#e2e8f0',
    'editor.lineHighlightBackground': '#1e293b',
    'editor.selectionBackground': '#334155',
    'editor.inactiveSelectionBackground': '#1e293b',
    'editorCursor.foreground': '#e2e8f0',
    'editorWhitespace.foreground': '#334155',
    'editorLineNumber.foreground': '#64748b',
    'editorLineNumber.activeForeground': '#94a3b8',
    'editor.selectionHighlightBackground': '#334155',
    'editor.wordHighlightBackground': '#334155',
    'editor.wordHighlightStrongBackground': '#475569',
    'editor.findMatchBackground': '#334155',
    'editor.findMatchHighlightBackground': '#1e293b',
    'editorBracketMatch.background': '#334155',
    'editorBracketMatch.border': '#475569',
    'editorGutter.background': '#0f172a',
    'editorError.foreground': '#ef4444',
    'editorWarning.foreground': '#f59e0b',
    'editorInfo.foreground': '#3b82f6',
    'editorHint.foreground': '#22c55e',
    'editorGutter.modifiedBackground': '#3b82f6',
    'editorGutter.addedBackground': '#22c55e',
    'editorGutter.deletedBackground': '#ef4444',
    'diffEditor.insertedTextBackground': '#22c55e33',
    'diffEditor.removedTextBackground': '#ef444433',
    'scrollbar.shadow': '#00000000',
    'scrollbarSlider.background': '#33415580',
    'scrollbarSlider.hoverBackground': '#475569',
    'scrollbarSlider.activeBackground': '#64748b',
    'minimap.background': '#0f172a',
    'minimap.selectionHighlight': '#334155'
  }
};
