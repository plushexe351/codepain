import { Box, CircularProgress } from "@mui/material";
import React from "react";
import Logo from "../logo/Logo";

const AppLoader: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "40vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        bgcolor: "transparent",
      }}
    >
      <Logo />
      <CircularProgress />
    </Box>
  );
};

export default AppLoader;
