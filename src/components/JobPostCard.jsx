import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PaidIcon from "@mui/icons-material/Paid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import { Stack } from "@mui/system";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import ClearIcon from "@mui/icons-material/Clear";

function JobPostCard({ post, userDB, setUpdated, profile, getProfile }) {
  const { user, isLoggedIn } = useContext(AuthContext);
  const addJobPost = async (postId) => {
    const requestBody = { id: user.id, postId };
    const API_URL = "http://localhost:5005/api/user";
    try {
      const response = await axios.put(`${API_URL}/addJobPost`, requestBody);
      setUpdated(true);
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const deleteJobPost = async (jobPostId) => {
    const id = profile._id;
    const requestBody = { id, jobPostId };
    try {
      const response = await axios.put(
        `http://localhost:5005/api/company/delete/jobpost`,
        requestBody
      );
      getProfile();
      console.log(response);
    } catch (error) {}
  };

  return (
    <Card
      className="jobCard"
      sx={{
        width: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <CardHeader
          avatar={
            <Avatar
              aria-label="job post"
              src={post.company.profilePic}
            >{`${post.company.name[0]}${post.company.name[1]}`}</Avatar>
          }
          title={post.title}
          subheader={post.company.name}
          style={{ textAlign: "start" }}
        />
        <CardContent>
          <Stack direction="row" alignItems="center" gap={1}>
            <ApartmentIcon />
            <Typography noWrap variant="body2" color="text.secondary">
              {post.address.city}, {post.address.country}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <PaidIcon />
            <Typography noWrap variant="body2" color="text.secondary">
              €{post.salaryRange.minimum} - €{post.salaryRange.maximum}
            </Typography>
          </Stack>
          <Typography
            style={{ textAlign: "start" }}
            noWrap
            variant="body2"
            color="text.secondary"
          >
            {post.description.heading}
          </Typography>
        </CardContent>
      </Box>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          {!isLoggedIn || !userDB || userDB.favoriteJobPosts.some((job) => job._id === post._id) ? (
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => addJobPost(post._id)}
              aria-label="add to favorites"
            >
              <FavoriteBorderIcon />
            </IconButton>
          )}
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>

          {isLoggedIn && user.role === "company" && post.company._id === profile._id ? (
            <IconButton
              onClick={() => {
                deleteJobPost(post._id);
              }}
            >
              <ClearIcon />
            </IconButton>
          ) : (
            ""
          )}
          {/* <p>Job post added to your favorites</p> */}
        </Box>
        <Link to={`/jobs/${post._id}`}>
          <Button variant="outlined" type="button">
            See details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default JobPostCard;
