import { useContext } from "react";
import CompanyProfile from "../components/CompanyProfile";
import JuniorProfile from "../components/JuniorProfile";
import { AuthContext } from "../context/auth.context";

function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user.role === "company" && <CompanyProfile />}
      {user.role === "junior" && <JuniorProfile />}
    </>
  );
}

export default ProfilePage;
