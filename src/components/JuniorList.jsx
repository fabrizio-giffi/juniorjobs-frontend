import JuniorCard from "./JuniorCard";
import axios from "axios";
import { useEffect, useState } from "react";

const JuniorList = () => {
  const [juniors, setJuniors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUsers = async () => {
    const response = await axios.get('http://localhost:5005/api/user');
    setJuniors(response.data.reverse());
    setIsLoading(false);
  };


  useEffect(() => {
    getUsers();
    console.log(juniors);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    juniors.length > 1 &&
    <div className="outer-junior-card">
     {    juniors.map(junior => {
     { console.log(junior)}
    return <JuniorCard key={junior._id} junior={junior}/>
    
        
    })}
    </div>
  );
};
export default JuniorList;
