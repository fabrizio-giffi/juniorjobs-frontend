import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsCompany({ children }) {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  console.log("Are you logged in?", isLoggedIn)
  console.log("Are you loading?", isLoading)
  console.log(user)

  if (isLoading) return <p>Loading ...</p>;
  if (!isLoggedIn || user.role !== "company") {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default IsCompany;
