import React, { useEffect, useRef } from "react";
import "./PreviewPane.scss";

interface Props {
  html: string;
  css: string;
  js: string;
}

const PreviewPane: React.FC<Props> = ({ html, css, js }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Use srcdoc and make the script a module so import/export works
    iframe.srcdoc = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script type="module">
          ${js}
        </script>
      </body>
      </html>`;
  }, [html, css, js]);

  return <iframe ref={iframeRef} className="preview-pane" />;
};

export default PreviewPane;
