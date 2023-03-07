import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function IsLoading({ children }) {
  const { isLoading } = useContext(AuthContext);

  // If the authentication is still loading

  if (isLoading) return <p>Loading ...</p>;

  return children;
}

export default IsLoading;
