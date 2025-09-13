import { createTheme } from "@mui/material/styles";
import { type Palette, type PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    lightWhite: Palette["primary"];
  }
  interface PaletteOptions {
    lightWhite?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    lightWhite: true;
  }
}


const theme = createTheme({
  palette: {
    mode:"dark",
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
    lightWhite: {   
      main: "#f5f5f5",
      light: "#ffffff",
      dark: "#d6d6d6",
      contrastText: "#000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiInputLabel:{
      styleOverrides:{
        root:{
          color: "#bbbbbbff",      
          fontWeight: 300,         
          fontSize: 14,          
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000bd",      
          color: "whitesmoke",             
          border: "1px solid rgba(255,255,255,0.1)", 
          borderRadius: ".6rem",
          padding:".3rem 1rem",
          fontSize:14,
          fontWeight:300,
          "&:hover": {
            borderColor: "#ffffff98",
          },
          "&.Mui-focused": {
            borderColor: "#ff79c6",       
          },
        },
        input: {
          "&::placeholder": {
            color: "rgba(255,255,255,0.8)", 
          },
        },
        underline:{
          "&:before, &:after":{
            display:"none"
          }
        }
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "rgba(255,255,255,0.1)",  
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: "white",                
          fontSize: 14,
          fontWeight: 300,
        },
      },
    },
  },
});

export default theme;
