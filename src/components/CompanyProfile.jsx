import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import './CompanyProfile.css';
import { Card } from "@mui/material";

const API_URL = "http://localhost:5005/api/company";

function CompanyProfile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const getProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/${user.id}`);
      setProfile(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
    } catch (error) {
      console.log("There was an error getting the profile", error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const requestBody = { name, email };
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

console.log(profile)

  return (
    profile && (
      <>
        <div className="title">This is the company profile</div>
        <form onSubmit={handleEdit} className="edit-form">
          <h2>Company information</h2>
          <h6>Click on the information to edit</h6>
          <span>
            Company name:
            <input
              style={{ border: "none", outline: "none" }}
              type="text"
              placeholder={name}
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </span>
          <span>
            Company email:
            <input
              style={{ border: "none", outline: "none" }}
              type="text"
              placeholder={email}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </span>
          <span>Address: </span>
          <div className="information">
            <span>
            Street:
            <input
              style={{ border: "none", outline: "none" }}
              type="text"
              placeholder={email}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </span>
          <span>
          Zip Code:
            <input
              style={{ border: "none", outline: "none" }}
              type="text"
              placeholder={email}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </span>
          <span>
            City:
            <input
              style={{ border: "none", outline: "none" }}
              type="text"
              placeholder={email}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </span>
          <span>
            Country:
            <input
              style={{ border: "none", outline: "none" }}
              type="text"
              placeholder={email}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </span>
          </div>
          
         

          {message && <span>{message}</span>}
          <button type="submit">edit information</button>
        </form>

        <div className="favorites">
            <ul>
              {profile.favorites.map((favorite) => {
                <li>{favorite}</li>;
              })}
            </ul>
          </div>
          <div className="jobPosts">
            <h4>
              All your job posts
            </h4>
            <ul className="ul-jobposts">
              {profile.jobPosts.map((jobPost) => {
                const date = new Date(jobPost.createdAt).toLocaleDateString()
                return (
                  <Card key={jobPost._id}>
                    <li>{jobPost.title}</li>
                    <li>{jobPost.description.jobtype}</li>
                    <li>{jobPost.salaryRange.minimum} - {jobPost.salaryRange.maximum}</li>
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

export default CompanyProfile;
