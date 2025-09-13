import { Panel, PanelGroup } from "react-resizable-panels";
import EditorPane from "../../components/EditorPane/EditorPane";
import PreviewPane from "../../components/PreviewPane/PreviewPane";
import "./Playground.scss";
import ResizeHandle from "../../components/ResizeHandle/ResizeHandle";
import MenuBar from "../../components/MenuBar/MenuBar";
import { useState } from "react";

const Playground = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  return (
    <div className="playground">
      <MenuBar html={html} css={css} js={js} />
      <PanelGroup
        direction="vertical"
        autoSaveId="main-vertical"
        className="panel-group-vertical"
      >
        <Panel defaultSize={50}>
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
};

export default Playground;
