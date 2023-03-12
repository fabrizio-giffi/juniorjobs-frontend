import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";
import "./JuniorProfile.css";
import { Button, Typography, TextField, Autocomplete, Box } from "@mui/material";

import countries from "../../data/countries.json";

function JuniorProfile() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [citiesList, setCitiesList] = useState([]);
  const [skills, setSkills] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [favoriteJobPosts, setFavoriteJobPosts] = useState([]);
  const [favoriteCompanies, setFavoriteCompanies] = useState([]);
  const [catchingUserData, setCatchinUserData] = useState(true);
  const [message, setMessage] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState();
  const [calendly, setCalendly] = useState("");

  const api_URL = import.meta.env.VITE_API_URL;

  const getProfile = async () => {
    try {
      const response = await axios.get(`${api_URL}/user/${user.id}`);
      setUserData(response.data);
      setId(response.data._id);
      setFirstName(response.data.firstName);
      setEmail(response.data.email);
      setLastName(response.data.lastName);
      setCountry(response.data.location.country);
      setCity(response.data.location.city);
      setCalendly(response.data.calendly);
      setSkills(response.data.skills);
      setProfilePic(response.data.profilePic);
      setFavoriteCompanies(response.data.favoriteCompanies);
      setFavoriteJobPosts(response.data.favoriteJobPosts);
    } catch (error) {
      console.log(error);
    }
  };

  async function handlefavoriteJobPostsdelete(postId) {
    const requestBody = { id, postId };
    try {
      setCatchinUserData(true);
      const response = await axios.put(`${api_URL}/user/privateprofile/deleteFavJobPost`, requestBody);
      getProfile();
      setCatchinUserData(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSkilldelete(skill) {
    const requestBody = { id, skill };
    try {
      setCatchinUserData(true);
      const response = await axios.put(`${api_URL}/user/privateprofile/deleteSkill`, requestBody);
      getProfile();
      setCatchinUserData(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlefavoriteCompanyDelete(companyId) {
    const requestBody = { id, companyId };
    try {
      setCatchinUserData(true);
      const response = await axios.put(`${api_URL}/user/privateprofile/deleteFavCompany`, requestBody);
      getProfile();
      setCatchinUserData(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function editFields(event) {
    event.preventDefault();
    const requestBody = {
      firstName,
      lastName,
      country,
      city,
      calendly,
    };

    try {
      const response = await axios.put(`${api_URL}/user/edit/${user.id}`, requestBody);
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  function changeEdit() {
    if (isEditing == false) {
      setIsEditing(true);
    } else if (isEditing == true) {
      setIsEditing(false);
    }
  }

  async function addSkill(event) {
    event.preventDefault();
    const requestBody = {
      id: user.id,
      newSkill,
    };

    try {
      setCatchinUserData(true);
      const response = await axios.put(`${api_URL}/user/addNewSkill`, requestBody);
      getProfile();
      setCatchinUserData(false);
      setNewSkill("");
    } catch (error) {
      console.log(error);
    }
  }

  const getCities = async () => {
    if (!catchingUserData) {
      const response = await axios.post("https://countriesnow.space/api/v0.1/countries/cities", { country });
      setCitiesList(response.data.data);
    }
  };

  useEffect(() => {
    getProfile();
    setCatchinUserData(false);
  }, []);

  useEffect(() => {
    setCity();
    getCities();
  }, [country]);

  if (catchingUserData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="forms">
        {user.role == "junior" && (
          <div className="form-outer">
            <form onSubmit={editFields} className="edit-junior-form">
              <div className="title">
                <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}`} alt={firstName} />
                <h2>User information</h2>
              </div>
              {isEditing ? <h6>Click on the information to edit</h6> : ""}

              <div className="information">
                <div className="input-label">
                  <label>First Name:</label>
                  {isEditing ? (
                    <input
                      style={{ border: "none", outline: "none" }}
                      type="text"
                      placeholder={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      value={firstName}
                    />
                  ) : (
                    <p>{firstName}</p>
                  )}
                </div>
                <div className="input-label">
                  <label>Last Name:</label>
                  {isEditing ? (
                    <input
                      style={{ border: "none", outline: "none" }}
                      type="text"
                      placeholder={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      value={lastName}
                    />
                  ) : (
                    <p>{lastName}</p>
                  )}
                </div>

                <div className="input-label">
                  <Typography variant="body1">Country:</Typography>
                  {isEditing ? (
                    <Autocomplete
                      id="country-select"
                      sx={{ width: 200 }}
                      options={countries}
                      autoHighlight
                      getOptionLabel={(option) => option.name}
                      onChange={(event) => setCountry(event.target.innerText)}
                      renderOption={(props, option) => (
                        <Box component="li" key={option.iso3} sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                          <img loading="lazy" width="20" src={option.flag} alt={option.name} />
                          {option.name}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Country"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: country,
                          }}
                        />
                      )}
                    />
                  ) : (
                    <Typography variant="body1">{country}</Typography>
                  )}
                </div>
                <div className="input-label">
                  <Typography variant="body1">City:</Typography>
                  {isEditing ? (
                    <>
                      <Autocomplete
                        sx={{ width: 200 }}
                        id="city-select"
                        freeSolo
                        value={city}
                        options={citiesList}
                        onChange={(event) => setCity(event.target.innerText)}
                        renderInput={(params) => <TextField {...params} label="City" />}
                      />
                    </>
                  ) : (
                    <Typography variant="body1">{city}</Typography>
                  )}
                </div>
                <div className="input-label">
                  <label>Calendly Link:</label>
                  {isEditing ? (
                    <input
                      style={{ border: "none", outline: "none" }}
                      type="text"
                      placeholder={calendly}
                      onChange={(event) => setCalendly(event.target.value)}
                      value={calendly}
                    />
                  ) : (
                    <p>{calendly}</p>
                  )}
                </div>
              </div>

              {message && <span>{message}</span>}

              <div className="button">
                {isEditing ? (
                  <>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
                      type="submit"
                      onClick={changeEdit}
                    >
                      Commit Changes
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
                      type="button"
                      onClick={changeEdit}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
                    onClick={changeEdit}
                  >
                    Edit information
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
        <div className="form-outer">
          <div className="form-inner">
            <form onSubmit={addSkill} className="add-skill-form">
              <Typography variant="overline">Add a new skill:</Typography>
              <input
                type="text"
                placeholder={newSkill}
                onChange={(event) => setNewSkill(event.target.value)}
                value={newSkill}
                autoFocus
                style={{ height: "25px" }}
              />
              <Button variant="contained" sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }} type="submit">
                Add Skill
              </Button>
            </form>
            <div className="skills skills-junior-profile">
              <div className="skills-word">
                <span>skills:</span>
              </div>
              <ul>
                {skills.length > 0 &&
                  skills.map((skill) => {
                    return (
                      <div key={skill}>
                        <li>
                          {skill}
                          <Button
                            id="Button-x"
                            variant="contained"
                            sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
                            type="button"
                            className="button-x"
                            onClick={() => handleSkilldelete(skill)}
                          >
                            X
                          </Button>
                        </li>
                      </div>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="favorites-juniors">
        <div className="form-outer">
          <div className="job-posts-juniors-profile-inner">
            <div className="jobposts-title">Job posts:</div>
            <ul>
              {favoriteJobPosts.length > 0 &&
                favoriteJobPosts.map((jobPost) => {
                  return (
                    <>
                      <li key={jobPost._id}>
                        <div className="information-jobpost">
                          <div className="title-job">{jobPost.title}</div>
                          <div>
                            {jobPost.salaryRange.minimum}-{jobPost.salaryRange.maximum}
                          </div>
                          <div>{jobPost.company.name}</div>
                        </div>

                        <div className="buttons-favorites">
                          <Link to={`/jobs/${jobPost._id}`}>
                            <Button variant="contained" sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }} type="button">
                              Show Post
                            </Button>
                          </Link>
                          <Button
                            variant="contained"
                            sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
                            type="button"
                            onClick={() => handlefavoriteJobPostsdelete(jobPost._id)}
                          >
                            X
                          </Button>
                        </div>
                      </li>
                      <hr className="line" />
                    </>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="form-outer">
          <div className="favorite-companies-junior-inner">
            <div className="jobposts-title">Favorite companies:</div>
            <ul>
              {favoriteCompanies.length > 0 &&
                favoriteCompanies.map((company) => {
                  return (
                    <>
                      <li key={company._id}>
                        <div className="company-name">{company.name}</div>
                        <div className="buttons-favorites">
                          <Link to={`/company/${company._id}`}>
                            <Button variant="contained" sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }} type="button">
                              Show Company
                            </Button>
                          </Link>
                          <Button
                            variant="contained"
                            sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
                            type="button"
                            onClick={() => handlefavoriteCompanyDelete(company._id)}
                          >
                            X
                          </Button>
                        </div>
                      </li>
                      <hr className="line" />
                    </>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default JuniorProfile;
