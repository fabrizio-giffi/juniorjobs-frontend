import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { InlineWidget } from "react-calendly";
import { Avatar, Box, Button, Card, Chip, List, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const api_INDEX = import.meta.env.VITE_INDEX_URL;

function JuniorCard({ focus }) {
  const { user } = useContext(AuthContext);
  const [formShow, setFormShow] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [contactInfo, setContactInfo] = useState(user?.email || "");
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    setFormShow(false);
    setSubject("");
    setMessage("");
  }, [focus]);

  const handleMessage = async (event) => {
    event.preventDefault();
    const nodemailer = { id: focus._id, subject, message, contactInfo, role: user.role };
    const response = await axios.post(`${api_INDEX}/send-email`, nodemailer);
    setMessageSent(true);
    console.log(response.data);
  };

  return typeof focus === "undefined" ? (
    <Box sx={{display:"flex", alignItems: "center" }}>
      <Typography variant="h6"></Typography>
    </Box>
  ) : (
    <Card sx={{ width: "100%", bgcolor: "#fbfbfb", p: 4, m: 4 }}>
      <Avatar sx={{ width: 128, height: 128 }} src={focus.profilePic} />
      <Typography variant="h4">
        {focus.firstName} {focus.lastName}
      </Typography>
      {focus.location && (
        <Typography variant="h6">
          {focus.location.country}, {focus.location.city}
        </Typography>
      )}
      <Typography variant="body1">{focus.field} junior developer</Typography>
      <List sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {focus.skills.length > 0 &&
          focus.skills.map((skill) => {
            return (
              <Chip
                key={skill}
                label={skill}
                sx={{ bgcolor: "#EAF4F4", color: "slategray", textTransform: "none" }}
                variant="contained"
                onClick={() => handleClick(skill)}
              />
            );
          })}
      </List>
      <div>
        <Link to={"https://calendly.com/beiteldennis/job-interview"}>Calendly</Link>
        {typeof focus.calendly !== "undefined" ? (
          <InlineWidget url={typeof focus.calendly !== "undefined" && focus.calendly} />
        ) : (
          ""
        )}
        {messageSent ? (
          <Typography>An email has been sent to the user. Thanks for using Junior Jobs!</Typography>
        ) : !formShow ? (
          <Button onClick={() => setFormShow(true)}>Message</Button>
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
                maxRows={4}
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
                <Button type="submit">Send message</Button>
                <Button type="submit" onClick={() => setFormShow(false)}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </>
        )}
      </div>
    </Card>
  );
}

export default JuniorCard;
