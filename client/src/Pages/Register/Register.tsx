import React, { useState } from "react";
import * as styles from "../../styles/formStyles";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Link,
  InputLabel,
  Input,
  FormControlLabel,
  Checkbox,
  Avatar,
} from "@mui/material";
import { CloudUploadIcon } from "lucide-react";
import Logo from "../../components/logo/Logo";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useToast } from "react-floatify";
import { toastOptions } from "../../config/toastOptions";
import { X } from "lucide-react";

const Register: React.FC = () => {
  const { register } = useAuth();
  const Navigate = useNavigate();
  const { addToast } = useToast();

  // Preview uploaded profile image
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = form.get("username") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      const user = await register(username, email, password);
      Navigate("/playground");
      addToast(`Welcome, ${user?.username}`, {
        type: "success",
        ...toastOptions.toastContainer,
      });
      console.log("registered");
    } catch (err) {
      console.error("Register failed:", err);
      addToast(`${err}`, {
        type: "error",
        ...toastOptions.toastContainer,
      });
    }
  };

  return (
    <Box sx={styles.authPageContainer}>
      <Container sx={styles.authPaperContainer}>
        <Paper elevation={5} sx={styles.authPaper}>
          <Logo />
          <Typography variant="h4" gutterBottom sx={styles.pageTitle}>
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={styles.formContainer}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItens: "center",
                flexDirection: "column",
                gap: 1.5,
                textAlign: "center",
              }}
            ></Box>
            <Box sx={styles.inputFieldContainer}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                id="email"
                required
              />
            </Box>
            <Box sx={styles.inputFieldContainer}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                type="text"
                name="username"
                placeholder="your username"
                id="username"
                required
              />
            </Box>
            <Box sx={styles.inputFieldContainer}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                type="password"
                name="password"
                placeholder="your password"
                id="password"
                required
              />
            </Box>
            <input
              type="file"
              name="upload-image"
              id="upload-image"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Box sx={styles.imageUploadLabel}>
              <Box sx={styles.previewProfileImage}>
                <Avatar
                  sx={styles.avatar}
                  src={preview}
                  onClick={(e) => e.stopPropagation()}
                />
                {preview && (
                  <Box
                    sx={styles.imageUnsetButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreview(undefined);
                    }}
                  >
                    <X size={17} className="btn-unset-image" />
                  </Box>
                )}
              </Box>
              <InputLabel htmlFor="upload-image">
                <Button
                  variant="outlined"
                  component="span"
                  sx={styles.imageUploadButton}
                >
                  <CloudUploadIcon size={17} style={{ marginRight: ".5rem" }} />{" "}
                  Upload Profile Image
                </Button>
              </InputLabel>
            </Box>
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Button
              type="submit"
              variant="contained"
              color="lightWhite"
              disableElevation
              size="large"
              fullWidth
              sx={styles.submitButton}
            >
              Sign up
            </Button>
          </Box>
          <Typography variant="body2" align="center" sx={styles.footerText}>
            Already have an account? <Link href="/login">Sign in</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
