import type React from "react";
import ExportButton from "../ExportButton/ExportButton";
import logo from "../../assets/logo.png";
import "./MenuBar.scss";
import { Button, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "react-floatify";
import { toastOptions } from "../../config/toastOptions";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router";

interface Props {
  html: string;
  css: string;
  js: string;
}

const MenuBar: React.FC<Props> = ({ html, css, js }) => {
  const { logout } = useAuth();
  const { addToast } = useToast();
  const handleLogout = async () => {
    try {
      await logout();
      console.log("logged out");
      addToast("Logged out successfully!", {
        type: "success",
        ...toastOptions.toastContainer,
      });
    } catch (err: any) {
      console.log(err);
      addToast(`${err}`);
    }
  };
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
      <Button onClick={handleLogout}>
        <LogOutIcon size={20} />
      </Button>
    </div>
  );
};

export default MenuBar;
