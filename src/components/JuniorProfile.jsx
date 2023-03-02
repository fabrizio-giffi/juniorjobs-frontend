import {useContext, useState, useEffect} from 'react'
import { AuthContext } from "../context/auth.context";
import axios from 'axios';




function JuniorProfile() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [catchingUserData, setCatchinUserData] = useState(true)
  // console.log(user)

  const API_URL = "http://localhost:5005";

  const getUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/user/${user.id}`);
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
        <h1>{userData.firstName} {userData.LastName}</h1>
        <h3>{userData.email}</h3>
       {userData.location && <div> {userData.location}</div>} 
        <div>Skills
        {userData.skills.length && userData.skills.map((skill) =>{
            <li>{skill}</li>
          })
        }</div>

        <div>Favorite Companies
        {userData.favoriteCompanies.length && userData.favoriteCompanies.map((company) =>{
            <li>{company}</li>
          })
        }</div>
        <div>Favorite Companies
        {userData.favoriteJobPosts.length && userData.favoriteJobPosts.map((jobPosting) =>{
            <li>{jobPosting}</li>
          })
        }</div>

    </div>
  )
}

export default JuniorProfile