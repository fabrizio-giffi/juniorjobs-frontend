import { Box, Button, Card, CardHeader, Divider, IconButton, List, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import PaidIcon from "@mui/icons-material/Paid";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { AuthContext } from "../../context/auth.context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const api_URL = import.meta.env.VITE_API_URL;
let filtered = [];

function JobPostProfile() {
  const { user } = useContext(AuthContext);
  const [jobPosts, setJobPosts] = useState([]);
  const [showIndex, setShowIndex] = useState(2);
  const [showMore, setShowMore] = useState(false);

  const getPosts = async () => {
    if (user.role === "junior") {
      try {
        const response = await axios.get(`${api_URL}/user/${user.id}`);
        setJobPosts(response.data.favoriteJobPosts);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.get(`${api_URL}/company/${user.id}`);
        setJobPosts(response.data.jobPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function deletePost(postId) {
    const requestBody = { id: user.id, postId };
    try {
      await axios.put(`${api_URL}/user/privateprofile/deleteFavJobPost`, requestBody);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  const deleteJobPost = async (jobPostId) => {
    try {
      await axios.delete(`${api_URL}/posts/delete/${jobPostId}`);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Box className="notop" sx={{ minWidth: "50%", boxSizing: "border-box", p: 4 }}>
      <Typography variant="h6">{user.role === "junior" ? "Favorite" : "Your"} job posts</Typography>
      <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {jobPosts.length > 0 &&
          (filtered = jobPosts
            .filter((jobPost, index) => index < showIndex)
            .map((jobPost) => {
              return (
                <Card
                  sx={{
                    display: "flex",
                    bgcolor: "#fbfbfb",
                    flexDirection: "column",
                    alignItems: "start",
                    p: 1,
                    pb: 2,
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
                    {user.role === "junior" ? (
                      <IconButton size="small" type="button" onClick={() => deletePost(jobPost._id)}>
                        <ClearIcon />
                      </IconButton>
                    ) : (
                      <IconButton size="small" type="button" onClick={() => deleteJobPost(jobPost._id)}>
                        <ClearIcon />
                      </IconButton>
                    )}
                  </Box>

                  <Stack direction="row" alignItems="center" gap={1} sx={{ pl: 2, pr: 2 }}>
                    <IconButton size="small">
                      <PaidIcon />
                    </IconButton>
                    <Typography noWrap variant="body2" color="text.secondary">
                      €{jobPost.salaryRange.minimum} - €{jobPost.salaryRange.maximum}
                    </Typography>
                  </Stack>
                  <Link to={`/company/${jobPost.company._id}`}>
                    <Stack direction="row" alignItems="center" gap={1} sx={{ pl: 2, pr: 2 }}>
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
            }))}
        {filtered.length === 0 && (
          <>
            <Divider />
            <Typography className="prompt">
              Your favorite list is still empty.
              <br />
              Have a look at our newest <Link to={"/jobs"}>job posts</Link>.
            </Typography>
          </>
        )}
        {!showMore && jobPosts.length > 2 && (
          <Button
            variant="contained"
            sx={{ bgcolor: "#6b9080", mt: 1, margin: "1% auto" }}
            onClick={() => {
              setShowMore(true);
              setShowIndex(jobPosts.length);
            }}
          >
            Show more
          </Button>
        )}
        {showMore && (
          <Button
            variant="contained"
            sx={{ bgcolor: "#6b9080", mt: 1, margin: "1% auto" }}
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
