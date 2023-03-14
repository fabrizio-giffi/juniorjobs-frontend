import { Avatar, Box, Button, Card, CardHeader, Chip, IconButton, List, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import PublicIcon from "@mui/icons-material/Public";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

const api_URL = import.meta.env.VITE_API_URL;

function FavJuniors() {
  const { user } = useContext(AuthContext);
  const [favoriteJuniors, setFavoriteJuniors] = useState([]);
  const [showIndex, setShowIndex] = useState(2);
  const [showMore, setShowMore] = useState(false);

  const getJuniors = async () => {
    try {
      const response = await axios.get(`${api_URL}/company/${user.id}`);
      setFavoriteJuniors(response.data.favorites);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFavorite = async (favoriteId) => {
    const requestBody = { id: user.id, favoriteId };
    try {
      await axios.put(`${api_URL}/company/delete/favorite`, requestBody);
      getJuniors();
    } catch (error) {}
  };

  useEffect(() => {
    getJuniors();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, minWidth: "50%" }}>
      <Typography variant="h6">Favorite juniors:</Typography>
      <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {favoriteJuniors.length > 0 &&
          favoriteJuniors
            .filter((favorite, index) => index < showIndex)
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
        {!showMore && favoriteJuniors.length > 2 && (
          <Button
            variant="contained"
            sx={{ bgcolor: "#6b9080", mt: 1 }}
            onClick={() => {
              setShowMore(true);
              setShowIndex(favoriteJuniors.length);
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
  );
}

export default FavJuniors;
