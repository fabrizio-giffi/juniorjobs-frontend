import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Container, Stack } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import PasswordForm from "../components/PasswordForm";

const ResetPassword = () => {
  const { token, user } = useParams();
  const params = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const auth_URL = import.meta.env.VITE_AUTH_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (user === "user") {
      try {
        await axios.post(`${auth_URL}/user/reset-password`, {
          token,
          password,
        });
        setSuccess(true);
      } catch (error) {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        console.error("ERROR", error);
      }
    }

    if (user === "company") {
      try {
        await axios.post(`${auth_URL}/company/reset-password`, {
          token,
          password,
        });
        setSuccess(true);
      } catch (error) {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        console.error("ERROR", error);
      }
    }
  };

  return (
    <div>
      {success ? (
        <Typography align="center" variant="h5" sx={{mt: 6}}>
          Your password has been reset successfully
        </Typography>
      ) : (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ mt: 3, textAlign: "center" }}
              gutterBottom
            >
              Reset your password
            </Typography>
          </Box>
          <PasswordForm setPassword={setPassword} password={password} />
          <PasswordForm
            setPassword={setConfirmPassword}
            password={confirmPassword}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#6b9080",
                mt: 3,
                mb: 2,
                position: "relative",
              }}
              onClick={(e) => handleSubmit(e)}
            >
              reset password
            </Button>
          </Box>

          {errorMessage && (
            <Stack
              sx={{
                color: "#fbfbfb",
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
        </Container>
      )}
      {errorMessage && (
        <Stack
          sx={{
            color: "#fbfbfb",
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
    </div>
  );
};

export default ResetPassword;
