import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import EditorPane from "./components/EditorPane";
import PreviewPane from "./components/PreviewPane";
import "./App.css";
import ResizeHandle from "./components/ResizeHandle";
import MenuBar from "./components/MenuBar";

function App() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  return (
    <div className="app">
      {/* Vertical split: Editors on top, Preview below */}
      <MenuBar html={html} css={css} js={js} />
      {/* <div style={{ padding: "5px" }}>
        <ExportButton html={html} css={css} js={js} />
      </div> */}
      <PanelGroup
        direction="vertical"
        autoSaveId="main-vertical"
        className="panel-group-vertical"
      >
        <Panel defaultSize={50}>
          {/* Horizontal split for HTML / CSS / JS editors */}
          <PanelGroup
            direction="horizontal"
            autoSaveId="editor-horizontal"
            className="panel-group-horizontal"
          >
            <Panel minSize={20} defaultSize={33}>
              <EditorPane language="html" value={html} onChange={setHtml} />
            </Panel>
            <ResizeHandle />
            <Panel minSize={20} defaultSize={33}>
              <EditorPane language="css" value={css} onChange={setCss} />
            </Panel>
            <ResizeHandle />

            <Panel minSize={20} defaultSize={33}>
              <EditorPane language="javascript" value={js} onChange={setJs} />
            </Panel>
          </PanelGroup>
        </Panel>
        <ResizeHandle />

        <Panel defaultSize={50}>
          <PreviewPane html={html} css={css} js={js} />
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default App;
