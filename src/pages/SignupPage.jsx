import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import PasswordForm from "../components/PasswordForm";

const API_URL = "http://localhost:5005/auth/";

function SignupPage(props) {
  const [role, setRole] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    const requestBody = { name, email, password };
    console.log(requestBody);
    try {
      const response = await axios.post(`${API_URL}${role === "junior" ? "user" : "company"}/signup`, requestBody);
      console.log(`${role === "junior" ? "User" : "Company"} created succesfully`, response.data);
      if (response.status === 201) navigate("/login");
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
      console.log("There was an error with the signup.", error);
    }
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>
      <div>
        <h3>Are you a Junior or a company?</h3>
        <div>
          <Button onClick={() => setRole("junior")}>Junior</Button>
          <Button onClick={() => setRole("company")}>Company</Button>
        </div>
      </div>
      {role && (
        <form onSubmit={handleSignup}>
          <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
            {role === "company" && (
              <TextField
                value={name}
                onChange={(event) => setName(event.target.value)}
                id="outlined-basic"
                label="Company Name"
                variant="outlined"
              />
            )}
            <TextField
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            <PasswordForm setPassword={setPassword} />
            <Button type="submit">Sign Up</Button>
          </Box>
        </form>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
