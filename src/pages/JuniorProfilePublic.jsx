import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useParams } from "react-router-dom";
import { InlineWidget } from "react-calendly";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import "./JuniorProfilePublic.css";
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";

const api_URL = import.meta.env.VITE_API_URL;
const api_INDEX = import.meta.env.VITE_INDEX_URL;

function JuniorProfilePublic() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [catchingUserData, setCatchinUserData] = useState(true);
  const [formShow, setFormShow] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [contactInfo, setContactInfo] = useState(user?.email || "");
  const [messageSent, setMessageSent] = useState(false);
  const { id } = useParams();

  const getUserData = async () => {
    try {
      const response = await axios.get(`${api_URL}/user/publicprofile/${id}`);
      setUserData(response.data);
    } catch (error) {
      console.log("There was an error getting profileData.", error);
    }
  };

  const handleMessage = async (event) => {
    event.preventDefault();
    const nodemailer = { id, subject, message, contactInfo };
    const response = await axios.post(`${api_INDEX}/send-email`, nodemailer);
    setMessageSent(true);
    console.log(response.data);
  };

  useEffect(() => {
    getUserData();
    setCatchinUserData(false);
  }, []);

  if (catchingUserData) {
    return <div>Loading...</div>;
  }

  return (
    userData && (
      <Container>
        <div className="flexyContainer shadowBox">
          <div>
            <img src={userData.profilPic} />
          </div>
          <Typography variant="h2">
            {userData.firstName} {userData.lastName}
          </Typography>
          {userData.location && (
            <Typography variant="h6">
              {userData.location.country}, {userData.location.city}
            </Typography>
          )}
          <div>
            <List sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              {userData.skills.length > 0 &&
                userData.skills.map((skill) => {
                  return (
                    <ListItem key={skill} disablePadding sx={{ minWidth: "120px", maxWidth: "120px" }}>
                      <ListItemIcon>
                        <LabelRoundedIcon sx={{ mr: 1 }} />
                        <Typography variant="overline">{skill}</Typography>
                      </ListItemIcon>
                      <ListItemText />
                    </ListItem>
                  );
                })}
            </List>
          </div>
        </div>
        <div>
          {/* <Link to={'https://calendly.com/beiteldennis/job-interview'}>Calendly</Link> */}
          {userData.calendly !== "" ? (
            <InlineWidget url={typeof userData.calendly !== "undefined" && userData.calendly} />
          ) : (
            ""
          )}
          {messageSent ? (
            <Typography>An email has been sent to the user. Thanks for using Junior Jobs!</Typography>
          ) : !formShow ? (
            <Button onClick={() => setFormShow(true)}>Message</Button>
          ) : (
            <>
              <Box component="form" onSubmit={handleMessage}>
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
                <Button type="submit">Send message</Button>
                <Button type="submit" onClick={() => setFormShow(false)}>
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </div>
      </Container>
    )
  );
}

export default JuniorProfilePublic;
