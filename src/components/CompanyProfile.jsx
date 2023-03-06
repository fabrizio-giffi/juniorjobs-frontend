import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import "./CompanyProfile.css";
import { Card } from "@mui/material";
import JobPostCard from "./JobPostCard";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const API_URL = "http://localhost:5005/api/company";

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
      const response = await axios.get(`${API_URL}/${user.id}`);
      setProfile(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setStreet(response.data.address.street);
      setZipCode(response.data.address.zipCode);
      setCity(response.data.address.city);
      setCountry(response.data.address.country);
      setProfilePicture(response.data.profilePic);
      console.log("GET RESPONSE FRONT",response)
    } catch (error) {
      console.log("There was an error getting the profile", error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const requestBody = {
      name,
      email,
      street,
      zipCode,
      city,
      country
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
  };

  useEffect(() => {
    getProfile();
  }, []);
  

  return (
    profile && (
      
      <>
      {console.log(profile)}
        <div> This is the company profile</div>
        <form onSubmit={handleEdit} className="edit-form">
          <div className="title">
            <img
              src={ profilePicture ? profilePicture : `https://api.dicebear.com/5.x/initials/svg?seed=${name}`}
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

        <div className="favorites">
          <ul>
            {profile.favorites.map((favorite) => {
              <li>{favorite}</li>;
            })}
          </ul>
        </div>
        <div className="jobPosts">
          <h4>All your job posts</h4>
          <ul className="ul-jobposts">
            {profile.jobPosts.map((post) => {
              <li>
                <JobPostCard post={post} />
              </li>;
            })}
          </ul>
        </div>
      </>
    )
  );
}

export default CompanyProfile;
