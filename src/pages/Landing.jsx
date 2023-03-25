import * as React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import { Box, Button, Typography } from "@mui/material";

export default function Landing() {
  return (
    <>
      <Box sx={{ maxWidth: "100vw", display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ margin: "auto", width: "50%", boxSizing: "border-box", pl: 8 }}>
          <Typography component="h1" variant="h2" align="" color="text.primary" gutterBottom>
            Junior Jobs
          </Typography>
          <Typography variant="h5" alignContent={{ md: "start", xs: "center" }} color="text.secondary" paragraph>
            The platform that connects employees and employers for junior level positions.
          </Typography>
          <Link to="/jobs">
            <Button variant="contained" fullWidth sx={{ bgcolor: "#6b9080", width: "50%" }} size="large">
              Try It Out
            </Button>
          </Link>
        </Box>
        <Box sx={{ width: "50%" }}>
          <img id="interview" src="landing.jpg" alt="interview" />
        </Box>
      </Box>
      <Box sx={{ maxWidth: "100vw", display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "50%" }}>
          <img id="company" src="company.jpg" alt="company" />
        </Box>
        <Box
          sx={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            width: "50%",
            boxSizing: "border-box",
            pr: 8,
          }}
        >
          <Typography component="h1" variant="h2" align="" color="text.primary" gutterBottom>
            Junior Jobs
          </Typography>
          <Typography variant="h5" alignContent={{ md: "start", xs: "center" }} color="text.secondary" paragraph>
            The platform that connects employees and employers for junior level positions.
          </Typography>
          <Link to="/jobs">
            <Button variant="contained" fullWidth sx={{ bgcolor: "#6b9080", width: "50%" }} size="large">
              Try It Out
            </Button>
          </Link>
        </Box>
      </Box>
      <Box component="section" sx={{ height: "300px", bgcolor: "#EAF4F4" }}>
        <Box>First card</Box>
        <Box>Second card</Box>
        <Box>Third card</Box>
      </Box>
    </>
  );
}
