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
  Avatar,
  List,
  Stack,
  Divider,
  Card,
  Modal,
  Chip,
  CardHeader,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PaidIcon from "@mui/icons-material/Paid";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import countries from "../../data/countries.json";

// Filter for the cities select
const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option,
});

function JuniorProfile() {
  const { user } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [calendly, setCalendly] = useState("");
  const [catchingUserData, setCatchinUserData] = useState(true);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState();
  const [favoriteJobPosts, setFavoriteJobPosts] = useState([]);
  const [favoriteCompanies, setFavoriteCompanies] = useState([]);
  //States for the edit inputs
  const [isEditing, setIsEditing] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState(firstName);
  const [lastNameInput, setLastNameInput] = useState(lastName);
  const [countryInput, setCountryInput] = useState(country);
  const [cityInput, setCityInput] = useState(city);
  const [calendlyInput, setCalendlyInput] = useState(calendly);
  const [isEdited, setIsEdited] = useState(false);
  const [citiesList, setCitiesList] = useState([]);
  const [showIndex, setShowIndex] = useState(2);
  const [showMore, setShowMore] = useState(false);

  const api_URL = import.meta.env.VITE_API_URL;

  const getProfile = async () => {
    try {
      const response = await axios.get(`${api_URL}/user/${user.id}`);
      setId(response.data._id);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setCountry(response.data.location.country);
      setCity(response.data.location.city);
      setCalendly(response.data.calendly);
      setSkills(response.data.skills);
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
      firstName: firstNameInput,
      lastName: lastNameInput,
      country: countryInput,
      city: cityInput,
      calendly: calendlyInput,
    };
    setFirstName(firstNameInput);
    setLastName(lastNameInput);
    setCountry(countryInput);
    setCity(cityInput);
    setCalendly(calendlyInput);

    try {
      const response = await axios.put(`${api_URL}/user/edit/${user.id}`, requestBody);
      setIsEdited(true);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
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
      <Container
        maxWidth="md"
        sx={{ display: "flex", flexDirection: "column", gap: 3, justifyContent: "center", mb: 3 }}
      >
        {user.role == "junior" && (
          <Card className="media-break" sx={{ bgcolor: "#eaf4f4", display: "flex", padding: "2rem 3rem" }}>
            <Box sx={{ flexGrow: 1, minWidth: "50%" }}>
              <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
                <Avatar alt="N/A" sx={{ width: 56, height: 56, mr: 2 }}>
                  {firstName[0]}
                  {lastName[0]}
                </Avatar>
                <Typography variant="h5">
                  {firstName} {lastName}
                </Typography>
              </Box>
              <Stack direction="row" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <IconButton size="small">
                  <PlaceIcon />
                </IconButton>
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {city}, {country}
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
                <IconButton size="small">
                  <CalendarMonthIcon />
                </IconButton>
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Calendly Link: {calendly}
                </Typography>
              </Stack>

              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
                  onClick={() => setIsEditing(true)}
                >
                  Edit information
                </Button>
                {isEdited && <Typography>Your personal profile has been updated!</Typography>}
              </Box>
            </Box>
            <Divider flexItem orientation="vertical" sx={{ ml: 2, mr: 2 }} />
            <Box sx={{ bgcolor: "#eaf4f4", flexGrow: 1, minWidth: "50%" }}>
              <Typography variant="h6">Your skills:</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {skills.length > 0 &&
                  skills.map((skill) => {
                    return <Chip key={skill} label={skill} onDelete={() => handleSkilldelete(skill)} />;
                  })}
              </Box>
              <Stack>
                <Typography variant="h6">Add a new skill:</Typography>
                <TextField
                  sx={{ bgcolor: "white" }}
                  type="text"
                  placeholder="e.g. Machine learning"
                  value={newSkill}
                  onChange={(event) => setNewSkill(event.target.value)}
                  autoFocus
                />
                <Button onClick={addSkill} variant="contained" sx={{ bgcolor: "#6b9080", mt: 2 }} type="submit">
                  Add Skill
                </Button>
              </Stack>
            </Box>
          </Card>
        )}
        <Card className="media-break" sx={{ bgcolor: "#eaf4f4", display: "flex", padding: "2rem 3rem" }}>
          <Box sx={{ flexGrow: 1, minWidth: "50%" }}>
            <Typography variant="h6">Favorite job posts:</Typography>
            <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {favoriteJobPosts.length > 0 &&
                favoriteJobPosts
                  .filter((jobPost, index) => index < showIndex)
                  .map((jobPost) => {
                    return (
                      <>
                        <Card
                          sx={{
                            display: "flex",
                            bgcolor: "#eaf4f4",
                            flexDirection: "column",
                            alignItems: "start",
                            p: 1,
                          }}
                          key={jobPost._id}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <Link to={`/jobs/${jobPost._id}`}>
                              <CardHeader title={jobPost.title}></CardHeader>
                            </Link>
                            <IconButton
                              size="small"
                              type="button"
                              onClick={() => handlefavoriteJobPostsdelete(jobPost._id)}
                            >
                              <ClearIcon />
                            </IconButton>
                          </Box>

                          <Stack direction="row" alignItems="center" gap={1}>
                            <IconButton size="small">
                              <PaidIcon />
                            </IconButton>
                            <Typography noWrap variant="body2" color="text.secondary">
                              €{jobPost.salaryRange.minimum} - €{jobPost.salaryRange.maximum}
                            </Typography>
                          </Stack>
                          <Link to={`/company/${jobPost.company._id}`}>
                            <Stack direction="row" alignItems="center" gap={1}>
                              <IconButton size="small">
                                <ApartmentIcon />
                              </IconButton>
                              <Typography noWrap variant="body2" color="text.secondary">
                                {jobPost.company.name}
                              </Typography>
                            </Stack>
                          </Link>
                        </Card>
                      </>
                    );
                  })}
              {!showMore && (
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#6b9080", mt: 1 }}
                  onClick={() => {
                    setShowMore(true);
                    setShowIndex(favoriteJobPosts.length);
                  }}
                >
                  Show more
                </Button>
              )}
              {showMore && (
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#6b9080", mt: 1 }}
                  onClick={() => {
                    setShowMore(false);
                    setShowIndex(2);
                  }}
                >
                  Show less
                </Button>
              )}
            </List>
          </Box>
          <Divider flexItem orientation="vertical" sx={{ ml: 2, mr: 2 }} />
          <Box sx={{ flexGrow: 1, minWidth: "50%" }}>
            <Typography variant="h6">Favorite companies:</Typography>
            <List>
              {favoriteCompanies.length > 0 &&
                favoriteCompanies.map((company) => {
                  return (
                    <>
                      <Box sx={{ display: "flex", p: 2, alignItems: "center", justifyContent: "space-between" }}>
                        <Link to={`/company/${company._id}`} key={company._id}>
                          <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar sx={{ mr: 1 }} alt={company.name} src={company.profilePic} />
                            <Typography>{company.name}</Typography>
                          </Stack>
                        </Link>
                        <IconButton
                          sx={{ ml: 1, p: 0 }}
                          type="button"
                          onClick={() => handlefavoriteCompanyDelete(company._id)}
                        >
                          <ClearIcon sx={{ width: 20 }} />
                        </IconButton>
                      </Box>
                      <Divider component="li" flexItem orientation="horizontal" />
                    </>
                  );
                })}
            </List>
          </Box>
        </Card>
      </Container>

      {/* Modal to update user's info */}
      {isEditing && (
        <Modal
          sx={{ display: "flex", alignItems: "center" }}
          aria-labelledby="edit-info-form"
          aria-describedby="edit-info-form"
          open={open}
          onClose={() => setIsEditing(false)}
        >
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ bgcolor: "#eaf4f4", padding: 3 }}>
              <Box component="form" onSubmit={editFields}>
                <TextField
                  sx={{ mb: 2, bgcolor: "white" }}
                  fullWidth
                  id="first-name"
                  label="First Name"
                  variant="outlined"
                  type="text"
                  value={firstNameInput}
                  onChange={(event) => setFirstNameInput(event.target.value)}
                />
                <TextField
                  sx={{ mb: 2, bgcolor: "white" }}
                  fullWidth
                  id="last-name"
                  label="Last Name"
                  variant="outlined"
                  type="text"
                  value={lastNameInput}
                  onChange={(event) => setLastNameInput(event.target.value)}
                />
                <Autocomplete
                  sx={{ mb: 2, bgcolor: "white" }}
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
                <Autocomplete
                  sx={{ mb: 2, bgcolor: "white" }}
                  fullWidth
                  id="city-select"
                  freeSolo
                  value={cityInput}
                  options={citiesList}
                  filterOptions={filterOptions}
                  onChange={(event) => setCityInput(event.target.innerText)}
                  renderInput={(params) => <TextField {...params} label="City" />}
                />
                <TextField
                  fullWidth
                  id="calendly"
                  label="Calendly link"
                  variant="outlined"
                  sx={{ bgcolor: "white" }}
                  value={calendlyInput}
                  onChange={(event) => setCalendlyInput(event.target.value)}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button variant="contained" sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }} type="submit">
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
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Card>
          </Container>
        </Modal>
      )}
    </>
  );
}

export default JuniorProfile;
