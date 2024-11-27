import type * as Monaco from 'monaco-editor';

const commonRules = [
  // Comments
  { token: 'comment', fontStyle: 'italic' },
  { token: 'comment.html', fontStyle: 'italic' },
  { token: 'comment.css', fontStyle: 'italic' },
  
  // Special
  { token: 'string' },
  { token: 'keyword' },
  { token: 'variable' },
  { token: 'operator' },
  { token: 'bracket' },
  
  // Numbers and Units
  { token: 'number.hex' },
  { token: 'number.decimal' },
  { token: 'unit.px' },
  { token: 'unit.em' },
  { token: 'unit.rem' },
  { token: 'unit.percentage' },
  
  // Functions and At-Rules
  { token: 'function' },
  { token: 'at-rule' },
  
  // Pseudo Classes/Elements
  { token: 'pseudo.class' },
  { token: 'pseudo.element' }
];

export const darkTheme: Monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    // HTML
    { token: 'tag', foreground: '#93c5fd' },
    { token: 'tag.id', foreground: '#93c5fd' },
    { token: 'tag.class', foreground: '#93c5fd' },
    { token: 'attribute.name', foreground: '#fda4af' },
    { token: 'attribute.value', foreground: '#86efac' },
    { token: 'delimiter.html', foreground: '#94a3b8' },
    { token: 'metatag.content.html', foreground: '#86efac' },
    
    // CSS
    { token: 'selector', foreground: '#93c5fd' },
    { token: 'property', foreground: '#fda4af' },
    { token: 'value', foreground: '#86efac' },
    { token: 'unit', foreground: '#86efac' },
    { token: 'number', foreground: '#86efac' },
    { token: 'delimiter.css', foreground: '#94a3b8' },
    { token: 'keyword.css', foreground: '#93c5fd' },
    
    // Comments with increased contrast
    { token: 'comment', foreground: '#94a3b8', fontStyle: 'italic' },
    { token: 'comment.html', foreground: '#94a3b8', fontStyle: 'italic' },
    { token: 'comment.css', foreground: '#94a3b8', fontStyle: 'italic' },
    
    ...commonRules.map(rule => ({
      ...rule,
      foreground: rule.token.includes('comment') ? '#94a3b8' : '#e2e8f0'
    }))
  ],
  colors: {
    'editor.background': '#0f172a',
    'editor.foreground': '#e2e8f0',
    'editor.lineHighlightBackground': '#1e293b',
    'editor.selectionBackground': '#334155',
    'editor.inactiveSelectionBackground': '#1e293b',
    'editorCursor.foreground': '#e2e8f0',
    'editorWhitespace.foreground': '#334155',
    'editorLineNumber.foreground': '#94a3b8',
    'editorLineNumber.activeForeground': '#e2e8f0',
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
    'minimap.selectionHighlight': '#334155',
    // Widget colors
    'editorSuggestWidget.background': '#1e293b',
    'editorSuggestWidget.border': '#334155',
    'editorSuggestWidget.foreground': '#e2e8f0',
    'editorSuggestWidget.highlightForeground': '#93c5fd',
    'editorSuggestWidget.selectedBackground': '#334155',
    'editorHoverWidget.background': '#1e293b',
    'editorHoverWidget.border': '#334155',
    'editorHoverWidget.foreground': '#e2e8f0',
    'editorHoverWidget.statusBarBackground': '#0f172a'
  }
};

export const lightTheme: Monaco.editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    // HTML
    { token: 'tag', foreground: '#6B8AFF' },
    { token: 'tag.id', foreground: '#6B8AFF' },
    { token: 'tag.class', foreground: '#6B8AFF' },
    { token: 'attribute.name', foreground: '#F43F5E' },
    { token: 'attribute.value', foreground: '#059669' },
    { token: 'delimiter.html', foreground: '#64748b' },
    { token: 'metatag.content.html', foreground: '#059669' },
    
    // CSS
    { token: 'selector', foreground: '#6B8AFF' },
    { token: 'property', foreground: '#F43F5E' },
    { token: 'value', foreground: '#059669' },
    { token: 'unit', foreground: '#059669' },
    { token: 'number', foreground: '#059669' },
    { token: 'delimiter.css', foreground: '#64748b' },
    { token: 'keyword.css', foreground: '#6B8AFF' },
    
    // Comments
    { token: 'comment', foreground: '#64748b', fontStyle: 'italic' },
    { token: 'comment.html', foreground: '#64748b', fontStyle: 'italic' },
    { token: 'comment.css', foreground: '#64748b', fontStyle: 'italic' },
    
    ...commonRules.map(rule => ({
      ...rule,
      foreground: rule.token.includes('comment') ? '#64748b' : '#1e293b'
    }))
  ],
  colors: {
    'editor.background': '#ffffff',
    'editor.foreground': '#1e293b',
    'editor.lineHighlightBackground': '#f1f5f9',
    'editor.selectionBackground': '#e2e8f0',
    'editor.inactiveSelectionBackground': '#f1f5f9',
    'editorCursor.foreground': '#1e293b',
    'editorWhitespace.foreground': '#e2e8f0',
    'editorLineNumber.foreground': '#64748b',
    'editorLineNumber.activeForeground': '#1e293b',
    'editor.selectionHighlightBackground': '#e2e8f0',
    'editor.wordHighlightBackground': '#e2e8f0',
    'editor.wordHighlightStrongBackground': '#cbd5e1',
    'editor.findMatchBackground': '#e2e8f0',
    'editor.findMatchHighlightBackground': '#f1f5f9',
    'editorBracketMatch.background': '#e2e8f0',
    'editorBracketMatch.border': '#cbd5e1',
    'editorGutter.background': '#ffffff',
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
    'scrollbarSlider.background': '#e2e8f080',
    'scrollbarSlider.hoverBackground': '#cbd5e1',
    'scrollbarSlider.activeBackground': '#94a3b8',
    'minimap.background': '#ffffff',
    'minimap.selectionHighlight': '#e2e8f0',
    // Widget colors
    'editorSuggestWidget.background': '#ffffff',
    'editorSuggestWidget.border': '#e2e8f0',
    'editorSuggestWidget.foreground': '#1e293b',
    'editorSuggestWidget.highlightForeground': '#6B8AFF',
    'editorSuggestWidget.selectedBackground': '#f1f5f9',
    'editorHoverWidget.background': '#ffffff',
    'editorHoverWidget.border': '#e2e8f0',
    'editorHoverWidget.foreground': '#1e293b',
    'editorHoverWidget.statusBarBackground': '#f8fafc'
  }
};

export const editorTheme = darkTheme;
