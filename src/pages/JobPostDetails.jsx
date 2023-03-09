import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import JobPostForm from "../components/jobs/JobPostForm";
import { AuthContext } from "../context/auth.context";
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { Box } from "@mui/system";

const api_URL = import.meta.env.VITE_API_URL;

const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

function JobPostDetails() {
  const [jobPost, setJobPost] = useState({});
  const [dateCreated, setDateCreated] = useState();
  const [editing, setEditing] = useState(false);
  const { id } = useParams();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(true);

  const fetchPost = async () => {
    const response = await axios.get(`${api_URL}/posts/${id}`);
    setJobPost(response.data);
    setIsFetching(false);
    const dateObj = new Date(response.data.createdAt);
    setDateCreated(dateObj);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <Container component="main" maxWidth="md" sx={{border:"0px solid grey", borderRadius:"30px", marginTop:"30px", marginBottom:"30px !important", "-webkit-box-shadow": "2px 2px 15px -3px rgba(0,0,0,0.51)", 
    "box-shadow": "2px 2px 15px -3px rgba(0,0,0,0.51)", padding:"20px 50px !important"}}>
      {!editing && (
        <>
          {" "}
          <Typography variant="h3" paddingTop={"30px"}  gutterBottom>
            {jobPost.title}
          </Typography>
          <Box sx={{ display: "flex" }} disablePadding>
            <Typography variant="overline" >
            <HomeRepairServiceIcon sx={{ mr: 1 }}/>
                {jobPost.description.jobtype}
            </Typography>
          </Box>

          <List sx={{ display: "flex" }}>
            {jobPost.stack.map((element) => (
              <ListItem key={element} disablePadding>
                <ListItemIcon>
                  <LabelRoundedIcon sx={{ mr: 1 }} />
                  <Typography variant="overline">
                    {element}
                  </Typography>
                </ListItemIcon>
                <ListItemText />
              </ListItem>
            ))}
          </List>
          {isLoggedIn ? (
            <>
              {" "}
              <Typography variant="h6">HR Contact: {jobPost.email}</Typography>
              <Link to={`/company/${jobPost.company._id}`}>
                <h4>{jobPost.company.name}</h4>
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
              <p style={{marginBottom:"40px"}}>Created: {dateCreated.toLocaleDateString("en-US", options)}</p>{" "}
            </>
          ) : (
            <p>Log in or sign up to see more informations</p>
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
                <JobPostForm jobPost={jobPost} setEditing={setEditing} isEditing />
              </>
            )}
          </>
        ))}
    </Container>
  );
}

export default JobPostDetails;
