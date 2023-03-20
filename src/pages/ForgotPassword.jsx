import { useState } from "react";
import axios from "axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const params = useParams();
  console.log(params)
  const auth_URL = import.meta.env.VITE_AUTH_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (params.role === "junior") {
      try {
        const response = await axios.post(
          `${auth_URL}/user/forgot-password`,
          { email }
        );
        setSuccess(true);
      } catch (error) {
        console.log("ERROR", error);
        setError(error.response.data.message);
      }
    } 

    if (params.role === "company") {
      try {
        const response = await axios.post(
          `${auth_URL}/company/forgot-password`,
          { email }
        );
        setSuccess(true);
      } catch (error) {
        console.log("ERROR", error);
        // setError(error.response.data.message);
      }
    } 

  };

  return (
    <>
      {error ? (
        <Container sx={{}} component="main" maxWidth="xs">
          <Typography sx={{ mt: 5 }} component="h1" variant="h5">
            {error}
          </Typography>
        </Container>
      ) : success ? (
        <Container component="main" maxWidth="xs">
          <Typography sx={{ mt: 5 }} component="h1" variant="h5">
            A reset password link has been sent to your email address
          </Typography>
        </Container>
      ) : (
        <Container component="main" maxWidth="xs">
          <Typography sx={{ mt: 5 }} component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              variant="outlined"
              fullWidth
              id="email"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              label="Email address"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#6b9080", mt: 3, mb: 2, position: "relative" }}
            >
              send mail
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
        </Container>
      )}
    </>
  );
};

export default ForgotPassword;
