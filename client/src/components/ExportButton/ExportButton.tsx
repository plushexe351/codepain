import React from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import "./ExportButton.scss";

interface Props {
  html: string;
  css: string;
  js: string;
}

const ExportButton: React.FC<Props> = ({ html, css, js }) => {
  const handleExport = async () => {
    const zip = new JSZip();

    zip.file(
      "index.html",
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
</html>`
    );

    zip.file("style.css", css);
    zip.file("script.js", js);

    const content = await zip.generateAsync({ type: "blob" });

    saveAs(content, "code-export.zip");
  };

  return <button onClick={handleExport}>Export Code</button>;
};

export default ExportButton;
