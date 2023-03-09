import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { InlineWidget } from "react-calendly";

function JuniorProfilePublic() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [catchingUserData, setCatchinUserData] = useState(true);
  const { id } = useParams();

  const api_URL = import.meta.env.VITE_API_URL;

  const getUserData = async () => {
    try {
      const response = await axios.get(`${api_URL}/user/publicprofile/${id}`);
      setUserData(response.data);
    } catch (error) {
      console.log("There was an error getting profileData.", error);
    }
  };

  useEffect(() => {
    getUserData();
    setCatchinUserData(false);
  }, []);

  if (catchingUserData) {
    return <div>Loading...</div>;
  }


  return (
    userData && (
      <div>
        <div>
          <imag src={userData.profilPic} />
        </div>
        <h1>
          {userData.firstName} {userData.lastName}
        </h1>
        {userData.location && (
          <div>
            {" "}
            {userData.location.country}, {userData.location.city}
          </div>
        )}
        <div>
          Skills
          {userData.skills.length > 0 &&
            userData.skills.map((skill) => {
              <li>{skill}</li>;
            })}
        </div>


        <div>
          {/* <Link to={'https://calendly.com/beiteldennis/job-interview'}>Calendly</Link> */}
          {userData.calendly !== "" ? <InlineWidget url={typeof userData.calendly !== "undefined" && userData.calendly} /> : ""}
        </div>
      </div>
    )
  );
}

export default JuniorProfilePublic;
