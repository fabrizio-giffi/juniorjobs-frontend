import {useContext, useState, useEffect} from 'react'
import { AuthContext } from "../context/auth.context";
import axios from 'axios';
import { Link } from 'react-router-dom';




function JuniorProfilePublic() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [catchingUserData, setCatchinUserData] = useState(true)
  // console.log(user)

  const API_URL = "http://localhost:5005";

  const getUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/user/publicprofile/${user.id}`);
      console.log(response.data)
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
          <image src={userData.profilPic}/>
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
    </div>
  )
}

export default JuniorProfilePublic