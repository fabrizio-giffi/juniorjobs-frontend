import { useContext } from "react";
import JobList from "../components/jobs/JobList";
import { AuthContext } from "../context/auth.context";
import JuniorList from "../components/juniors/JuniorList";

const HomePage = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  console.log();

  return !isLoggedIn || user.role === "junior" ? (
    <div>
      <JobList />
    </div>
  ) : (
    <div>
      <JuniorList />
    </div>
  );
};

export default HomePage;
