import { Box, Chip, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import AddIcon from "@mui/icons-material/Add";

const api_URL = import.meta.env.VITE_API_URL;

function SkillsProfile({ isEdited }) {
  const { user } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [field, setField] = useState("");
  const [newSkill, setNewSkill] = useState();

  const getSkills = async () => {
    try {
      const response = await axios.get(`${api_URL}/user/${user.id}`);
      setSkills(response.data.skills);
      setField(response.data.field);
    } catch (error) {
      console.log(error);
    }
  };

  async function addSkill(event) {
    event.preventDefault();
    const requestBody = {
      id: user.id,
      newSkill,
    };
    try {
      await axios.put(`${api_URL}/user/addNewSkill`, requestBody);
      getSkills();
      setNewSkill("");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteSkill(skill) {
    const requestBody = { id: user.id, skill };
    try {
      await axios.put(`${api_URL}/user/privateprofile/deleteSkill`, requestBody);
      getSkills();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSkills();
  }, []);

  useEffect(() => {
    getSkills();
  }, [isEdited]);

  return (
    <Box
      className="notop"
      sx={{
        bgcolor: "#eaf4f4",
        minWidth: "50%",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        p: 3,
      }}
    >
      <Typography variant="h6">Junior {field} developer</Typography>
      <Divider sx={{ my: 2 }} flexItem />
      <Box sx={{ display: "flex", height: "100%", flexDirection: "column", justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ mb: 2 }} variant="h6">
            Your skills
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {skills.length > 0 &&
              skills.map((skill) => {
                return <Chip key={skill} label={skill} onDelete={() => deleteSkill(skill)} />;
              })}
          </Box>
        </Box>
        <Stack>
          <TextField
            sx={{ bgcolor: "#fbfbfb" }}
            placeholder="e.g. Machine learning"
            value={newSkill}
            label="Add a new skill"
            onChange={(event) => setNewSkill(event.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton position="end" onClick={addSkill}>
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default SkillsProfile;
