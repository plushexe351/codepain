import React, { useEffect, useRef } from "react";

interface Props {
  html: string;
  css: string;
  js: string;
}

const PreviewPane: React.FC<Props> = ({ html, css, js }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}<\/script>
      </body>
      </html>
    `);
    doc.close();
  }, [html, css, js]);

  return <iframe ref={iframeRef} className="preview-pane" />;
};

export default PreviewPane;
