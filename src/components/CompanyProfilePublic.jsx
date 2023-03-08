import axios from "axios";
import { useEffect, useState, useContext } from "react";
import "../components/companies/CompanyProfile.css";
import JobPostCardCompanyPage from "./jobs/JobPostCardCompanyPage";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
      console.log(response.data);
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

  console.log(user.role);

  return (
    profile && (
      <>
        <div> This is the profile of {name}</div>

        <div className="title">
          <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${name}`} alt={name} />
          <h2>Company information</h2>
        </div>
        <div className="information">
          <div className="input-label">
            <label>Company name:</label>
            <span>{name}</span>
          </div>
          <div className="input-label">
            <label>Company email:</label>
            <span>{email}</span>
          </div>

          <span className="address">
            <u>Address </u>{" "}
          </span>
          <div className="input-label">
            <label>Street:</label>
            <span>{street}</span>
          </div>
          <div className="input-label">
            <label>Zip Code:</label>
            <span>{zipCode}</span>
          </div>
          <div className="input-label">
            <label>City:</label>
            <span>{city}</span>
          </div>
          <div className="input-label">
            <label>Country:</label>
            <span>{country}</span>
          </div>
        </div>

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

        <div className="jobPosts">
          <h4>Job posts from {name}</h4>
          <ul className="ul-jobposts">
            {profile.jobPosts.map((post) => {
              return <JobPostCardCompanyPage key={post._id} post={post} />;
            })}
          </ul>
        </div>
      </>
    )
  );
}

export default CompanyProfilePublic;
