import * as React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import { Alert, Box, Button, CardContent, Container, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const api_INDEX = import.meta.env.VITE_INDEX_URL;

export default function Landing() {
  const { user } = useContext(AuthContext);
  const [messageSent, setMessageSent] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const handleMessage = async (event) => {
    event.preventDefault();
    const nodemailer = { subject, message, contactInfo };
    const response = await axios.post(`${api_INDEX}/send-email`, nodemailer);
    setMessageSent(true);
    console.log(response.data);
  };

  return (
    <>
      <Box sx={{ maxWidth: "100vw", display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ margin: "auto", width: "50%", boxSizing: "border-box", pl: 8 }}>
          <Typography component="h1" variant="h2" align="" color="text.primary" paragraph>
            Junior developers
          </Typography>
          <Typography
            variant="h4"
            sx={{ mb: 4 }}
            alignContent={{ md: "start", xs: "center" }}
            color="text.secondary"
            paragraph
          >
            Kickstart your career in the tech field.
          </Typography>
          <Link to={user?.role !== "company" ? "/jobs" : "/junior"}>
            <Button variant="contained" sx={{ bgcolor: "#6b9080" }} size="large">
              Try it out
            </Button>
          </Link>
        </Box>
        <Box sx={{ width: "50%", zIndex: "-1" }}>
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
            Companies
          </Typography>
          <Typography variant="h4" sx={{ mb: 4, textAlign: "end" }} color="text.secondary" paragraph>
            Fill your vacancies with skilled professionals.
          </Typography>
          <Link to={user?.role === "company" ? "/junior" : "/jobs"}>
            <Button variant="contained" sx={{ bgcolor: "#6b9080" }} size="large">
              Try it out
            </Button>
          </Link>
        </Box>
      </Box>
      <Box
        className="column-break"
        component="section"
        sx={{ bgcolor: "#EAF4F4", display: "flex", justifyContent: "space-evenly", py: 9 }}
      >
        <Box
          className="media-expand"
          sx={{ width: "30%", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center" }}>
            <HowToRegIcon sx={{ color: "#6b9080" }} />
            <Typography textAlign="center" variant="h5">
              Find your first job
            </Typography>
          </Stack>
          <CardContent>
            <Typography textAlign="justify">
              Are you a junior developer looking to kickstart your career in the tech industry?
              Our job board connects you with the best entry-level developer positions in the market. Our website
              features a comprehensive list of job openings for junior developers across a wide range of industries. We
              work with top employers to ensure that our job board features only the most relevant and competitive
              positions. Sign up today and start exploring the many job opportunities available to junior developers.
            </Typography>
          </CardContent>
        </Box>

        <Box
          className="media-expand"
          sx={{ width: "30%", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center" }}>
            <BusinessIcon sx={{ color: "#6b9080" }} />
            <Typography textAlign="center" variant="h5">
              Hire a junior
            </Typography>
          </Stack>
          <CardContent>
            <Typography textAlign="justify">
              Are you looking to fill a junior developer position in your company?
              We have a vast network of junior developers who are eager to start their careers and bring fresh
              perspectives to your team. Our website features a comprehensive list of candidates with the skills and
              qualifications you need to take your business to the next level. We understand the importance of hiring
              the right people, which is why our team is dedicated to providing you with the best possible support
              throughout the recruitment process.
            </Typography>
          </CardContent>
        </Box>
      </Box>
      <Container className="column-break" sx={{ display: "flex", alignItems: "start", py: 9 }}>
        <Box
          sx={{
            minWidth: "50%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: 4,
          }}
        >
          <TextSnippetIcon sx={{ color: "#6b9080", width: 50, height: 50 }} />
          <CardContent>
            <Typography variant="h5" className="prompt" textAlign="center">
              <Link to="/signup"> Sign up</Link> today and join our professional network.
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ minWidth: "50%", px: 4 }}>
          <Typography variant="h6" paragraph textAlign="center">
            Get in touch with us for more informations
          </Typography>
          {messageSent ? (
            <Alert severity="success">Thanks for contacting us, we'll get back to you as soon as possible!</Alert>
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
                <Stack direction="row" sx={{ display: "flex", justifyContent: "center" }}>
                  <Button variant="contained" sx={{ bgcolor: "#6b9080" }} type="submit">Send message</Button>
                </Stack>
              </Stack>
            </>
          )}
        </Box>
      </Container>
    </>
  );
}
