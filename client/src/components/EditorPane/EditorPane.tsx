import React from "react";
import Editor from "@monaco-editor/react";
import { ClipLoader } from "react-spinners";
import "./EditorPane.scss";

const editorIcons = [
  {
    name: "html",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "css",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    name: "javascript",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg",
  },
];

interface Props {
  language: "html" | "css" | "javascript";
  value: string;
  onChange: (value: string) => void;
}

const EditorPane: React.FC<Props> = ({ language, value, onChange }) => {
  const handleChange = (val: string | undefined) => {
    onChange(val || "");
  };

  const filteredIcon = editorIcons.find((icon) => icon.name === language)?.src;

  return (
    <div className="editor-pane">
      <h3>
        {filteredIcon && (
          <img src={filteredIcon} alt={language} className="editor-icon" />
        )}
        {language.toUpperCase()}
      </h3>
      <Editor
        height="100%"
        language={language}
        value={value}
        theme="vs-dark"
        onChange={handleChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          automaticLayout: true,
        }}
        loading={
          <div className="loader-container">
            <ClipLoader color="#ff79c6" size={20} />
          </div>
        }
      />
    </div>
  );
};

export default EditorPane;
