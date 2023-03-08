import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Container, Divider, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import PasswordForm from "../components/PasswordForm";
import { AuthContext } from "../context/auth.context";
import { LoginIcon } from "@mui/icons-material/Login";

const auth_URL = import.meta.env.VITE_AUTH_URL;

function LoginPage() {
  const { storeToken, authenticateUser, role, setRole } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const requestBody = { name, email, password };
    try {
      const response = await axios.post(`${auth_URL}/${role === "junior" ? "user" : "company"}/login`, requestBody);
      // console.log(`${role === "junior" ? "User" : "Company"} logged in succesfully`, response.data.authToken);
      // response.data.authToken holds the token
      storeToken(response.data.authToken);
      await authenticateUser();
      navigate("/profile");
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
      console.log("There was an error with the login.", errorDescription);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Stack sx={{ marginTop: 8 }} divider={<Divider orientation="vertical" flexItem />} spacing={2} direction="row">
          <Button sx={{ bgcolor: "#6b9080" }} fullWidth variant="contained" onClick={() => setRole("junior")}>
            Junior
          </Button>
          <Button sx={{ bgcolor: "#6b9080" }} fullWidth variant="contained" onClick={() => setRole("company")}>
            Company
          </Button>
        </Stack>
        <Typography variant="h5" sx={{ marginTop: 3, textAlign: "center" }} gutterBottom>
          Are you a Junior or a company?
        </Typography>
      </Container>
      {role && (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#6b9080" }}>{LoginIcon}</Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
              {role === "junior" && (
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
              )}
              <PasswordForm setPassword={setPassword} password={password} />
              <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}>
                Log In
              </Button>
            </Box>
          </Box>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Stack
            sx={{ marginTop: 3 }}
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            direction="row"
          >
            <Typography>Don't have an account yet?</Typography>
            <Link to={"/signup"}>Sign Up</Link>
          </Stack>
        </Container>
      )}
    </>
  );
}

export default LoginPage;
