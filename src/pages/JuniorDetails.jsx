import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Skeleton, Box, Avatar, Typography, IconButton, Stack, Divider, Chip } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function JuniorDetails() {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  const api_URL = import.meta.env.VITE_API_URL;

  const getProfile = async () => {
    try {
      const response = await axios.get(`${api_URL}/user/${id}`);
      setProfile(response.data);

      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", gap: 3, justifyContent: "center", my: 3 }}>
      {isFetching ? (
        <Skeleton variant="rounded" height={300} width="100%" />
      ) : (
        <Card className="media-break" sx={{ bgcolor: "#eaf4f4", display: "flex" }}>
          <Box className="nobottom" sx={{ minWidth: "50%", boxSizing: "border-box", p: 4 }}>
            <Box className="media-break" sx={{ mb: 4, display: "flex", alignItems: "start", gap: 4 }}>
              <Box sx={{ position: "relative" }}>
                {profile.profilePic ? (
                  <Avatar
                    className="profilePic"
                    src={profile.profilePic}
                    alt="N/A"
                    sx={{ width: 150, height: 150, mr: 2, border: "solid 1px #6b9080" }}
                  />
                ) : (
                  <Avatar
                    className="profilePic"
                    src="/broken-image.jpg"
                    sx={{
                      width: 150,
                      height: 150,
                      mr: 2,
                      bgcolor: "#fbfbfb",
                      border: "solid 1px #6b9080",
                    }}
                  >
                    <PersonIcon sx={{ color: "#6b9080", width: 100, height: 100 }} />
                  </Avatar>
                )}
              </Box>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "start", mb: 1 }}
                >
                  <Box>
                    <Typography variant="h5">
                      {profile.firstName} {profile.lastName}
                    </Typography>
                    <Typography
                      sx={{ display: profile.pronouns === "other" || "" ? "none" : "block" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      ({profile.pronouns})
                    </Typography>
                  </Box>
                </Box>
                <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
                  <PlaceIcon color="action" size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {profile.location.city}, {profile.location.country}
                  </Typography>
                </Stack>
                <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarMonthIcon color="action" size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    Calendly Link:
                    <Link to={profile.calendly} target="_blank">
                      {profile.calendly}
                    </Link>
                  </Typography>
                </Stack>
                <Stack sx={{ mt: 2 }}>
                  <Typography variant="body1">{profile.bio}</Typography>
                </Stack>
              </Box>
            </Box>
          </Box>
          <Divider className="collapsemobile" flexItem variant="middle" orientation="vertical" />
          <Box
            className="notop"
            sx={{
              bgcolor: "#eaf4f4",
              minWidth: "50%",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
              p: 3,
            }}
          >
            <Typography variant="h6">Junior {profile.field} developer</Typography>
            <Divider sx={{ my: 2 }} flexItem />
            <Box sx={{ display: "flex", height: "100%", flexDirection: "column", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ mb: 2 }} variant="h6">
                  Skills
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  {profile.skills.length > 0 &&
                    profile.skills.map((skill) => {
                      return <Chip key={skill} label={skill}/>;
                    })}
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
      )}
    </Container>
  );
}

export default JuniorDetails;
