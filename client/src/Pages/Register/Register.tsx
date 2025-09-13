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
  Avatar,
} from "@mui/material";
import { CloudUploadTwoTone } from "@mui/icons-material";
import Logo from "../../components/logo/Logo";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, username, password });
    // TODO: call backend login API
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
              style={{ display: "none" }}
            />

            <InputLabel
              htmlFor="upload-image"
              sx={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Avatar sx={{ height: 56, width: 56 }} />
              <Button
                variant="outlined"
                component="span"
                sx={{ borderRadius: 2 }}
              >
                <CloudUploadTwoTone sx={{ mr: 0.5 }} /> Upload Profile Image
              </Button>
            </InputLabel>
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
