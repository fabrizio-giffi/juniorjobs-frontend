import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import JobPostProfile from "../jobs/JobPostProfile";
import { Container, Card, Box, Divider, Skeleton } from "@mui/material";
import FavJuniors from "./FavJuniors";
import CompanyBio from "./CompanyBio";
import EditCompany from "./EditCompany";
const api_URL = import.meta.env.VITE_API_URL;
const gmaps = import.meta.env.VITE_GMAPS;

function CompanyProfile() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [profilePicture, setProfilePicture] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const getProfile = async () => {
    try {
      const response = await axios.get(`${api_URL}/company/${user.id}`);
      setName(response.data.name);
      setEmail(response.data.email);
      setStreet(response.data.address.street);
      setZipCode(response.data.address.zipCode);
      setCity(response.data.address.city);
      setCountry(response.data.address.country);
      setProfilePicture(response.data.profilePic);
      setIsFetching(false);
    } catch (error) {
      console.log("There was an error getting the profile", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", gap: 3, justifyContent: "center", mb: 3 }}
      >
        {isFetching ? (
          <Skeleton variant="rounded" height={300} width="100%" />
        ) : (
          <Card className="media-break" sx={{ bgcolor: "#eaf4f4", display: "flex" }}>
            <CompanyBio
              profilePicture={profilePicture}
              setProfilePicture={setProfilePicture}
              name={name}
              email={email}
              city={city}
              country={country}
              zipCode={zipCode}
              street={street}
              setIsEditing={setIsEditing}
              isEdited={isEdited}
            />
            <Divider flexItem variant="middle" orientation="vertical" />
            <Box className="collapsemobile" sx={{ bgcolor: "#eaf4f4", minWidth: "50%", boxSizing: "border-box", p: 3 }}>
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
        )}
        {isFetching ? (
          <Skeleton variant="rounded" height={400} width="100%" />
        ) : (
          <Card className="media-break" sx={{ bgcolor: "#eaf4f4", display: "flex" }}>
            <FavJuniors />
            <Divider className="collapsemobile" flexItem variant="middle" orientation="vertical" />
            <JobPostProfile />
          </Card>
        )}
      </Container>

      {/* Modal to update user's info */}
      {isEditing && (
        <EditCompany
          isFetching={isFetching}
          isEditing={isEditing}
          name={name}
          email={email}
          street={street}
          zipCode={zipCode}
          city={city}
          country={country}
          setName={setName}
          setEmail={setEmail}
          setStreet={setStreet}
          setZipCode={setZipCode}
          setCity={setCity}
          setCountry={setCountry}
          setIsEditing={setIsEditing}
          setIsEdited={setIsEdited}
        />
      )}
    </>
  );
}

export default CompanyProfile;
