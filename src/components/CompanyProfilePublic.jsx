import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import "./CompanyProfile.css";
import { Card } from "@mui/material";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5005/api/company";

function CompanyProfilePublic() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [street, setStreet] = useState("Please fill in your street");
  const [zipCode, setZipCode] = useState("Please fill in your zip code");
  const [city, setCity] = useState("Please fill in your city");
  const [country, setCountry] = useState("Please fill in your country");
  const [profilePicture, setProfilePicture] = useState("");
  const params = useParams();
  const { id } = params;
  console.log("IDDDD", id);
  const getProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setProfile(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setStreet(response.data.address.street);
      setZipCode(response.data.address.zipCode);
      setCity(response.data.address.city);
      setCountry(response.data.address.country);
      setProfilePicture(response.data.profilePicture);
    } catch (error) {
      console.log("There was an error getting the profile", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    profile && (
      <>
        <div> This is the company profile</div>

        <div className="title">
          <img
            src={`https://api.dicebear.com/5.x/initials/svg?seed=${name}`}
            alt={name}
          />
          <h2>Company information</h2>
        </div>
        <h6>Click on the information to edit</h6>
        <div className="information">
          <div className="input-label">
            <label>Company name:</label>
            <span>{name}</span>
          </div>
          <div className="input-label">
            <label>Company email:</label>
            <span>{email}</span>
          </div>

          <span className="address">Address: </span>
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
          <div className="input-label">
            <label>profile picture:</label>
            <span>{profilePicture}</span>
          </div>
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
            {profile.jobPosts.map((jobPost) => {
              const date = new Date(jobPost.createdAt).toLocaleDateString();
              return (
                <Card key={jobPost._id}>
                  <li>{jobPost.title}</li>
                  <li>{jobPost.description.jobtype}</li>
                  <li>
                    {jobPost.salaryRange.minimum} -{" "}
                    {jobPost.salaryRange.maximum}
                  </li>
                  <span>Posted on:{date}</span>
                </Card>
              );
            })}
          </ul>
        </div>
      </>
    )
  );
}

export default CompanyProfilePublic;
