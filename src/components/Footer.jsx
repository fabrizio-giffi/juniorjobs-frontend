import React from "react";
import "./Footer.css";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <div className="footer">
      <Container>
        <Grid padding="25px" marginTop={"20px"}>
          <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
            <div className="footer-text">
              <span> Made With </span>
              <FavoriteIcon fontSize="small" sx={{ color: "red" }} />
              <span> by </span>
              <Link target={"_blank"} to={"https://www.linkedin.com/in/fabriziogiffi/"}>
                <span>Fabrizio, </span>
              </Link>
              <Link target={"_blank"}
                to={"https://www.linkedin.com/in/dean-stavenuiter-38a216248/"}
              >
                <span>Dean </span>
              </Link>
              <span>and </span>
              <Link target={"_blank"} to={"https://www.linkedin.com/in/dennis-beitel-75b207176/"}>
                <span>Dennis </span>
              </Link>
            </div>
            <div className="github-repos">
              <span>GitHub Repos: </span>
              <Link target={"_blank"}
                to={"https://github.com/fabrizio-giffi/juniorjobs-frontend"}
              >
                <span>
                  Frontend: <GitHubIcon fontSize="small" />
                </span>
              </Link>
              <span style={{marginLeft: "5px"}}>
                <Link target={"_blank"}
                  to={"https://github.com/fabrizio-giffi/juniorjobs-backend"}
                >
                  Backend: <GitHubIcon fontSize="small" />
                </Link>
              </span>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
