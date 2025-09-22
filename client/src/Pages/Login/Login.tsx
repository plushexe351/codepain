import React from "react";
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
} from "@mui/material";
import Logo from "../../components/logo/Logo";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useToast } from "react-floatify";
import { toastOptions } from "../../config/toastOptions";

const Login: React.FC = () => {
  const { login } = useAuth();
  const Navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = form.get("username") as string;
    const password = form.get("password") as string;

    try {
      const user = await login(username, password);
      Navigate("/playground");
      addToast(`Welcome, ${user.username}`, {
        type: "success",
        ...toastOptions.toastContainer,
      });
      console.log("logged in", user);
    } catch (err) {
      console.error("Login failed:", err);
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
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={styles.formContainer}
          >
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
              Sign in
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={styles.footerText}>
            Don't have an account? <Link href="/register">Sign up</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
