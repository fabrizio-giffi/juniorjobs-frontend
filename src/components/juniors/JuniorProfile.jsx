import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";
import "./JuniorProfile.css";
import {
  Button,
  Typography,
  TextField,
  Autocomplete,
  Box,
  createFilterOptions,
  Container,
  IconButton,
  ListItem,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import countries from "../../data/countries.json";

// Filter for the cities select
const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option,
});

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
  const [newSkill, setNewSkill] = useState();
  const [calendly, setCalendly] = useState("");
  //States for the edit inputs
  const [isEditing, setIsEditing] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState(firstName);
  const [lastNameInput, setLastNameInput] = useState(lastName);
  const [countryInput, setCountryInput] = useState(country);
  const [cityInput, setCityInput] = useState(city);
  const [calendlyInput, setCalendlyInput] = useState(calendly);
  const [isEdited, setIsEdited] = useState(false);

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
      // Pre-populate edit inputs
      setFirstNameInput(response.data.firstName);
      setLastNameInput(response.data.lastName);
      setCountryInput(response.data.location.country);
      setCityInput(response.data.location.city);
      setCalendlyInput(response.data.calendly);
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
      setIsEdited(true);
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
      try {
        if (typeof countryInput === "undefined") {
          return;
        }
        const response = await axios.post("https://countriesnow.space/api/v0.1/countries/cities", {
          country: countryInput,
        });
        setCitiesList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getProfile();
    setCatchinUserData(false);
  }, []);

  useEffect(() => {
    setCityInput("");
    getCities();
  }, [countryInput]);

  if (catchingUserData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "center " }}>
        {user.role == "junior" && (
          <Box maxWidth="sm" className="form-outer">
            <form onSubmit={editFields} className="edit-junior-form">
              <Box sx={{ mb: 2 }} className="title">
                <img
                  src={`https://api.dicebear.com/5.x/initials/svg?seed=${firstName[0]}${lastName[0]}}`}
                  alt={firstName}
                />
                <Typography variant="h6">User information</Typography>
              </Box>

              <div className="information">
                <div className="input-label">
                  {isEditing ? (
                    <TextField
                      sx={{ mb: 1 }}
                      fullWidth
                      id="first-name"
                      label="First Name"
                      variant="outlined"
                      type="text"
                      value={firstNameInput}
                      onChange={(event) => setFirstNameInput(event.target.value)}
                    />
                  ) : (
                    <>
                      <Typography variant="body1">Last Name:</Typography>
                      <Typography variant="body1">{firstName}</Typography>
                    </>
                  )}
                </div>
                <div className="input-label">
                  {isEditing ? (
                    <TextField
                      sx={{ mb: 1 }}
                      fullWidth
                      id="last-name"
                      label="Last Name"
                      variant="outlined"
                      type="text"
                      value={lastNameInput}
                      onChange={(event) => setLastNameInput(event.target.value)}
                    />
                  ) : (
                    <>
                      <Typography variant="body1">Last Name:</Typography>
                      <Typography variant="body1">{lastName}</Typography>
                    </>
                  )}
                </div>

                <div className="input-label">
                  {isEditing ? (
                    <Autocomplete
                      sx={{ mb: 1 }}
                      fullWidth
                      id="country-select"
                      options={countries}
                      autoHighlight
                      getOptionLabel={(option) => option.name}
                      onChange={(event) => setCountryInput(event.target.innerText)}
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
                            autoComplete: "new-password",
                          }}
                        />
                      )}
                    />
                  ) : (
                    <>
                      <Typography variant="body1">Country:</Typography>
                      <Typography variant="body1">{country}</Typography>
                    </>
                  )}
                </div>
                <div className="input-label">
                  {isEditing ? (
                    <Autocomplete
                      sx={{ mb: 1 }}
                      fullWidth
                      id="city-select"
                      freeSolo
                      value={cityInput}
                      options={citiesList}
                      filterOptions={filterOptions}
                      onChange={(event) => setCityInput(event.target.innerText)}
                      renderInput={(params) => <TextField {...params} label="City" />}
                    />
                  ) : (
                    <>
                      <Typography variant="body1">City:</Typography>
                      <Typography variant="body1">{city}</Typography>
                    </>
                  )}
                </div>
                <div className="input-label">
                  {isEditing ? (
                    <TextField
                      fullWidth
                      id="calendly"
                      label="Calendly link"
                      variant="outlined"
                      style={{ border: "none", outline: "none" }}
                      type="text"
                      value={calendlyInput}
                      onChange={(event) => setCalendlyInput(event.target.value)}
                    />
                  ) : (
                    <>
                      <Typography variant="body1">Calendly Link:</Typography>
                      <Typography variant="body1">{calendly}</Typography>
                    </>
                  )}
                </div>
              </div>

              {message && <span>{message}</span>}

              <div className="button">
                {isEditing ? (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
                      type="submit"
                      onClick={() => {
                        setFirstName(firstNameInput);
                        setLastName(lastNameInput);
                        setCity(cityInput);
                        setCountry(countryInput);
                        setCalendly(calendlyInput);
                        changeEdit();
                      }}
                    >
                      Commit Changes
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
                      type="button"
                      onClick={() => {
                        setFirstNameInput(firstName);
                        setLastNameInput(lastName);
                        setCityInput(city);
                        setCountryInput(country);
                        setCalendlyInput(calendly);
                        setIsEdited(false);
                        changeEdit();
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
                      onClick={changeEdit}
                    >
                      Edit information
                    </Button>
                    {isEdited && <Typography>Your personal profile has been updated!</Typography>}
                  </Box>
                )}
              </div>
            </form>
          </Box>
        )}
        <Box maxWidth="sm" className="form-outer">
          <div className="form-inner">
            <Typography variant="h6">Add a new skill:</Typography>
            <TextField
              type="text"
              placeholder="e.g. Machine learning"
              value={newSkill}
              onChange={(event) => setNewSkill(event.target.value)}
              autoFocus
            />
            <Button onClick={addSkill} variant="contained" sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }} type="submit">
              Add Skill
            </Button>
            <div className="skills skills-junior-profile">
              <div className="skills-word">
                <Typography variant="h6">Skills:</Typography>
              </div>
              <ul>
                {skills.length > 0 &&
                  skills.map((skill) => {
                    return (
                      <div key={skill}>
                        <ListItem>
                          {skill}
                          <IconButton sx={{ ml: 1, p: 0 }} type="button" onClick={() => handleSkilldelete(skill)}>
                            <ClearIcon sx={{ width: 20 }} />
                          </IconButton>
                        </ListItem>
                      </div>
                    );
                  })}
              </ul>
            </div>
          </div>
        </Box>
      </Container>
      <Container sx={{ display: "flex", justifyContent: "center " }}>
        <Box maxWidth="sm" className="form-outer">
          <div className="job-posts-juniors-profile-inner">
            <Typography variant="h6">Favorite job posts:</Typography>
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
        </Box>
        <Box maxWidth="sm" className="form-outer">
          <div className="favorite-companies-junior-inner">
            <Typography variant="h6">Favorite companies:</Typography>
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
        </Box>
      </Container>
    </>
  );
}

export default JuniorProfile;
