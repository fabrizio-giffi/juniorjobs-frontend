import { Box, Button, Card, CardHeader, IconButton, List, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import PaidIcon from "@mui/icons-material/Paid";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const api_URL = import.meta.env.VITE_API_URL;

function JobPostProfile() {
  const { user } = useContext(AuthContext);
  const [favoriteJobPosts, setFavoriteJobPosts] = useState([]);
  const [showIndex, setShowIndex] = useState(2);
  const [showMore, setShowMore] = useState(false);

  const getPosts = async () => {
    try {
      const response = await axios.get(`${api_URL}/user/${user.id}`);
      setFavoriteJobPosts(response.data.favoriteJobPosts);
    } catch (error) {
      console.log(error);
    }
  };

  async function deletePost(postId) {
    const requestBody = { id: user.id, postId };
    try {
      const response = await axios.put(`${api_URL}/user/privateprofile/deleteFavJobPost`, requestBody);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, minWidth: "50%" }}>
      <Typography variant="h6">Favorite job posts:</Typography>
      <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {favoriteJobPosts.length > 0 &&
          favoriteJobPosts
            .filter((jobPost, index) => index < showIndex)
            .map((jobPost) => {
              return (
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
                    <IconButton size="small" type="button" onClick={() => deletePost(jobPost._id)}>
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
              );
            })}
        {!showMore && favoriteJobPosts.length > 2 && (
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
  );
}

export default JobPostProfile;
