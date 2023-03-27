import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { InlineWidget } from "react-calendly";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  List,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Container, style } from "@mui/system";

const api_INDEX = import.meta.env.VITE_INDEX_URL;

function JuniorCard({ focus }) {
  const { user } = useContext(AuthContext);
  const [formShow, setFormShow] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [contactInfo, setContactInfo] = useState(user?.email || "");
  const [messageSent, setMessageSent] = useState(false);
  const [calendly, setCalendly] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setFormShow(false);
    setSubject("");
    setMessage("");
  }, [focus]);

  const handleMessage = async (event) => {
    event.preventDefault();
    const nodemailer = {
      id: focus._id,
      subject,
      message,
      contactInfo,
      role: user.role,
    };
    const response = await axios.post(`${api_INDEX}/send-email`, nodemailer);
    setMessageSent(true);
    console.log(response.data);
  };

  return typeof focus === "undefined" ? (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="h6"></Typography>
    </Box>
  ) : (
    <Card sx={{ width: "100%", bgcolor: "#fbfbfb", p: 4, m: 4 }}>
      <Link to={`/junior/${focus._id}`}>
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
      </Link>
      <List sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {focus.skills.length > 0 &&
          focus.skills.map((skill) => {
            return (
              <Chip
                key={skill}
                label={skill}
                sx={{
                  bgcolor: "#EAF4F4",
                  color: "slategray",
                  textTransform: "none",
                }}
                variant="contained"
                onClick={() => handleClick(skill)}
              />
            );
          })}
      </List>
      <div>
        {focus.calendly ? <Button onClick={handleOpen}>Calendly</Button> : ""}
        <Modal
          sx={{
            maxWidth: "75%",
            display: "flex",
            alignItems: "center",
            margin: "auto",
          }}
          aria-labelledby="edit-info-form"
          aria-describedby="edit-info-form"
          open={open}
          onClose={() => setCalendly(false)}
        >
          <Container sx={{ bgcolor: "#eaf4f4", padding: 2, width: "100%" }}>
            <InlineWidget url={focus.calendly} />
            <Button
              variant="contained"
              sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
              type="button"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Container>
        </Modal>
        {messageSent ? (
          <Typography>
            An email has been sent to the user. Thanks for using Junior Jobs!
          </Typography>
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
              <Stack
                direction="row"
                sx={{ display: "flex", justifyContent: "center" }}
              >
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
