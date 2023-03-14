import axios from "axios";
import { useEffect, useState, useContext } from "react";
import JobPostCardCompanyPage from "./jobs/JobPostCardCompanyPage";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import './CompanyProfilePublic.css'

const api_URL = import.meta.env.VITE_API_URL;

function CompanyProfilePublic() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [userDB, setUserDB] = useState({});
  const [catchingUserData, setCatchinUserData] = useState(true);
  const [updated, setUpdated] = useState(false);

  const [profile, setProfile] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("N/A");
  const [zipCode, setZipCode] = useState("N/A");
  const [city, setCity] = useState("N/A");
  const [country, setCountry] = useState("N/A");
  const params = useParams();
  const { id } = params;

  const getProfile = async () => {
    try {
      const response = await axios.get(`${api_URL}/company/${id}`);
      setProfile(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setStreet(response.data.address.street);
      setZipCode(response.data.address.zipCode);
      setCity(response.data.address.city);
      setCountry(response.data.address.country);
      setProfilePicture(response.data.profilePicture);
      setUpdated(false);
    } catch (error) {
      console.log("There was an error getting the profile", error);
    }
  };

  const fetchData = async () => {
    try {
      setCatchinUserData(true);
      const response = await axios.get(`${api_URL}/user/${user.id}`);
      setUserDB(response.data);
      setCatchinUserData(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addCompany = async () => {
    const requestBody = { id: user.id, companyId: id };
    try {
      setCatchinUserData(true);
      const response = await axios.put(`${api_URL}/user/addCompany`, requestBody);
      setUpdated(true);
    } catch (error) {
      console.log(error);
    }
    return;
  };

  useEffect(() => {
    getProfile();
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [updated]);

  if (catchingUserData) {
    return <div>Loading...</div>;
  }

  return (
    profile && (
      <>
      <div className="containerflexCompanyPublic">
      <div className="shadowBoxCompanyPublic">
      <div className="containerflexCompanyPublic">

          <div className="title companyInfoPadding">
            <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${name}`} alt={name} />
            <Typography variant="h3">Company information</Typography>
          </div>
          <div className="paddingCompanyPublic">

          <div className="containerRowCompanyPublic">
            <div className="containerflexCompanyPublicList">
              <Typography variant="h5">Company name: </Typography>
              <Typography variant="h5">Company email: </Typography>
              <Typography variant="h5">Company street: </Typography>
              <Typography variant="h5">Zip Code:</Typography>
              <Typography variant="h5">City:</Typography>
              <Typography variant="h5">Country:</Typography>
            </div>
            <div className="containerflexCompanyPublicList companyInfoMargin">
            <Typography variant="h5">{name}</Typography>
            <Typography variant="h5">{email}</Typography>
            <Typography variant="h5">{street}</Typography>
            <Typography variant="h5">{zipCode}</Typography>
            <Typography variant="h5">{city}</Typography>
            <Typography variant="h5">{country}</Typography>
            </div>
          </div>

          </div>
        </div>

        <div className="containerflexCompanyPublic">
            <Typography variant="h6" >
                Add Company To your favorites
            </Typography>
          {!isLoggedIn || user.role === "company" ? (
            ""
          ) : user.role === "junior" && userDB?.favoriteCompanies.some((company) => company._id === id) ? (
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => addCompany(id)} aria-label="add to favorites">
              <FavoriteBorderIcon />
            </IconButton>
          )}
        </div>
        </div>
        </div>
        <div className="jobPosts-public">
          <h4>Job posts from {name}</h4>
          <ul className="ul-jobposts-public">
            {profile.jobPosts.map((post) => {
               return(
               <li>
                <JobPostCardCompanyPage key={post._id} post={post} />
              </li>
               )
            })}
          </ul>
        </div>
      </>
    )
  );
}

export default CompanyProfilePublic;
