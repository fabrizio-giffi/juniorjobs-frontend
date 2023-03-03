import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005/api/company";

function CompanyProfile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const getProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/${user.id}`)
      setProfile(response.data);
      setName(response.data.name);
      setEmail(response.data.email)
    } catch (error) {
      console.log("There was an error getting the profile", error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const requestBody = { name, email };
    try {
     const response = await axios.put(`${API_URL}/edit/${user.id}`, requestBody);
     setMessage(response.data.message)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  

  return (
    profile && (
      <>{console.log("PROFILEE", profile)}
        <div>This is the company profile</div>
        <form onSubmit={handleEdit}>
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
          <div className="favorites">
            <ul>
              {profile.favorites.map((favorite) => {
                <li>{favorite}</li>;
              })}
            </ul>
          </div>
          <div className="jobPosts">
            <ul>
              {profile.jobPosts.map((jobPost) => {
                <li>{jobPost}</li>;
              })}
            </ul>
          </div>{" "}
          {message &&
          <span>{message}</span>
          }
          <button type="submit">edit information</button>
        </form>
      </>
    )
  );
}

export default CompanyProfile;
