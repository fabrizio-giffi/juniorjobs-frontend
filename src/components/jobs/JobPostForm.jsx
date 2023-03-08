import { Box, Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

const API_URL = "http://localhost:5005/api/posts";

const jobTypes = [
  { value: "full time", label: "full time" },
  { value: "part time", label: "part time" },
  { value: "freelance", label: "freelance" },
];

function JobPostForm({ jobPost, isEditing, setEditing }) {
  const [title, setTitle] = useState(jobPost?.title || "");
  const [jobtype, setJobtype] = useState(jobPost?.description.jobtype || "full time");
  const [heading, setHeading] = useState(jobPost?.description.heading || "");
  const [tasks, setTasks] = useState(jobPost?.description.tasks || "");
  const [requirements, setRequirements] = useState(jobPost?.description.requirements || "");
  const [benefits, setBenefits] = useState(jobPost?.description.benefits || "");
  const [email, setEmail] = useState(jobPost?.email || "");
  const [salaryMin, setSalaryMin] = useState(jobPost?.salaryRange.minimum || 0);
  const [salaryMax, setSalaryMax] = useState(jobPost?.salaryRange.maximum || 0);
  const [city, setCity] = useState(jobPost?.address.city || "");
  const [country, setCountry] = useState(jobPost?.address.country || "");
  const [stack, setStack] = useState(jobPost?.stack || []);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
      if (response.status === 201) navigate(`/jobs/${response.data.id}`);
    } catch (error) {
      console.log("There was an error creating the post", error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const editJobBody = {
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
      const response = await axios.put(`${API_URL}/${jobPost._id}`, editJobBody);
      console.log(response.data);
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
          fullWidth
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
          fullWidth
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
          fullWidth
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
          fullWidth
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
          fullWidth
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
          fullWidth
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
          fullWidth
        />
        <TextField
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          id="outlined-basic"
          label="Contact email"
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          type="number"
          value={salaryMin}
          onChange={(event) => setSalaryMin(event.target.value)}
          id="outlined-basic"
          label="Salary minimum"
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          type="number"
          value={salaryMax}
          onChange={(event) => setSalaryMax(event.target.value)}
          id="outlined-basic"
          label="Salary maximum"
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          id="outlined-basic"
          label="City"
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          type="text"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          id="outlined-basic"
          label="Country"
          variant="outlined"
          required
          fullWidth
        />
        <>
          {!isEditing && (
            <Button type="submit" variant="contained">
              Create new Post
            </Button>
          )}
          {isEditing && (
            <>
              {" "}
              <Button variant="outlined" type="button" onClick={handleEdit}>
                Submit changes
              </Button>
              <Button variant="outlined" type="button" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </>
          )}
        </>
      </Box>
    </>
  );
}

export default JobPostForm;
