import React from "react";
import "./Footer.css";
import { Box, Container } from "@mui/system";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <div
      className="footer"
    >
      <Container>
        <Grid padding="25px" marginTop={"20px"}>
          <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
            <Typography align="center" variant="overline">
              Made with <FavoriteIcon fontSize="small" sx={{ color: "red" }} />{" "}
              by{" "}
              <Link to={"https://www.linkedin.com/in/fabriziogiffi/"}>
                Fabrizio
              </Link>
              ,{" "}
              <Link
                to={"https://www.linkedin.com/in/dean-stavenuiter-38a216248/"}
              >
                Dean
              </Link>{" "}
              and{" "}
              <Link to={"https://www.linkedin.com/in/dennis-beitel-75b207176/"}>
                Dennis
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
            <Typography align="center" variant="overline">
              GitHub Repos Frontend:{" "}
              <Link
                to={"https://github.com/fabrizio-giffi/juniorjobs-frontend"}
              >
                <GitHubIcon fontSize="small" />
              </Link>{" "}
              Backend:{" "}
              <Link to={"https://github.com/fabrizio-giffi/juniorjobs-backend"}>
                <GitHubIcon fontSize="small" />
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
