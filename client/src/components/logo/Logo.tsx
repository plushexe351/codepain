import { Box, Typography } from "@mui/material";
import React from "react";
import CodepainLogo from "../../assets/logo.png";

interface LogoProps {
  size?: number;
  colorPrimary?: string;
  colorSecondary?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = 30,
  colorPrimary = "lightWhite",
  colorSecondary = "primary.main",
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <img src={CodepainLogo} alt="" width={size} height={size} />
      <Typography
        sx={{ fontFamily: "Courier New, sans-serif", fontWeight: 600 }}
        color={colorPrimary}
      >
        Code
        <Box component="span" color={colorSecondary}>
          pain
        </Box>
      </Typography>
    </Box>
  );
};

export default Logo;
