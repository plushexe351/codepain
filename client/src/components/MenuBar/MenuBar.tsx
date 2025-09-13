import type React from "react";
import ExportButton from "../ExportButton/ExportButton";
import logo from "../../assets/logo.png";
import "./MenuBar.scss";
import { Typography } from "@mui/material";

interface Props {
  html: string;
  css: string;
  js: string;
}

const MenuBar: React.FC<Props> = ({ html, css, js }) => {
  return (
    <div className="menubar">
      <Typography
        className="logo"
        sx={{
          fontFamily: `"Courier New", sans-serif`,
          fontSize: 20,
          fontWeight: 600,
          color: "white",
        }}
      >
        <img src={logo} alt="" className="logo-img" />
        Code<span>pain</span>
      </Typography>
      {(html || css || js) && <ExportButton html={html} css={css} js={js} />}
    </div>
  );
};

export default MenuBar;
