import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Box, Button, CircularProgress, Container, Divider, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import PasswordForm from "../components/PasswordForm";
import { AuthContext } from "../context/auth.context";
import LoginIcon from "@mui/icons-material/Login";
import { red } from "@mui/material/colors";

const auth_URL = import.meta.env.VITE_AUTH_URL;

function SignupPage() {
  const { role, setRole } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isSpinning, setIsSpinning] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setIsSpinning(true);
    const requestBody = { name, email, password };
    try {
      const response = await axios.post(`${auth_URL}/${role === "junior" ? "user" : "company"}/signup`, requestBody);
      setIsSpinning(false);
      if (response.status === 201) navigate("/login");
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
      setIsSpinning(false);
      console.log("There was an error with the signup.", errorDescription);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Stack sx={{ mt: 10 }} divider={<Divider orientation="vertical" flexItem />} spacing={2} direction="row">
          <Button sx={{ bgcolor: "#6b9080" }} fullWidth variant="contained" onClick={() => setRole("junior")}>
            Junior
          </Button>
          <Button sx={{ bgcolor: "#6b9080" }} fullWidth variant="contained" onClick={() => setRole("company")}>
            Company
          </Button>
        </Stack>
        <Typography variant="h5" sx={{ mt: 3, textAlign: "center" }} gutterBottom>
          Are you a junior or a company?
        </Typography>
      </Container>
      {role && (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#6b9080" }}>
              <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
              {role === "company" && (
                <TextField
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  id="company-name"
                  autoFocus
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  label="Company Name"
                  required
                />
              )}
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                id="email"
                autoFocus
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                label="Email"
                required
              />
              <PasswordForm setPassword={setPassword} password={password} />
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ bgcolor: "#6b9080", mt: 3, mb: 2, position: "relative" }}
                >
                  Sign Up
                </Button>
                {isSpinning && <CircularProgress size={20} sx={{ position: "absolute", mt: 11 }} />}
              </Box>
            </Box>
          </Box>
          {errorMessage && (
            <Stack
              sx={{
                color: "white",
                bgcolor: red[500],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                height: "35px",
              }}
            >
              <Typography>{errorMessage}</Typography>
            </Stack>
          )}
          <Stack
            sx={{ mt: 3, display: "flex", justifyContent: "center" }}
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            direction="row"
          >
            <Typography>Already have account?</Typography>
            <Link to={"/login"}> Login</Link>
          </Stack>
        </Container>
      )}
    </>
  );
}

export default SignupPage;
