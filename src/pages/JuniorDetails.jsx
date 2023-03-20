import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Skeleton, Box, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";

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
    <>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", gap: 3, justifyContent: "center", my: 3 }}
      >
        {isFetching ? (
          <Skeleton variant="rounded" height={300} width="100%" />
        ) : (
          <Card className="media-break" sx={{ bgcolor: "#eaf4f4", display: "flex" }}>
            <Box sx={{ minWidth: "50%" }}>
              <Avatar
                src={profile.profilePic}
                alt="N/A"
                sx={{ width: 150, height: 150, mr: 2, border: "solid 3px #6b9080" }}
              />
            </Box>
            <Box sx={{ minWidth: "50%" }}>Second box</Box>
          </Card>
        )}
      </Container>
    </>
  );
}

export default JuniorDetails;
