import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import JobPostCard from "../jobs/JobPostCard";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
import {
  IconButton,
  Button,
  Modal,
  Container,
  Card,
  Typography,
  TextField,
  Box,
  createFilterOptions,
  Autocomplete,
  Avatar,
  Stack,
  Divider,
  List,
  CardHeader,
  Chip,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PlaceIcon from "@mui/icons-material/Place";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PaidIcon from "@mui/icons-material/Paid";
import PublicIcon from "@mui/icons-material/Public";
import EmailIcon from "@mui/icons-material/Email";

import "./CompanyProfile.css";

import countries from "../../data/countries.json";
import JobPostProfile from "../JobPostProfile";
const api_URL = import.meta.env.VITE_API_URL;
const gmaps = import.meta.env.VITE_GMAPS;

// Filter for the cities select
const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option,
});

function CompanyProfile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [profilePicture, setProfilePicture] = useState();
  //States for the edit inputs
  const [nameInput, setNameInput] = useState(name);
  const [emailInput, setEmailInput] = useState(email);
  const [streetInput, setStreetInput] = useState(street);
  const [zipCodeInput, setZipCodeInput] = useState(zipCode);
  const [cityInput, setCityInput] = useState(city);
  const [countryInput, setCountryInput] = useState(country);
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [citiesList, setCitiesList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [indexJunior, setIndexJunior] = useState(2);
  const [indexPost, setIndexPost] = useState(2);
  const [showMoreJunior, setShowMoreJunior] = useState(false);
  const [showMorePost, setShowMorePost] = useState(false);

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
      // Pre-populate edit inputs
      setNameInput(response.data.name);
      setEmailInput(response.data.email);
      setStreetInput(response.data.address.street);
      setZipCodeInput(response.data.address.zipCode);
      setCityInput(response.data.address.city);
      setCountryInput(response.data.address.country);
    } catch (error) {
      console.log("There was an error getting the profile", error);
    }
  };

  const deleteFavorite = async (favoriteId) => {
    const id = profile._id;
    const requestBody = { id, favoriteId };
    try {
      await axios.put(`${api_URL}/company/delete/favorite`, requestBody);
      getProfile();
    } catch (error) {}
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const requestBody = {
      name: nameInput,
      email: emailInput,
      street: streetInput,
      zipCode: zipCodeInput,
      city: cityInput,
      country: countryInput,
    };
    setName(nameInput);
    setEmail(emailInput);
    setStreet(streetInput);
    setZipCode(zipCodeInput);
    setCity(cityInput);
    setCountry(countryInput);

    try {
      await axios.put(`${api_URL}/company/edit/${user.id}`, requestBody);
      setIsEdited(true);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCities = async () => {
    if (!isFetching) {
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
    setIsFetching(false);
  }, []);

  useEffect(() => {
    setCityInput("");
    getCities();
  }, [countryInput]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container
        maxWidth="md"
        sx={{ display: "flex", flexDirection: "column", gap: 3, justifyContent: "center", mb: 3 }}
      >
        <Card className="media-break" sx={{ bgcolor: "#eaf4f4", display: "flex", padding: "2rem 3rem" }}>
          <Box sx={{ flexGrow: 1, minWidth: "50%" }}>
            <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
              <Avatar src={profilePicture} alt="N/A" sx={{ width: 56, height: 56, mr: 2 }} />
              <Typography variant="h5">{name}</Typography>
            </Box>
            <Stack direction="row" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <IconButton size="small">
                <EmailIcon />
              </IconButton>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {email}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <IconButton size="small">
                <PublicIcon />
              </IconButton>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {city}, {country}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <IconButton size="small">
                <PlaceIcon />
              </IconButton>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {zipCode}, {street}
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
            <iframe
              width="100%"
              height="100%"
              style={{ border: "none" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${gmaps}&q=${country}+${city}+${street}`}
            ></iframe>
          </Box>
        </Card>

        <Card className="media-break" sx={{ bgcolor: "#eaf4f4", display: "flex", padding: "2rem 3rem" }}>
          <Box sx={{ flexGrow: 1, minWidth: "50%" }}>
            <Typography variant="h6">Favorite juniors:</Typography>
            <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {profile.favorites?.length > 0 &&
                profile.favorites
                  .filter((favorite, index) => index < indexJunior)
                  .map((favorite) => {
                    return (
                      <Card
                        sx={{
                          display: "flex",
                          bgcolor: "#eaf4f4",
                          flexDirection: "column",
                          alignItems: "start",
                          p: 1,
                        }}
                        key={favorite._id}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "start",
                          }}
                        >
                          <Link to={`/junior/${favorite._id}`}>
                            <CardHeader
                              avatar={
                                <Avatar alt="N/A" sx={{ width: 56, height: 56, mr: 2 }}>
                                  {favorite.firstName[0]}
                                  {favorite.lastName[0]}
                                </Avatar>
                              }
                              title={`${favorite.firstName} ${favorite.lastName}`}
                              subheader={
                                <Stack sx={{ display: "flex", alignItems: "center" }} direction="row">
                                  <PublicIcon sx={{ mr: 1 }} />
                                  {favorite.location.country}
                                </Stack>
                              }
                            />
                          </Link>
                          <IconButton onClick={() => deleteFavorite(favorite._id)}>
                            <ClearIcon />
                          </IconButton>
                        </Box>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                          {favorite.skills.length > 0 &&
                            favorite.skills.map((skill) => {
                              return <Chip key={skill} label={skill} />;
                            })}
                        </Box>
                      </Card>
                    );
                  })}
              {!showMoreJunior && profile.favorites?.length > 2 && (
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#6b9080", mt: 1 }}
                  onClick={() => {
                    setShowMoreJunior(true);
                    setIndexJunior(profile.favorites.length);
                  }}
                >
                  Show more
                </Button>
              )}
              {showMoreJunior && (
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#6b9080", mt: 1 }}
                  onClick={() => {
                    setShowMoreJunior(false);
                    setIndexJunior(2);
                  }}
                >
                  Show less
                </Button>
              )}
            </List>
          </Box>
          <Divider flexItem orientation="vertical" sx={{ ml: 2, mr: 2 }} />
          <Box sx={{ flexGrow: 1, minWidth: "50%" }}>
            <Typography variant="h6">Your job posts:</Typography>
            <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {profile.jobPosts
                ?.filter((favorite, index) => index < indexPost)
                .map((post) => {
                  return (
                    <li className="jobpost-li" key={post._id}>
                      <JobPostProfile jobPost={post} />
                    </li>
                  );
                })}
              {!showMorePost && profile.jobPosts?.length > 2 && (
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#6b9080", mt: 1 }}
                  onClick={() => {
                    setShowMorePost(true);
                    setIndexPost(profile.jobPosts.length);
                  }}
                >
                  Show more
                </Button>
              )}
              {showMorePost && (
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#6b9080", mt: 1 }}
                  onClick={() => {
                    setShowMorePost(false);
                    setIndexPost(2);
                  }}
                >
                  Show less
                </Button>
              )}
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
              <Typography variant="h4" sx={{ mb: 2 }}>
                Update your personal info
              </Typography>
              <Box component="form" onSubmit={handleEdit}>
                <TextField
                  sx={{ mb: 2, bgcolor: "white" }}
                  fullWidth
                  id="company-name"
                  label="Company Name"
                  variant="outlined"
                  type="text"
                  value={nameInput}
                  onChange={(event) => setNameInput(event.target.value)}
                />
                <TextField
                  sx={{ mb: 2, bgcolor: "white" }}
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={emailInput}
                  onChange={(event) => setEmailInput(event.target.value)}
                />
                <TextField
                  sx={{ mb: 2, bgcolor: "white" }}
                  fullWidth
                  id="street"
                  label="Street"
                  variant="outlined"
                  type="text"
                  value={streetInput}
                  onChange={(event) => setStreetInput(event.target.value)}
                />
                <TextField
                  sx={{ mb: 2, bgcolor: "white" }}
                  fullWidth
                  id="zipcode"
                  label="ZIP code"
                  variant="outlined"
                  type="text"
                  value={zipCodeInput}
                  onChange={(event) => setZipCodeInput(event.target.value)}
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
                  placeholder={city}
                  filterOptions={filterOptions}
                  onChange={(event) => setCityInput(event.target.innerText)}
                  renderInput={(params) => <TextField {...params} label="City" />}
                />
                <Typography variant="h5">Change your company picture</Typography>
                <CloudinaryUploadWidget profilePicture={profilePicture} setProfilePicture={setProfilePicture} />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button variant="contained" sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }} type="submit">
                    Commit Changes
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
                    type="button"
                    onClick={() => {
                      setNameInput(name);
                      setEmailInput(email);
                      setStreetInput(street);
                      setZipCodeInput(zipCode);
                      setCityInput(city);
                      setCountryInput(country);
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

export default CompanyProfile;
