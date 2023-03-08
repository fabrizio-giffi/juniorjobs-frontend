import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

function IsCompany({ children }) {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);

  if (isLoading) return <p>Loading ...</p>;
  if (!isLoggedIn || user.role !== "company") {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default IsCompany;
