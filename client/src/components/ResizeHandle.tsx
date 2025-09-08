import { Split } from "lucide-react";
import { PanelResizeHandle } from "react-resizable-panels";

const ResizeHandle = () => {
  return (
    <PanelResizeHandle className="resize-outer">
      <div className="resizeInner">
        <Split stroke="#8890ba" size={12} />
      </div>
    </PanelResizeHandle>
  );
};

export default ResizeHandle;
