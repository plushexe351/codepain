import { type SxProps, type Theme } from "@mui/material";

export const authPageContainer: SxProps<Theme> = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "radial-gradient(circle at center, var(--color-bg-dark), #121212)",
  padding:"2rem 1rem",
  overflowY: "auto",
};

export const authPaperContainer: SxProps<Theme> = {
  width: 500, 
  maxWidth: "100%",
  margin:"auto",
}

export const authPaper: SxProps<Theme> = {
  p: 4,
  borderRadius: 2,
  background: "rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
};

export const formContainer: SxProps<Theme> = {
  mt: 2,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export const imageUploadLabel: SxProps<Theme>={
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: 1.5, 
}
export const imageUploadButton: SxProps<Theme>={
  borderRadius:2
}

export const imageUnsetButton: SxProps<Theme>={
  position: "absolute",
  top: "0",
  right: "0",
  padding: ".1rem",
  backgroundColor: "red",
  height: "17px",
  width: "17px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  cursor:"pointer",
}

export const avatar:SxProps<Theme>={
  height: 56, 
  width: 56,
}

export const previewProfileImage: SxProps<Theme>={
  position:'relative',
}

export const inputFieldContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

export const submitButton: SxProps<Theme> = {
  mt: 1,
  borderRadius: 2,
};

export const pageTitle: SxProps<Theme> = {
  mt: 2,
  color: "white",
  fontWeight: 500,
};

export const footerText: SxProps<Theme> = {
  mt: 3,
  color: "white",
};
