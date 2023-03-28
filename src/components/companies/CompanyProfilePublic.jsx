import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { Avatar, Box, Card, Container, Divider, IconButton, List, Skeleton, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaceIcon from "@mui/icons-material/Place";
import PublicIcon from "@mui/icons-material/Public";
import EmailIcon from "@mui/icons-material/Email";
import JobPostCard from "../jobs/JobPostCard";

const api_URL = import.meta.env.VITE_API_URL;
const gmaps = import.meta.env.VITE_GMAPS;

function CompanyProfilePublic() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [userDB, setUserDB] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [updated, setUpdated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [jobPosts, setJobPosts] = useState([]);
  const [street, setStreet] = useState("N/A");
  const [zipCode, setZipCode] = useState("N/A");
  const [city, setCity] = useState("N/A");
  const [country, setCountry] = useState("N/A");
  const params = useParams();
  const { id } = params;

  const getProfile = async () => {
    console.log(userDB);
    try {
      const response = await axios.get(`${api_URL}/company/${id}`);
      setName(response.data.name);
      setEmail(response.data.email);
      setStreet(response.data.address.street);
      setZipCode(response.data.address.zipCode);
      setCity(response.data.address.city);
      setCountry(response.data.address.country);
      setProfilePicture(response.data.profilePic);
      setJobPosts(response.data.jobPosts);
      setUpdated(false);
    } catch (error) {
      console.log("There was an error getting the profile", error);
    }
  };

  const fetchData = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get(`${api_URL}/user/${user.id}`);
      setUserDB(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addCompany = async () => {
    const requestBody = { id: user.id, companyId: id };
    try {
      setIsFetching(true);
      await axios.put(`${api_URL}/user/addCompany`, requestBody);
      setUpdated(true);
    } catch (error) {
      console.log(error);
    }
    return;
  };

  useEffect(() => {
    getProfile();
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [updated]);

  return (
    <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", gap: 3, justifyContent: "center", my: 3 }}>
      {!user ? (
        <Typography className="prompt" variant="h5" textAlign="center" sx={{ mt: 3 }}>
          Please <Link>log in</Link> or <Link>sign up</Link> to see the company info.
        </Typography>
      ) : isFetching ? (
        <Skeleton variant="rounded" height={300} width="100%" />
      ) : (
        <>
          <Card className="media-break" sx={{ bgcolor: "#eaf4f4", display: "flex" }}>
            <Box
              className="media-break"
              sx={{ display: "flex", alignItems: "center", gap: 4, minWidth: "50%", boxSizing: "border-box", p: 4 }}
            >
              <Avatar
                className="profilePic"
                src={profilePicture}
                alt={name}
                sx={{
                  width: 150,
                  height: 150,
                  mr: 2,
                  bgcolor: "white",
                  border: "solid 1px #6b9080",
                }}
              />
              <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "start" }}>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {name}
                </Typography>
                <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton size="small">
                    <EmailIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {email}
                  </Typography>
                </Stack>
                <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton size="small">
                    <PublicIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {city}, {country}
                  </Typography>
                </Stack>
                <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton size="small">
                    <PlaceIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {zipCode}, {street}
                  </Typography>
                </Stack>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
                  {!isLoggedIn || user.role === "company" ? (
                    ""
                  ) : user.role === "junior" && userDB?.favoriteCompanies.some((company) => company._id === id) ? (
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => addCompany(id)} aria-label="add to favorites">
                      <FavoriteBorderIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
            <Divider flexItem variant="middle" orientation="vertical" />
            <Box className="collapsemobile" sx={{ bgcolor: "#eaf4f4", minWidth: "50%", boxSizing: "border-box", p: 4 }}>
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
          <Box>
            <Typography variant="h5" sx={{ textAlign: "center", mb: 1 }}>
              Job Posts from {name}
            </Typography>
            <List
              className="jobCtn"
              sx={{ display: "flex", flexFlow: "row wrap", gap: 4, justifyContent: "space-evenly" }}
            >
              {jobPosts.map((post) => {
                return <JobPostCard setUpdated={setUpdated} userDB={userDB} key={post._id} post={post} />;
              })}
            </List>
          </Box>
        </>
      )}
    </Container>
  );
}

export default CompanyProfilePublic;
