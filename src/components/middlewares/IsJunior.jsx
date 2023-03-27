import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

function IsJunior({ children }) {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);

  if (isLoading) return <p>Loading ...</p>;
  if (user?.role !== "user") {
    return <Navigate to="/login" />;
  } else if (!isLoggedIn) {
    return <Navigate to="/jobs" />;
  } else {
    return children;
  }
}

export default IsJunior;
