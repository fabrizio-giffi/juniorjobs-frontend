import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PaidIcon from "@mui/icons-material/Paid";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Stack } from "@mui/system";

function JobPostCard({ post }) {
  return (
    post && (
      <Card
        sx={{
          width: 500,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "15px",
        }}
      >
        <Box>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="job post">
                {post.name}
              </Avatar>
            }
            title={post.title}
            subheader={post.name}
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
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Box>
          <Link to={`/jobs/${post._id}`}>
            <Button    variant="contained"
            sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }} type="button">
              See details
            </Button>
          </Link>
        </CardActions>
      </Card>
    )
  );
}

export default JobPostCard;
