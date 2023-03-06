import { useContext } from "react";
import JobList from "./JobList";
import { AuthContext } from "../context/auth.context";
import JuniorList from "../components/JuniorList";

const HomePage = () => {
  const { user, isLoggedIn } = useContext(AuthContext);

  return !isLoggedIn || user.role === 'junior' ? (
    <div>
      <JobList />
    </div>
  ) : (
    <div>
      <JuniorList />
    </div>
  );
}

export default HomePage;