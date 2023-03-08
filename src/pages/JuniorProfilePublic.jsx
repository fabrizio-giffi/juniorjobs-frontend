import {useContext, useState, useEffect} from 'react'
import { AuthContext } from "../context/auth.context";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { InlineWidget } from "react-calendly";


function JuniorProfilePublic() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [catchingUserData, setCatchinUserData] = useState(true)
  const {id} = useParams()

  const API_URL = "http://localhost:5005";

  const getUserData = async () => {
    try {console.log("PARAMS", id)
      const response = await axios.get(`${API_URL}/api/user/publicprofile/${id}`);
      console.log(response)
      setUserData(response.data)
    } catch (error) {
      console.log("There was an error getting profileData.", error);
    }
  };

  useEffect(() => {
    getUserData()
    setCatchinUserData(false)
  }, []);

  if(catchingUserData){
    return <div>Loading...</div>
  }


  return userData&&(
    <div>
        <div>
          <imag src={userData.profilPic}/>
        </div> 
        <h1>{userData.firstName} {userData.lastName}</h1>
       {userData.location && <div> {userData.location.country}, {userData.location.city}</div>} 
        <div>Skills
        {userData.skills.length > 0 && userData.skills.map((skill) =>{
            <li>{skill}</li>
          })
        }</div>
        <Link to="/">
          <button type='button' >Add to Company favorites</button>
        </Link>

      <div>
                {/* <Link to={'https://calendly.com/beiteldennis/job-interview'}>Calendly</Link> */}
                <InlineWidget url="https://calendly.com/beiteldennis/job-interview" />
        </div>
    </div>
  )
}

export default JuniorProfilePublic