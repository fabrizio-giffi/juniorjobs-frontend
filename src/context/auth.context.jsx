import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005/auth/";

export const AuthContext = createContext();

function AuthProviderWrapper({ children }) {
  const [role, setRole] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      try {
        const response = await axios.get(`${API_URL}${role === "junior" ? "user" : "company"}/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(response.data);
      } catch (error) {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, storeToken, role, setRole, authenticateUser, logOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProviderWrapper;
