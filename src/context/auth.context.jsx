import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
const index_URL = import.meta.env.VITE_INDEX_URL;

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
        const response = await axios.get(`${index_URL}/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setUser(response.data);
        setIsLoggedIn(true);
        setIsLoading(false);
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    } else {
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
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
      value={{ isLoggedIn, isLoading, user, setUser, storeToken, role, setRole, authenticateUser, logOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProviderWrapper;
