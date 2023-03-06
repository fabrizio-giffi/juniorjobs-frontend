import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PaidIcon from "@mui/icons-material/Paid";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Stack } from "@mui/system";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

function JobPostCard({ post }) {
  const { user } = useContext(AuthContext);
  const [isFavorited, setIsFavorited] = useState(false);


  async function addJobPost(postId){
    const requestBody = {id:user.id, postId};
    const API_URL="http://localhost:5005/api/user"
    try {
        const response = await axios.put(`${API_URL}/addJobPost`, requestBody);
        console.log(response.data)
        const API_URL2="http://localhost:5005/api/user"
        const responseSecond = await axios.get(`${API_URL2}/${user.id}`);
        let currentUser = responseSecond.data
  
        currentUser.favoriteJobPosts.forEach((e)=>{
          if(e._id===postId){setIsFavorited(true)}
        })
       } catch (error) {
         console.log(error);
       }
       return
  }


  return (
    <Card className="jobCard" sx={{ width: 500, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <Box>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="job post">{post.company.profilePic || `${post.company.name[0]}${post.company.name[1]}`}</Avatar>}
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
          <Typography align="start" noWrap variant="body2" color="text.secondary">
            {post.description.heading}
          </Typography>
        </CardContent>
      </Box>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          {!isFavorited && <IconButton onClick={()=>addJobPost(post._id)} aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>}
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
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
