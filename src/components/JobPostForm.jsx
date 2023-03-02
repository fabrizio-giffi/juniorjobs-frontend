import { Box, Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005/api/posts";

const jobTypes = [
  { value: "full time", label: "full time" },
  { value: "part time", label: "part time" },
  { value: "freelance", label: "freelance" },
];

function JobPostForm() {
  const [title, setTitle] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [heading, setHeading] = useState("");
  const [tasks, setTasks] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");
  const [email, setEmail] = useState("");
  const [salaryMin, setSalaryMin] = useState(0);
  const [salaryMax, setSalaryMax] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [stack, setStack] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  //   const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newJobBody = {
      title,
      description: { jobtype, heading, tasks, requirements, benefits },
      email,
      salaryRange: {
        minimum: salaryMin,
        maximum: salaryMax,
      },
      address: { city, country },
      company: user.id,
      stack,
    };

    try {
      const response = await axios.post(API_URL, newJobBody);
      // Navigate to the new Post details when available
      if (response.status === 201) navigate("/");
    } catch (error) {
      console.log("There was an error creating the post", error);
    }
  };

  return (
    <>
      <div>JobPostForm</div>
      <Box
        style={{ display: "flex", gap: "1rem", flexDirection: "column", alignItems: "center" }}
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <TextField
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          id="outlined-basic"
          label="Title"
          variant="outlined"
          required
        />
        <TextField
          type="text"
          onChange={(event) => setJobtype(event.target.value)}
          id="outlined-basic"
          select
          label="Job type"
          defaultValue={jobTypes[0].value}
          variant="outlined"
          required
        >
          {jobTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          type="text"
          value={stack}
          onChange={(event) => setStack(event.target.value)}
          id="outlined-basic"
          label="Stack"
          variant="outlined"
          required
        />
        <TextField
          type="text"
          multiline
          rows={4}
          value={heading}
          onChange={(event) => setHeading(event.target.value)}
          id="outlined-basic"
          label="Job description"
          variant="outlined"
          required
        />
        <TextField
          type="text"
          multiline
          rows={3}
          value={tasks}
          onChange={(event) => setTasks(event.target.value)}
          id="outlined-basic"
          label="Tasks"
          variant="outlined"
          required
        />
        <TextField
          type="text"
          multiline
          rows={3}
          value={requirements}
          onChange={(event) => setRequirements(event.target.value)}
          id="outlined-basic"
          label="Requirements"
          variant="outlined"
          required
        />
        <TextField
          type="text"
          multiline
          rows={3}
          value={benefits}
          onChange={(event) => setBenefits(event.target.value)}
          id="outlined-basic"
          label="Benefits"
          variant="outlined"
          required
        />
        <TextField
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          id="outlined-basic"
          label="Contact email"
          variant="outlined"
          required
        />
        <TextField
          type="number"
          value={salaryMin}
          onChange={(event) => setSalaryMin(event.target.value)}
          id="outlined-basic"
          label="Salary minimum"
          variant="outlined"
          required
        />
        <TextField
          type="number"
          value={salaryMax}
          onChange={(event) => setSalaryMax(event.target.value)}
          id="outlined-basic"
          label="Salary maximum"
          variant="outlined"
          required
        />
        <TextField
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          id="outlined-basic"
          label="City"
          variant="outlined"
          required
        />
        <TextField
          type="text"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          id="outlined-basic"
          label="Country"
          variant="outlined"
          required
        />
        <Button type="submit" variant="contained">
          Create new Post
        </Button>
      </Box>
    </>
  );
}

export default JobPostForm;
