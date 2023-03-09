import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="flexcontainer">
      <div className="collumn headline-box">
        <Typography component="h1" variant="h2" align="" color="text.primary" gutterBottom>
          Junior Jobs
        </Typography>
        <Typography variant="h5" alignContent={{ md: "start", xs: "center" }} color="text.secondary" paragraph>
          The platform that connects employees and employers for junior level positions.
        </Typography>
        <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent={{ md: "start", xs: "center" }}>
          <div style={{ width: "60%" }}>
            <Link to="/jobs">
              <Button variant="contained" fullWidth sx={{ bgcolor: "#6b9080" }} size="large">
                Try It Out
              </Button>
            </Link>
          </div>
        </Stack>
      </div>
      <div className="collumn">
        <div className="triangle"></div>
        <div className="background-image displaynone">
          <img src="landing.jpg" alt="Resume" />
        </div>
      </div>
    </div>
  );
}
