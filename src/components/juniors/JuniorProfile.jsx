import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { Container, Divider, Card, Skeleton } from "@mui/material";
import JobPostProfile from "../jobs/JobPostProfile";
import JuniorBio from "./JuniorBio";
import SkillsProfile from "./SkillsProfile";
import EditJunior from "./EditJunior";
import FavCompaniesProfile from "./FavCompaniesProfile";

function JuniorProfile() {
  const { user } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [calendly, setCalendly] = useState("");
  const [bio, setBio] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [field, setField] = useState("");
  const [profilePicture, setProfilePicture] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const api_URL = import.meta.env.VITE_API_URL;

  const getProfile = async () => {
    try {
      const response = await axios.get(`${api_URL}/user/${user.id}`);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setCountry(response.data.location.country);
      setCity(response.data.location.city);
      setCalendly(response.data.calendly);
      setProfilePicture(response.data.profilePic);
      setBio(response.data.bio);
      setPronouns(response.data.pronouns);
      setField(response.data.field);

      setIsFetching(false);
    } catch (error) {
      console.log(error);
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
            <JuniorBio
              profilePicture={profilePicture}
              setProfilePicture={setProfilePicture}
              firstName={firstName}
              lastName={lastName}
              city={city}
              country={country}
              calendly={calendly}
              bio={bio}
              pronouns={pronouns}
              field={field}
              setIsEditing={setIsEditing}
              isEdited={isEdited}
            />
            <Divider className="collapsemobile" flexItem variant="middle" orientation="vertical" />
            <SkillsProfile isEdited={isEdited} />
          </Card>
        )}
        {isFetching ? (
          <Skeleton variant="rounded" height={400} width="100%" />
        ) : (
          <Card className="media-break" sx={{ bgcolor: "#eaf4f4", display: "flex" }}>
            <FavCompaniesProfile />
            <Divider className="collapsemobile" flexItem variant="middle" orientation="vertical" />
            <JobPostProfile />
          </Card>
        )}
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
          bio={bio}
          pronouns={pronouns}
          field={field}
          setIsEditing={setIsEditing}
          setIsEdited={setIsEdited}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setCountry={setCountry}
          setCity={setCity}
          setCalendly={setCalendly}
          setBio={setBio}
          setPronouns={setPronouns}
          setField={setField}
        />
      )}
    </>
  );
}

export default JuniorProfile;
