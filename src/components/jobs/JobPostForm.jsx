import {
  Autocomplete,
  Box,
  Button,
  Container,
  createFilterOptions,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

import countries from "../../data/countries.json";
const api_URL = import.meta.env.VITE_API_URL;

// Filter for the cities select
const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option,
});

const jobTypes = [
  { value: "full time", label: "Full time" },
  { value: "part time", label: "Part time" },
  { value: "freelance", label: "Freelance" },
];

const fieldsList = ["Frontend", "Backend", "Full-stack", "UX/UI", "Cyber security", "Data analytics"];

function JobPostForm({ jobPost, isEditing, setEditing, setIsFetching }) {
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
  const [field, setField] = useState(jobPost?.field || "Frontend");
  const [stack, setStack] = useState(jobPost?.stack || []);
  const [cityInput, setCityInput] = useState(city);
  const [countryInput, setCountryInput] = useState(country);
  const [citiesList, setCitiesList] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getCities = async () => {
    try {
      if (typeof countryInput === "undefined") {
        return;
      }
      const response = await axios.post("https://countriesnow.space/api/v0.1/countries/cities", {
        country: countryInput,
      });
      setCitiesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      address: { city: cityInput, country: countryInput },
      company: user.id,
      field,
      stack,
    };

    try {
      const response = await axios.post(`${api_URL}/posts`, newJobBody);
      if (response.status === 201) navigate(`/jobs/${response.data.id}`);
    } catch (error) {
      console.log("There was an error creating the post", error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    setIsFetching(true);
    const editJobBody = {
      title,
      description: { jobtype, heading, tasks, requirements, benefits },
      email,
      salaryRange: {
        minimum: salaryMin,
        maximum: salaryMax,
      },
      address: { city: cityInput, country: countryInput },
      company: user.id,
      field,
      stack,
    };

    try {
      await axios.put(`${api_URL}/posts/${jobPost._id}`, editJobBody);
      setEditing(false);
    } catch (error) {
      console.log("There was an error creating the post", error);
    }
  };

  useEffect(() => {
    setCityInput("");
    getCities();
  }, [countryInput]);

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ m: 3 }}>
        <Typography variant="h4" gutterBottom>
          {!isEditing ? "Create a new job post" : "Edit your job post"}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          * All fields are required
        </Typography>
      </Box>
      <Box
        style={{ display: "flex", gap: "1rem", flexDirection: "column", alignItems: "center", marginBottom: "35px" }}
        component="form"
        autoComplete="off"
      >
        <TextField
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          id="title"
          label="Title"
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          type="text"
          onChange={(event) => setJobtype(event.target.value)}
          id="jobtype"
          select
          label="Job type"
          value={jobtype || jobTypes[0].value}
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
          id="field"
          select
          label="Field"
          value={field || fieldsList[0]}
          onChange={(event) => setField(event.target.value)}
          variant="outlined"
          required
          fullWidth
        >
          {fieldsList.map((field) => (
            <MenuItem key={field} value={field}>
              {field}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          type="text"
          value={stack}
          onChange={(event) => setStack(event.target.value)}
          id="stack"
          label="Stacks"
          variant="outlined"
          helperText="Separate inputs with a comma (e.g. React, Angular)"
          required
          fullWidth
        />
        <TextField
          type="text"
          multiline
          rows={2}
          value={heading}
          onChange={(event) => setHeading(event.target.value)}
          id="heading"
          label="Job description"
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          type="text"
          multiline
          rows={2}
          value={tasks}
          onChange={(event) => setTasks(event.target.value)}
          id="tasks"
          label="Tasks"
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          type="text"
          multiline
          rows={2}
          value={requirements}
          onChange={(event) => setRequirements(event.target.value)}
          id="requirements"
          label="Requirements"
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          type="text"
          multiline
          rows={2}
          value={benefits}
          onChange={(event) => setBenefits(event.target.value)}
          id="benefits"
          label="Benefits"
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          id="email"
          label="Contact email"
          variant="outlined"
          required
          fullWidth
        />
        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <TextField
            type="number"
            value={salaryMin}
            onChange={(event) => setSalaryMin(event.target.value)}
            id="salary-min"
            label="Salary minimum"
            variant="outlined"
            required
            fullWidth
          />
          <TextField
            type="number"
            value={salaryMax}
            onChange={(event) => setSalaryMax(event.target.value)}
            id="salary-max"
            label="Salary maximum"
            variant="outlined"
            required
            fullWidth
          />
        </Stack>

        <Autocomplete
          fullWidth
          id="country-select"
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.name}
          onChange={(event) => setCountryInput(event.target.innerText)}
          renderOption={(props, option) => (
            <Box component="li" key={option.iso3} sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
              <img loading="lazy" width="20" src={option.flag} alt={option.name} />
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Country"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
        <Autocomplete
          fullWidth
          id="city-select"
          freeSolo
          value={cityInput}
          options={citiesList}
          placeholder={city}
          filterOptions={filterOptions}
          onChange={(event) => setCityInput(event.target.innerText)}
          renderInput={(params) => <TextField {...params} label="City" />}
        />
        <>
          {!isEditing && (
            <Button sx={{ bgcolor: "#6b9080" }} type="submit" variant="contained" onClick={handleSubmit}>
              Submit Post
            </Button>
          )}
          {isEditing && (
            <>
              <Stack sx={{ mt: 3, display: "flex", width: "100%", gap: 5 }} spacing={2} direction="row">
                <Button fullWidth variant="contained" sx={{ bgcolor: "#6b9080" }} onClick={handleEdit}>
                  Submit changes
                </Button>
                <Button fullWidth variant="contained" sx={{ bgcolor: "#6b9080" }} onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </Stack>
            </>
          )}
        </>
      </Box>
    </Container>
  );
}

export default JobPostForm;
