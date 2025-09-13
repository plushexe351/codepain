import React, { useState } from "react";
import * as styles from "../../styles/authStyles";
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
  FormControl,
} from "@mui/material";
import Logo from "../../components/logo/Logo";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password });
    // TODO: call backend login API
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
              Sign up
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
