import type { CssSnippet } from "~/types/editor";

export const cssSnippets: CssSnippet[] = [
  {
    label: "transform",
    detail: "CSS transform property",
    insertText: "transform: ${1:translate(0, 0)};",
    documentation: "Transform an element with translate, rotate, scale, etc.",
  },
  {
    label: "border-radius",
    detail: "CSS border-radius property",
    insertText: "border-radius: ${1:0};",
    documentation: "Round the corners of an element",
  },
  {
    label: "background",
    detail: "CSS background property",
    insertText: "background: ${1:#000};",
    documentation: "Set the background color or image",
  },
  {
    label: "position",
    detail: "CSS position property",
    insertText: "position: ${1:absolute};",
    documentation: "Set the positioning method",
  },
  {
    label: "box-shadow",
    detail: "CSS box-shadow property",
    insertText: "box-shadow: ${1:0} ${2:0} ${3:0} ${4:#000};",
    documentation: "Add shadow effects to an element",
  },
  {
    label: "gradient",
    detail: "CSS gradient background",
    insertText: "background: linear-gradient(${1:45deg}, ${2:#000} ${3:0%}, ${4:#fff} ${5:100%});",
    documentation: "Create a gradient background",
  },
];

export const cssProperties = [
  "align-content",
  "align-items",
  "align-self",
  "animation",
  "background",
  "background-color",
  "background-image",
  "border",
  "border-radius",
  "box-shadow",
  "color",
  "content",
  "cursor",
  "display",
  "filter",
  "flex",
  "font-size",
  "height",
  "justify-content",
  "left",
  "margin",
  "opacity",
  "overflow",
  "padding",
  "position",
  "right",
  "top",
  "transform",
  "transition",
  "width",
  "z-index",
] as const;

export const cssValues = [
  "absolute",
  "auto",
  "center",
  "cover",
  "fixed",
  "flex",
  "grid",
  "hidden",
  "inherit",
  "initial",
  "none",
  "relative",
  "solid",
  "space-between",
  "transparent",
  "unset",
] as const;

export const cssFunctions = [
  "calc",
  "clamp",
  "linear-gradient",
  "radial-gradient",
  "repeat",
  "rgb",
  "rgba",
  "rotate",
  "scale",
  "translate",
  "var",
] as const;

// Helper to create completion items
export function createCompletionItem(
  monaco: any,
  label: string,
  kind: number,
  insertText: string,
  range: any,
  documentation?: string
) {
  return {
    label,
    kind,
    insertText,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range,
    documentation: { value: documentation || label },
  };
}
