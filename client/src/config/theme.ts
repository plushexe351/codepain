import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff79c6',   
      light: '#ffa1dc',  
      dark: '#c74f96',   
      contrastText: '#fff', 
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
