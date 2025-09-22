import type React from "react";
import ExportButton from "../ExportButton/ExportButton";
import logo from "../../assets/logo.png";
import "./MenuBar.scss";
import { Button, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "react-floatify";
import { toastOptions } from "../../config/toastOptions";
import { LogOutIcon } from "lucide-react";

interface Props {
  html: string;
  css: string;
  js: string;
}

const MenuBar: React.FC<Props> = ({ html, css, js }) => {
  const { logout } = useAuth();
  const { addToast } = useToast();
  const [loggingOut, setLoggingOut] = useState(false);
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      console.log("logged out");
      addToast("Logged out successfully!", {
        type: "success",
        ...toastOptions.toastContainer,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.log(message);
      addToast(message);
    } finally {
      setLoggingOut(false);
    }
    console.log("should not blank screen");
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
      <Button onClick={handleLogout} disabled={loggingOut}>
        {loggingOut ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <LogOutIcon size={20} />
        )}
      </Button>
    </div>
  );
};

export default MenuBar;
