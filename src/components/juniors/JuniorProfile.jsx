import { useContext, useState, useEffect, Fragment } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";
import "./JuniorProfile.css";
import { Typography, Box, Container, IconButton, Avatar, List, Stack, Divider, Card } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import JobPostProfile from "../JobPostProfile";
import JuniorBio from "./JuniorBio";
import SkillsProfile from "./SkillsProfile";
import EditJunior from "./EditJunior";

function JuniorProfile() {
  const { user } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [calendly, setCalendly] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [favoriteCompanies, setFavoriteCompanies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

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
      setFavoriteCompanies(response.data.favoriteCompanies);
    } catch (error) {
      console.log(error);
    }
  };

  async function handlefavoriteCompanyDelete(companyId) {
    const requestBody = { id, companyId };
    try {
      await axios.put(`${api_URL}/user/privateprofile/deleteFavCompany`, requestBody);
      getProfile();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProfile();
    setIsFetching(false);
  }, []);

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
          <JuniorBio
            firstName={firstName}
            lastName={lastName}
            city={city}
            country={country}
            calendly={calendly}
            setIsEditing={setIsEditing}
            isEdited={isEdited}
          />
          <Divider flexItem orientation="vertical" sx={{ ml: 2, mr: 2 }} />
          <SkillsProfile />
        </Card>

        <Card className="media-break" sx={{ bgcolor: "#eaf4f4", display: "flex", padding: "2rem 3rem" }}>
          <JobPostProfile />
          <Divider flexItem orientation="vertical" sx={{ ml: 2, mr: 2 }} />
          <Box sx={{ flexGrow: 1, minWidth: "50%" }}>
            <Typography variant="h6">Favorite companies:</Typography>
            <List>
              {favoriteCompanies.length > 0 &&
                favoriteCompanies.map((company) => {
                  return (
                    <Fragment key={company._id}>
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
                    </Fragment>
                  );
                })}
            </List>
          </Box>
        </Card>
      </Container>

      {/* Modal to update user's info */}
      {isEditing && (
        <EditJunior
          isFetching={isFetching}
          isEditing={isEditing}
          firstName={firstName}
          lastName={lastName}
          country={country}
          city={city}
          calendly={calendly}
          setIsEditing={setIsEditing}
          setIsEdited={setIsEdited}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setCountry={setCountry}
          setCity={setCity}
          setCalendly={setCalendly}
        />
      )}
    </>
  );
}

export default JuniorProfile;
