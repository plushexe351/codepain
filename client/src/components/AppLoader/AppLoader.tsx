import { Backdrop } from "@mui/material";
import React from "react";
import Logo from "../logo/Logo";

const AppLoader: React.FC = () => {
  return (
    <Backdrop
      open
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "black",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Logo />
    </Backdrop>
  );
};

export default AppLoader;
