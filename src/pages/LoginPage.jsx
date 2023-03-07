import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import PasswordForm from "../components/PasswordForm";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005/auth/";

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
      const response = await axios.post(`${API_URL}${role === "junior" ? "user" : "company"}/login`, requestBody);
      // console.log(`${role === "junior" ? "User" : "Company"} logged in succesfully`, response.data.authToken);
      // response.data.authToken holds the token
      storeToken(response.data.authToken);
      await authenticateUser();
      navigate("/profile");
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
      console.log("There was an error with the signup.", errorDescription);
    }
  };

  return (
    <div className="SignupPage">
      <h1>Login</h1>
      <div>
        <h3>Are you a Junior or a company?</h3>
        <div>
          <Button onClick={() => setRole("junior")}>Junior</Button>
          <Button onClick={() => setRole("company")}>Company</Button>
        </div>
      </div>
      {role && (
        <form onSubmit={handleLogin}>
          <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
            {role === "company" && (
              <TextField
                value={name}
                onChange={(event) => setName(event.target.value)}
                id="outlined-basic"
                label="Company Name"
                variant="outlined"
                required
              />
            )}
            {role === "junior" && (
              <TextField
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                required
              />
            )}
            <PasswordForm setPassword={setPassword} password={password} />
            <Button type="submit">Login</Button>
          </Box>
        </form>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
