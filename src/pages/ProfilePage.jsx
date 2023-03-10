import { Box } from "@mui/material";
import { useContext } from "react";
import CompanyProfile from "../components/companies/CompanyProfile";
import JuniorProfile from "../components/juniors/JuniorProfile";
import { AuthContext } from "../context/auth.context";

function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ mb: 7, mt: 7 }}>
      {user.role === "company" && <CompanyProfile />}
      {user.role === "junior" && <JuniorProfile />}
    </Box>
  );
}

export default ProfilePage;
