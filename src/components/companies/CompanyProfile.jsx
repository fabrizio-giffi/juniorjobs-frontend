import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import JobPostCard from "../jobs/JobPostCard";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import "./CompanyProfile.css";

const api_URL = import.meta.env.VITE_API_URL;

function CompanyProfile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [street, setStreet] = useState("Please fill in your street");
  const [zipCode, setZipCode] = useState("Please fill in your zip code");
  const [city, setCity] = useState("Please fill in your city");
  const [country, setCountry] = useState("Please fill in your country");
  const [profilePicture, setProfilePicture] = useState();

  const getProfile = async () => {
    try {
      const response = await axios.get(`${api_URL}/company/${user.id}`);
      setProfile(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setStreet(response.data.address.street);
      setZipCode(response.data.address.zipCode);
      setCity(response.data.address.city);
      setCountry(response.data.address.country);
      setProfilePicture(response.data.profilePic);
    } catch (error) {
      console.log("There was an error getting the profile", error);
    }
  };

  const deleteFavorite = async (favoriteId) => {
    const id = profile._id;
    const requestBody = { id, favoriteId };
    try {
      const response = await axios.put(`${api_URL}/company/delete/favorite`, requestBody);
      getProfile();
    } catch (error) {}
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const requestBody = {
      name,
      email,
      street,
      zipCode,
      city,
      country,
    };
    try {
      const response = await axios.put(`${api_URL}/company/edit/${user.id}`, requestBody);
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    profile && (
      <>
        <div> This is the company profile</div>
        <form onSubmit={handleEdit} className="edit-form">
          <div className="title">
            <img
              src={profilePicture ? profilePicture : `https://api.dicebear.com/5.x/initials/svg?seed=${name}`}
              alt={name}
            />
            <h2>Company information</h2>
          </div>
          <h6>Click on the information to edit</h6>
          <div className="information">
            <div className="input-label">
              <label>Company name:</label>
              <input
                style={{ border: "none", outline: "none" }}
                type="text"
                placeholder={name}
                onChange={(event) => setName(event.target.value)}
                value={name}
              />
            </div>
            <div className="input-label">
              <label>Company email:</label>
              <input
                style={{ border: "none", outline: "none" }}
                type="text"
                placeholder={email}
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </div>

            <span className="address">Address: </span>
            <div className="input-label">
              <label>Street:</label>
              <input
                style={{ border: "none", outline: "none" }}
                type="text"
                placeholder={street}
                onChange={(event) => setStreet(event.target.value)}
                value={street}
              />
            </div>
            <div className="input-label">
              <label>Zip Code:</label>
              <input
                style={{ border: "none", outline: "none" }}
                type="text"
                placeholder={zipCode}
                onChange={(event) => setZipCode(event.target.value)}
                value={zipCode}
              />
            </div>
            <div className="input-label">
              <label>City:</label>
              <input
                style={{ border: "none", outline: "none" }}
                type="text"
                placeholder={city}
                onChange={(event) => setCity(event.target.value)}
                value={city}
              />
            </div>
            <div className="input-label">
              <label>Country:</label>
              <input
                style={{ border: "none", outline: "none" }}
                type="text"
                placeholder={country}
                onChange={(event) => setCountry(event.target.value)}
                value={country}
              />
            </div>
          </div>

          {message && <span>{message}</span>}
          <button type="submit">edit information</button>
        </form>
        <div className="input-label">
          <label>profile picture:</label>
          <CloudinaryUploadWidget profilePicture={profilePicture} setProfilePicture={setProfilePicture} />
        </div>
        <div className="lists">
          <div className="favorites">
            <h4>All your favorite juniors</h4>
            <ul>
              {profile.favorites.map((favorite) => {
                return (
                  <li>
                    <div className="card">
                      <div className="image-outer">
                        <img src={favorite.profilePic} alt={`${favorite.firstName} ${favorite.lastName}`} />
                      </div>
                      <div className="junior-name">
                        <h5>{favorite.firstName}</h5>
                        <h5>{favorite.lastName}</h5>
                      </div>
                      <div className="skills">
                        <h5>
                          <ul>
                            {favorite.skills.map((skill) => {
                              return <li key={skill}>{skill}</li>;
                            })}
                          </ul>
                        </h5>
                      </div>
                      <div className="country">
                        <h5>{favorite.location.country}</h5>
                        <div className="details-heart">
                          <h5>
                            <Link to={`/junior/${favorite._id}`}>details</Link>
                          </h5>
                          <IconButton>
                            <ClearIcon onClick={() => deleteFavorite(favorite._id)} />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="jobPosts">
            <h4>All your job posts</h4>
            <ul className="ul-jobposts">
              {profile.jobPosts.map((post) => {
                return (
                  <li>
                    <JobPostCard post={post} profile={profile} getProfile={getProfile} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    )
  );
}

export default CompanyProfile;
