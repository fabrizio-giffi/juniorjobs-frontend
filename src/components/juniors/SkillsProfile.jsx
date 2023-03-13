import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";

const api_URL = import.meta.env.VITE_API_URL;

function SkillsProfile({ deleteSkill }) {
  const { user } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState();

  const getSkills = async () => {
    try {
      const response = await axios.get(`${api_URL}/user/${user.id}`);
      setSkills(response.data.skills);
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

  return (
    <Box sx={{ bgcolor: "#eaf4f4", flexGrow: 1, minWidth: "50%" }}>
      <Typography variant="h6">Your skills:</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {skills.length > 0 &&
          skills.map((skill) => {
            return <Chip key={skill} label={skill} onDelete={() => deleteSkill(skill)} />;
          })}
      </Box>
      <Stack>
        <Typography variant="h6">Add a new skill:</Typography>
        <TextField
          sx={{ bgcolor: "white" }}
          type="text"
          placeholder="e.g. Machine learning"
          value={newSkill}
          onChange={(event) => setNewSkill(event.target.value)}
          autoFocus
        />
        <Button onClick={addSkill} variant="contained" sx={{ bgcolor: "#6b9080", mt: 2 }} type="submit">
          Add Skill
        </Button>
      </Stack>
    </Box>
  );
}

export default SkillsProfile;
