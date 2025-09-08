import type React from "react";
import ExportButton from "./ExportButton";
import logo from "../assets/logo.png";

interface Props {
  html: string;
  css: string;
  js: string;
}

const MenuBar: React.FC<Props> = ({ html, css, js }) => {
  return (
    <div className="menubar">
      <h1 className="logo">
        <img src={logo} alt="" className="logo-img" />
        Code<span>pain</span>
      </h1>
      {(html || css || js) && <ExportButton html={html} css={css} js={js} />}
    </div>
  );
};

export default MenuBar;
