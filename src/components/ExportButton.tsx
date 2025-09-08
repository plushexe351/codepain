import React from "react";
import { saveAs } from "file-saver";

interface Props {
  html: string;
  css: string;
  js: string;
}

const ExportButton: React.FC<Props> = ({ html, css, js }) => {
  const handleExport = () => {
    const blobHtml = new Blob(
      [
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  ${html}
  <script src="script.js"></script>
</body>
</html>`,
      ],
      { type: "text/html;charset=utf-8" }
    );

    const blobCss = new Blob([css], { type: "text/css;charset=utf-8" });
    const blobJs = new Blob([js], { type: "text/javascript;charset=utf-8" });

    saveAs(blobHtml, "index.html");
    saveAs(blobCss, "style.css");
    saveAs(blobJs, "script.js");
  };

  return <button onClick={handleExport}>Export Code</button>;
};

export default ExportButton;
