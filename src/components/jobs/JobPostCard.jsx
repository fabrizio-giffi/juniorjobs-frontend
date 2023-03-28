import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
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
import { AuthContext } from "../../context/auth.context";
import ClearIcon from "@mui/icons-material/Clear";

const api_URL = import.meta.env.VITE_API_URL;

function JobPostCard({ post, userDB, setUpdated, profile, getProfile }) {
  const { user, isLoggedIn } = useContext(AuthContext);

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

  const deleteJobPost = async (jobPostId) => {
    try {
      await axios.delete(`${api_URL}/posts/delete/${jobPostId}`);
      getProfile();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      className="jobCard"
      sx={{
        width: 500,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        px: 2,
        pt: 1,
      }}
    >
      <Box>
        <CardHeader
          sx={{ display: "flex", alignItems: "start" }}
          avatar={
            <Link to={`/company/${post.company._id}`}>
              <Avatar aria-label="job post" src={post.company.profilePic} />
            </Link>
          }
          title={post.title}
          subheader={<Link to={`/company/${post.company._id}`}>{post.company.name}</Link>}
        />
        <Divider />
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
          <Typography className="description" sx={{ textAlign: "start", mt: 1 }} variant="body1" color="text.secondary">
            {post.description.heading}
          </Typography>
        </CardContent>
      </Box>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          {!isLoggedIn || !userDB || userDB.favoriteJobPosts?.some((job) => job._id === post._id) ? (
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => addJobPost(post._id)} aria-label="add to favorites">
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
        </Box>
        <Link to={`/jobs/${post._id}`}>
          <Button variant="contained" sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }} type="button">
            See details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default JobPostCard;
