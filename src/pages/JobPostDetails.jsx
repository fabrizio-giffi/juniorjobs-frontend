import {
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
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
const gmaps = import.meta.env.VITE_GMAPS;

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
    <Container component="main" maxWidth="lg">
      {!editing && (
        <Card sx={{ px: 4, py: 3, my: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" gutterBottom>
              {jobPost.title}
            </Typography>
            <ListItemIcon>
              <HomeRepairServiceIcon sx={{ mr: 1 }} />
              <Typography variant="button">{jobPost.description.jobtype}</Typography>
            </ListItemIcon>
            <ListItemIcon>
              <LabelRoundedIcon sx={{ mr: 1 }} />
              <Typography variant="button">temp</Typography>
            </ListItemIcon>
          </Box>
          {isLoggedIn ? (
            <>
              <Typography variant="h6">HR Contact: {jobPost.email}</Typography>
              <Link to={`/company/${jobPost.company._id}`}>
                <Typography variant="h5" color="success">
                  {jobPost.company.name}
                </Typography>
              </Link>
              <Typography>
                {jobPost.address.city} - {jobPost.address.country}
              </Typography>
              <Divider />
              <Typography variant="h6">Job Description</Typography>
              <Typography variant="body1" gutterBottom>
                {jobPost.description.heading}
              </Typography>
              <Typography variant="h6">Your tasks</Typography>
              <Typography variant="body1" gutterBottom>
                {jobPost.description.tasks}
              </Typography>
              <Typography variant="h6">Your profile</Typography>
              <Typography variant="body1" gutterBottom>
                {jobPost.description.requirements}
              </Typography>
              <Typography variant="h6">Benefits</Typography>
              <Typography variant="body1" gutterBottom>
                {jobPost.description.benefits}
              </Typography>
              <Divider />
              <Typography variant="h6">Salary range</Typography>
              <Typography variant="body1" gutterBottom>
                €<span>{jobPost.salaryRange.minimum}</span> - €<span>{jobPost.salaryRange.maximum}</span>
              </Typography>
              <Typography style={{ marginBottom: "40px" }}>
                Created: {dateCreated.toLocaleDateString("en-US", options)}
              </Typography>
              <iframe
                width="300"
                height="300"
                style={{ border: "none" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${gmaps}&q=${jobPost.address.city}+${jobPost.address.country}`}
              ></iframe>
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
            <p className="prompt">
              <Link to="/login">Log in</Link> or <Link to="/signup">sign up</Link> to see more informations
            </p>
          )}
        </Card>
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
