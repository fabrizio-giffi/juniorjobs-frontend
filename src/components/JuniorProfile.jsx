import {useContext, useState, useEffect} from 'react'
import { AuthContext } from "../context/auth.context";
import axios from 'axios';
import { Link } from 'react-router-dom';

function JuniorProfile() {
    const { user } = useContext(AuthContext);
  
    const [email, setEmail] = useState('');
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [location, setlocation] = useState({});
    const [skills, setskills] = useState([]);
    const [profilePic, setprofilePic] = useState("");
    const [favoriteJobPosts, setfavoriteJobPosts] = useState([]);
    const [favoriteCompanies, setfavoriteCompanies] = useState([]);
    const [catchingUserData, setCatchinUserData] = useState(true)

  
    const API_URL = "http://localhost:5005/api/user";


    const getProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/${user.id}`);
        console.log(response.data)
        setEmail(response.data.email)
        setfirstName(response.data.firstName)
        setlastName(response.data.lastName)
        setlocation(response.data.location)
        setskills(response.data.skills)
        setprofilePic(response.data.profilePic)
        setfavoriteCompanies(response.data.favoriteCompanies)
        setfavoriteJobPosts(response.data.favoriteJobPosts)
      } catch (error) {
        console.log(error);
      }
    };
  
  
    
    // const handleEdit = async (event) => {
    //   event.preventDefault();
    //   const requestBody = { firstName, lastName, email, location, skills, favoriteCompanies, favoriteJobPosts };
    //   try {
    //    const response = await axios.put(`${API_URL}/edit/${user.id}`, requestBody);
    //    console.log(response.data)
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    useEffect(() => {
      getProfile();
      setCatchinUserData(false)
    }, []);
  
    if(catchingUserData){
        return <div>Loading...</div>
      }
    return (
        <div>
        <div>
          <img src={profilePic}/>
        </div> 
        <h1>{firstName} {lastName}</h1>
       {location && <div> {location.country}, {location.city}</div>} 
        <div>Skills
        {skills.length > 0 && skills.map((skill) =>{
            return(
                <div key={skill}>{skill}
                    <Link to="/">
                        <button type='button' >X</button>
                    </Link>
                </div>)
          })
        }</div>
        <div>JobPosts
        {favoriteJobPosts.length > 0 && favoriteJobPosts.map((jobPost) =>{
            return(
                <div key={jobPost._id}>
                    {jobPost.title}
                    <div>{jobPost.salaryRange.minimum}-{jobPost.salaryRange.maximum}</div>
                    <div>{jobPost.company.name}</div>
                    <Link to="/">
                        <button type='button' >X</button>
                    </Link>
                </div>)
          })
        }</div>
        </div>
    )
  }
  
  export default JuniorProfile;