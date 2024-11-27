"use client";

import { useMemo } from "react";
import type { PreviewPaneProps } from "~/types/components";

export function PreviewPane({ html, css, backgroundColor }: PreviewPaneProps) {
  const content = useMemo(() => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html, body {
            width: 100%;
            height: 100vh;
            overflow: hidden;
            background-color: ${backgroundColor};
          }

          body {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }

          /* Center container */
          .center-container {
            position: relative;
            width: 400px;
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Error styles */
          .error {
            color: #ef4444;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 14px;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 0.5rem;
            white-space: pre-wrap;
          }

          /* User CSS */
          ${css}
        </style>
      </head>
      <body>
        <div class="center-container">
          ${html}
        </div>
        <script>
          window.onerror = function(msg, url, line, col, error) {
            const container = document.querySelector('.center-container');
            if (container) {
              container.innerHTML = '<div class="error">Error: ' + msg + '</div>';
            }
            return false;
          };

          // Prevent any form of script injection
          document.querySelectorAll('script').forEach(script => {
            if (script !== document.currentScript) {
              script.remove();
            }
          });

          // Remove potentially harmful attributes
          document.querySelectorAll('*').forEach(element => {
            ['onclick', 'onload', 'onerror', 'onmouseover'].forEach(attr => {
              element.removeAttribute(attr);
            });
          });
        </script>
      </body>
    </html>
  `, [html, css, backgroundColor]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-background border border-border">
      {/* Preview Grid */}
      <div className="absolute inset-0 preview-grid opacity-30" />
      
      {/* Preview Content */}
      <iframe
        srcDoc={content}
        className="w-full h-full"
        sandbox="allow-scripts"
        title="Preview"
      />

      {/* Overlay for click protection */}
      <div className="absolute inset-0 pointer-events-none" />
    </div>
  );
}
