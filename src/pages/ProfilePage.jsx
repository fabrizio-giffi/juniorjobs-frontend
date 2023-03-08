import { useContext } from "react";
import CompanyProfile from "../components/companies/CompanyProfile";
import JuniorProfile from "../components/juniors/JuniorProfile";
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
