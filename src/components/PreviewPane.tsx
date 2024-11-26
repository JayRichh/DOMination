"use client";

import { useEffect, useRef } from "react";
import type { PreviewPaneProps } from "~/types/components";

export function PreviewPane({ html, css, backgroundColor }: PreviewPaneProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    // Reset any existing content
    doc.open();
    
    // Create the HTML structure with applied CSS
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
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

            /* User CSS */
            ${css}
          </style>
        </head>
        <body>
          <div class="center-container">
            ${html}
          </div>
        </body>
      </html>
    `;

    // Write the content to the iframe
    doc.write(content);
    doc.close();

    // Force a repaint
    iframe.style.display = 'none';
    iframe.offsetHeight; // Force reflow
    iframe.style.display = '';

  }, [html, css, backgroundColor]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-background border border-border">
      {/* Preview Grid */}
      <div className="absolute inset-0 preview-grid opacity-30" />
      
      {/* Preview Content */}
      <iframe
        ref={iframeRef}
        className="w-full h-full"
        sandbox="allow-scripts"
        title="Preview"
      />

      {/* Overlay for click protection */}
      <div className="absolute inset-0 pointer-events-none" />
    </div>
  );
}
