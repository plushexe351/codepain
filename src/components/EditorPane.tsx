import React from "react";
import Editor, { type OnChange } from "@monaco-editor/react";
import { ClipLoader } from "react-spinners";

interface Props {
  language: "html" | "css" | "javascript";
  value: string;
  onChange: (value: string) => void;
}

const EditorPane: React.FC<Props> = ({ language, value, onChange }) => {
  const handleChange: OnChange = (val) => {
    onChange(val || "");
  };

  return (
    <div className="editor-pane">
      <h3>{language.toUpperCase()}</h3>
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
