import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { InlineWidget } from "react-calendly";
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import './JuniorProfilePublic.css'
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";


function JuniorProfilePublic() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [catchingUserData, setCatchinUserData] = useState(true);
  const { id } = useParams();

  const api_URL = import.meta.env.VITE_API_URL;

  const getUserData = async () => {
    try {
      const response = await axios.get(`${api_URL}/user/publicprofile/${id}`);
      setUserData(response.data);
    } catch (error) {
      console.log("There was an error getting profileData.", error);
    }
  };

  useEffect(() => {
    getUserData();
    setCatchinUserData(false);
  }, []);

  if (catchingUserData) {
    return <div>Loading...</div>;
  }

  console.log(userData)

  return (
    userData && (
      <div>
      <div className="flexyContainer shadowBox">
        <div>
          <imag src={userData.profilPic} />
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
        <List sx={{ display: "flex", flexDirection:"row", flexWrap:"wrap"}}>

          {userData.skills.length > 0 &&
            userData.skills.map((skill) => {
              return (<ListItem key={skill} disablePadding sx={{minWidth:"120px", maxWidth:"120px"}}>
                <ListItemIcon>
                  <LabelRoundedIcon sx={{ mr: 1 }} />
                  <Typography variant="overline">
                    {skill}
                  </Typography>
                </ListItemIcon>
                <ListItemText />
              </ListItem>)
            })}
            </List>

        </div>


      </div>
        <div>
          {/* <Link to={'https://calendly.com/beiteldennis/job-interview'}>Calendly</Link> */}
          {userData.calendly !== "" ? <InlineWidget url={typeof userData.calendly !== "undefined" && userData.calendly} /> : ""}
        </div>
      </div>
    )
  );
}

export default JuniorProfilePublic;
