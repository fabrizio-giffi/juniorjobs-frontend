import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import JobPostForm from "../components/jobs/JobPostForm";
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const api_URL = import.meta.env.VITE_API_URL;
const api_INDEX = import.meta.env.VITE_INDEX_URL;
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
  const [formShow, setFormShow] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [contactInfo, setContactInfo] = useState(user?.email || "");
  const [messageSent, setMessageSent] = useState(false);

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

  const handleMessage = async (event) => {
    event.preventDefault();
    const nodemailer = { subject, message, contactInfo, role: user.role, contact: jobPost.email };
    const response = await axios.post(`${api_INDEX}/send-email`, nodemailer);
    setMessageSent(true);
    console.log(response.data);
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
        <Card
          className="media-break"
          sx={{
            px: 5,
            py: 4,
            my: 4,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Box className="media-expand" sx={{ display: "flex", flexDirection: "column", width: "60%" }}>
            <Typography variant="h4" gutterBottom>
              {jobPost.title}
            </Typography>
            <Box className="column-break" sx={{ display: "flex", gap: 5 }}>
              <ListItemIcon>
                <EmailIcon sx={{ mr: 1 }} />
                <Typography variant="subtitle2">{jobPost.email}</Typography>
              </ListItemIcon>
              <ListItemIcon>
                <ApartmentIcon sx={{ mr: 1 }} />
                <Typography variant="subtitle2">
                  {jobPost.address.city}, {jobPost.address.country}
                </Typography>
              </ListItemIcon>
            </Box>
            <Box className="column-break" sx={{ display: "flex", gap: 5 }}>
              <ListItemIcon>
                <HomeRepairServiceIcon sx={{ mr: 1 }} />
                <Typography variant="subtitle2">{jobPost.description.jobtype}</Typography>
              </ListItemIcon>
              <ListItemIcon>
                <LabelRoundedIcon sx={{ mr: 1 }} />
                <Typography variant="subtitle2">{jobPost.field}</Typography>
              </ListItemIcon>
            </Box>

            {isLoggedIn ? (
              <>
                <Link to={`/company/${jobPost.company._id}`}>
                  <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Avatar aria-label="job post" src={jobPost.company.profilePic} />
                    <Typography variant="h5" color="success">
                      {jobPost.company.name}
                    </Typography>
                  </Stack>
                </Link>
                <Divider className="media-expand" sx={{ maxWidth: "80%", my: 2 }} />
                <Typography variant="h6">Job Description</Typography>
                <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                  {jobPost.description.heading}
                </Typography>
                <Typography variant="h6">Your tasks</Typography>
                <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                  {jobPost.description.tasks}
                </Typography>
                <Typography variant="h6">Your profile</Typography>
                <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                  {jobPost.description.requirements}
                </Typography>
                <Typography variant="h6">Benefits</Typography>
                <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                  {jobPost.description.benefits}
                </Typography>
                <Divider className="media-expand" sx={{ maxWidth: "80%", my: 2 }} />
                <Typography variant="h6">Salary range</Typography>
                <Typography variant="body1" gutterBottom>
                  €<span>{jobPost.salaryRange.minimum}</span> - €<span>{jobPost.salaryRange.maximum}</span>
                </Typography>
                <Box
                  className="column-reverse"
                  sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 3 }}
                >
                  <Box sx={{ display: "flex" }}>
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
                  </Box>
                  <Typography>Created: {dateCreated.toLocaleDateString("en-US", options)}</Typography>
                </Box>
              </>
            ) : (
              <Typography className="prompt" variant="h5" sx={{ mt: 2 }}>
                <Link to="/login">Log in</Link> or <Link to="/signup">sign up</Link> to see more informations
              </Typography>
            )}
          </Box>
          <Divider flexItem orientation="vertical" sx={{ mx: 3 }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <iframe
              className="collapsemobile"
              style={{ border: "none", maxWidth: "100%", height: "300px" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${gmaps}&q=${jobPost.address.city}+${jobPost.address.country}`}
            />
            {messageSent ? (
              <Alert severity="success">An email has been sent to the user.</Alert>
            ) : !formShow ? (
              <Button variant="contained" sx={{ bgcolor: "#6b9080" }} onClick={() => setFormShow(true)}>
                Message company
              </Button>
            ) : (
              <>
                <Stack spacing={1} component="form" onSubmit={handleMessage}>
                  <TextField
                    type="text"
                    value={subject}
                    id="subject"
                    label="Subject"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(event) => setSubject(event.target.value)}
                  />
                  <TextField
                    type="text"
                    value={message}
                    id="message"
                    label="Message"
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    rows={4}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                  <TextField
                    type="text"
                    value={contactInfo}
                    id="contact"
                    label="Your contact informations"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(event) => setContactInfo(event.target.value)}
                  />
                  <Stack spacing={1} direction="row" sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" sx={{ bgcolor: "#6b9080" }} type="submit">Send message</Button>
                    <Button variant="contained" sx={{ bgcolor: "#6b9080" }} type="submit" onClick={() => setFormShow(false)}>
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
              </>
            )}
          </Box>
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
