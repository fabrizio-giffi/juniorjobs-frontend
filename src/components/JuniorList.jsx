import JuniorCard from "./JuniorCard";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

const JuniorList = () => {
  const { user } = useContext(AuthContext);
  const [juniors, setJuniors] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [userDB, setUserDB] = useState({});
  const [updated, setUpdated] = useState(false);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5005/api/user");
    setJuniors(response.data.reverse());
    if (user) {
      const getCompany = await axios.get(`http://localhost:5005/api/company/${user.id}`);
      setUserDB(getCompany.data);
      console.log("USERDB",userDB);
    }
    setUpdated(false);
    setIsFetching(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [updated]);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    juniors.length > 1 && (
      <div className="outer-junior-card">
        {juniors.map((junior) => {
          {
            // console.log(junior);
          }
          return (
            <JuniorCard
              key={junior._id}
              junior={junior}
              userDB={userDB}
              setUpdated={setUpdated}
            />
          );
        })}
      </div>
    )
  );
};
export default JuniorList;
