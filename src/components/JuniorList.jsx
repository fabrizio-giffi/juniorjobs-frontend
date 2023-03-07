import JuniorCard from "./JuniorCard";
import axios from "axios";
import { useEffect, useState } from "react";

const JuniorList = () => {
  const [juniors, setJuniors] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5005/api/user");
    setJuniors(response.data.reverse());
    setIsFetching(false);
  };

  useEffect(() => {
    getUsers();

    console.log(juniors);
  }, []);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    juniors.length > 1 && (
      <div className="outer-junior-card">
        {juniors.map((junior) => {
          {
            console.log(junior);
          }
          return <JuniorCard key={junior._id} junior={junior} />;
        })}
      </div>
    )
  );
};
export default JuniorList;
