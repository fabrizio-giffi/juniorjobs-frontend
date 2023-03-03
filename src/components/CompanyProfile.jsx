import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005/api/company";

function CompanyProfile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const getProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/${user.id}`);
      setProfile(response.data);
      setName(response.data.name);
      setEmail(response.data.email)
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };


  
  const handleEdit = async (event) => {
    event.preventDefault();
    const requestBody = { name, email };
    try {
      await axios.put(`${API_URL}/edit/${user.id}`, requestBody);
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
        <div>This is the company profile</div>
        <form onSubmit={handleEdit}>
          <span>
            Company name:
            <input
              style={{ border: "none", outline: "none" }}
              type="text"
              placeholder={name}
              // readOnly={!true}
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
              // readOnly={!true}
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
          <button type="submit">edit information</button>
        </form>
      </>
    )
  );
}

export default CompanyProfile;
