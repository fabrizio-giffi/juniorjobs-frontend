import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function IsLoading({ children }) {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading ...</p>;

  return children;
}

export default IsLoading;
