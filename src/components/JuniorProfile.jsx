import {useContext, useState, useEffect} from 'react'
import { AuthContext } from "../context/auth.context";
import axios from 'axios';
import { Link } from 'react-router-dom';

function JuniorProfile() {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState();
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [skills, setSkills] = useState([]);
    const [profilePic, setProfilePic] = useState("");
    const [favoriteJobPosts, setFavoriteJobPosts] = useState([]);
    const [favoriteCompanies, setFavoriteCompanies] = useState([]);
    const [catchingUserData, setCatchinUserData] = useState(true);
    const [message, setMessage] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [newSkill, setNewSkill] = useState();

  
    const API_URL = "http://localhost:5005/api/user";


    const getProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/${user.id}`);
        console.log(response.data)
        setUserData(response.data)
        setId(response.data._id)
        setFirstName(response.data.firstName)
        setEmail(response.data.email)
        setLastName(response.data.lastName)
        setCountry(response.data.location.country)
        setCity(response.data.location.city)
        setSkills(response.data.skills)
        setProfilePic(response.data.profilePic)
        setFavoriteCompanies(response.data.favoriteCompanies)
        setFavoriteJobPosts(response.data.favoriteJobPosts)
      } catch (error) {
        console.log(error);
      }
    };
  
    async function handlefavoriteJobPostsdelete (postId){
      const requestBody = {id, postId};
      try {
       setCatchinUserData(true)
       const response = await axios.put(`${API_URL}/privateprofile/deleteFavJobPost`, requestBody);
       getProfile()
       setCatchinUserData(false)
       console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    }

    async function handleSkilldelete(skill){
        const requestBody = {id, skill};
        try {
         setCatchinUserData(true)
         const response = await axios.put(`${API_URL}/privateprofile/deleteSkill`, requestBody);
         getProfile()
         setCatchinUserData(false)
         console.log(response.data)
        } catch (error) {
          console.log(error);
        }
    }

    async function handlefavoriteCompanyDelete(CompanyId){
        const requestBody = {id, CompanyId};
        try {
            setCatchinUserData(true)
            const response = await axios.put(`${API_URL}/privateprofile/deleteSkill`, requestBody);
            getProfile()
            setCatchinUserData(false)
            console.log(response.data)
           } catch (error) {
             console.log(error);
           }
    }
  async function editFields(event){
    event.preventDefault();
    const requestBody = {
      firstName,
      lastName,
      country,
      city
    };

    try {
      const response = await axios.put(
        `${API_URL}/edit/${user.id}`,
        requestBody
      );
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  function changeEdit(){
    if(isEditing== false){setIsEditing(true)}
    else if(isEditing== true){setIsEditing(false)}
  }


  async function addSkill(event){
    event.preventDefault();
    const requestBody = {
      id:user.id,
      newSkill
    };

    try {
      setCatchinUserData(true)
      const response = await axios.put(
        `${API_URL}/addNewSkill`,
        requestBody
      );
      getProfile()
      setCatchinUserData(false)
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  }
    useEffect(() => {
      getProfile();
      setCatchinUserData(false)
    }, []);

    // useEffect(() => {
    //   setCatchinUserData(true)
    //   getProfile();
    //   setCatchinUserData(false)
    // }, []);
  
    if(catchingUserData){
        return <div>Loading...</div>
      }
    return (
        <div>
        {user.role == "junior"&& 
        <form onSubmit={editFields} className="edit-form">
          <div className="title">
            <img
              src={`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}`}
              alt={firstName}
            />
            <h2>User information</h2>
          </div>
          {/* <h6>Click on the information to edit</h6> */}
          <div className="information">
            <div className="input-label">
              <label>First Name:</label>
              {isEditing?<input
                style={{ border: "none", outline: "none" }}
                type="text"
                placeholder={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
              />: <p>{firstName}</p>}
            </div>
            <div className="input-label">
              <label>Last Name:</label>
              {isEditing?<input
                style={{ border: "none", outline: "none" }}
                type="text"
                placeholder={lastName}
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
              />: <p>{lastName}</p>}
            </div>

            <div className="input-label">
              <label>City:</label>
              {isEditing?<input
                style={{ border: "none", outline: "none" }}
                type="text"
                placeholder={city}
                onChange={(event) => setCity(event.target.value)}
                value={city}
              />: <p>{city}</p>}
            </div>
            <div className="input-label">
              <label>Country:</label>
              {isEditing?<input
                style={{ border: "none", outline: "none" }}
                type="text"
                placeholder={country}
                onChange={(event) => setCountry(event.target.value)}
                value={country}
              />: <p>{country}</p>}
            </div>
            <div className="input-label">
              <label>profile picture:</label>
              {isEditing?<input
                style={{ border: "none", outline: "none" }}
                type="text"
                placeholder={profilePic}
                onChange={(event) => setProfilePic(event.target.value)}
                value={profilePic}
              />: <p>{profilePic}</p>}
            </div>
          </div>

          {message && <span>{message}</span>}
          {isEditing?<button type="submit" onClick={changeEdit}>Commit Changes</button>:<button onClick={changeEdit}>Edit information</button>}
        </form>
        }
        <form onSubmit={addSkill}>
              <label>NewSkill:</label>
              <input
                type="text"
                placeholder={newSkill}
                onChange={(event) => setNewSkill(event.target.value)}
                value={newSkill}
              />
              <button type='submit'>Add Skill</button>
        </form>
        <div>Skills
        {skills.length > 0 && skills.map((skill) =>{
            return(
                <div key={skill}>{skill}<button type='button' onClick={()=>handleSkilldelete(skill)}>X</button></div>
                )
          })
        }</div>
        <div>JobPosts
        {favoriteJobPosts.length > 0 && favoriteJobPosts.map((jobPost) =>{
            return(
                <div key={jobPost._id}>
                    {jobPost.title}
                    <div>{jobPost.salaryRange.minimum}-{jobPost.salaryRange.maximum}</div>
                    <div>{jobPost.company.name}</div>
                    <Link to={`/jobs/${jobPost._id}`}>
                        <button type='button' >Show Post</button>
                    </Link>
                        <button type='button' onClick={()=>handlefavoriteJobPostsdelete(jobPost._id)}>X</button>
                </div>)
          })
        }</div>
        <div>Favorite Companies
        {favoriteCompanies.length > 0 && favoriteCompanies.map((company) =>{
            return(
                <div key={company._id}>
                    <div>{company.name}</div>
                    <Link to={`/company/${company._id}`}>
                        <button type='button'>Show Company</button>
                    </Link>
                        <button type='button' onClick={()=>handlefavoriteCompanyDelete(company._id)}>X</button>
                </div>)
          })
        }</div>
        </div>
    )
  }
  
  export default JuniorProfile;