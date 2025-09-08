import React from "react";
import Editor, { type OnChange } from "@monaco-editor/react";

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
      />
    </div>
  );
};

export default EditorPane;
