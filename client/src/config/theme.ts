import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff79c6',   // main pink shade
      light: '#ffa1dc',  // lighter tint
      dark: '#c74f96',   // darker tone
      contrastText: '#fff', // white text for accessibility
    },
    secondary: {
      main: "#0d47a1",
      light: "#5472d3",
      dark: "#002171",
      contrastText: "#fff",
    },
  },
});

export default theme;
