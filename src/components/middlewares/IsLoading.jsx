import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function IsLoading({ children }) {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) return <CircularProgress size={100} sx={{ position: "absolute", top: "45%", left: "45%" }} />;

  return children;
}

export default IsLoading;
