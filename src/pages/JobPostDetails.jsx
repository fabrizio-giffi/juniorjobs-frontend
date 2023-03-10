import { Button, Container, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import JobPostForm from "../components/jobs/JobPostForm";
import { AuthContext } from "../context/auth.context";
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { Box } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const api_URL = import.meta.env.VITE_API_URL;

const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

function JobPostDetails() {
  const [jobPost, setJobPost] = useState({});
  const [dateCreated, setDateCreated] = useState();
  const [editing, setEditing] = useState(false);
  const [userDB, setUserDB] = useState({});
  const [updated, setUpdated] = useState(false);
  const { id } = useParams();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(true);

  const fetchPost = async () => {
    const response = await axios.get(`${api_URL}/posts/${id}`);
    setJobPost(response.data);
    if (user) {
      const fetchedUser = await axios.get(`${api_URL}/user/${user.id}`);
      setUserDB(fetchedUser.data);
    }
    setIsFetching(false);
    const dateObj = new Date(response.data.createdAt);
    setDateCreated(dateObj);
  };

  const addJobPost = async (postId) => {
    const requestBody = { id: user.id, postId };
    try {
      await axios.put(`${api_URL}/user/addJobPost`, requestBody);
      setUpdated(true);
    } catch (error) {
      console.log(error);
    }
    return;
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    fetchPost();
  }, [isFetching]);

  useEffect(() => {
    fetchPost();
  }, [updated]);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        border: "0px solid grey",
        borderRadius: "30px",
        marginTop: "30px",
        marginBottom: "30px !important",
        "-webkit-box-shadow": "2px 2px 15px -3px rgba(0,0,0,0.51)",
        "box-shadow": "2px 2px 15px -3px rgba(0,0,0,0.51)",
        padding: "20px 50px !important",
      }}
    >
      {!editing && (
        <>
          {" "}
          <Typography variant="h3" paddingTop={"30px"} gutterBottom>
            {jobPost.title}
          </Typography>
          <Box sx={{ display: "flex" }} disablePadding>
            <ListItemIcon variant="overline">
              <HomeRepairServiceIcon sx={{ mr: 1 }} />
              <Typography variant="overline">{jobPost.description.jobtype}</Typography>
            </ListItemIcon>
          </Box>
          <List sx={{ display: "flex" }}>
            {jobPost.stack.map((element) => (
              <ListItem key={element} disablePadding>
                <ListItemIcon sx={{ display: "flex", alignItems: "center" }}>
                  <LabelRoundedIcon sx={{ mr: 1 }} />
                  <Typography variant="overline">{element}</Typography>
                </ListItemIcon>
                <ListItemText />
              </ListItem>
            ))}
          </List>
          {isLoggedIn ? (
            <>
              <Typography variant="h6">HR Contact: {jobPost.email}</Typography>
              <Link to={`/company/${jobPost.company._id}`}>
                <Typography sx={{ fontSize: "30px", fontWeight: "600", color: "var(--mint-green)", padding: "10px 0" }}>
                  {jobPost.company.name}
                </Typography>
              </Link>
              <Typography>
                {jobPost.address.city} - {jobPost.address.country}
              </Typography>
              <h3>Job Description:</h3>
              <Typography variant="body1" gutterBottom>
                {jobPost.description.heading}
              </Typography>
              <h3>Your tasks:</h3>
              <Typography variant="body1" gutterBottom>
                {jobPost.description.tasks}
              </Typography>
              <h3>Your profile:</h3>
              <Typography variant="body1" gutterBottom>
                {jobPost.description.requirements}
              </Typography>
              <h3>Benefits:</h3>
              <Typography variant="body1" gutterBottom>
                {jobPost.description.benefits}
              </Typography>
              <h3>Salary range:</h3>
              <Typography variant="body1" gutterBottom>
                €<span>{jobPost.salaryRange.minimum}</span> - €<span>{jobPost.salaryRange.maximum}</span>
              </Typography>
              <p style={{ marginBottom: "40px" }}>Created: {dateCreated.toLocaleDateString("en-US", options)}</p>
              {!isLoggedIn || !userDB || userDB.favoriteJobPosts?.some((job) => job._id === jobPost._id) ? (
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => addJobPost(jobPost._id)} aria-label="add to favorites">
                  <FavoriteBorderIcon />
                </IconButton>
              )}
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </>
          ) : (
            <p className="prompt"><Link to="/login">Log in</Link> or <Link to="/signup">sign up</Link> to see more informations</p>
          )}
        </>
      )}

      {!isLoggedIn ||
        (jobPost.company._id === user?.id && (
          <>
            {!editing && (
              <Button
                fullWidth
                variant="contained"
                sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
                onClick={() => setEditing(true)}
              >
                Edit post
              </Button>
            )}

            {editing && (
              <>
                <JobPostForm jobPost={jobPost} setIsFetching={setIsFetching} setEditing={setEditing} isEditing />
              </>
            )}
          </>
        ))}
    </Container>
  );
}

export default JobPostDetails;
