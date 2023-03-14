import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  createFilterOptions,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import countries from "../../data/countries.json";

const api_URL = import.meta.env.VITE_API_URL;

// Filter for the cities select
const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option,
});

function EditJunior({
  firstName,
  lastName,
  country,
  city,
  calendly,
  setFirstName,
  setLastName,
  setCountry,
  setCity,
  setCalendly,
  setIsEdited,
  setIsEditing,
  isFetching,
}) {
  const { user } = useContext(AuthContext);
  const [firstNameInput, setFirstNameInput] = useState(firstName);
  const [lastNameInput, setLastNameInput] = useState(lastName);
  const [countryInput, setCountryInput] = useState(country);
  const [cityInput, setCityInput] = useState(city);
  const [calendlyInput, setCalendlyInput] = useState(calendly);
  const [citiesList, setCitiesList] = useState([]);

  const handleEdit = async (event) => {
    event.preventDefault();
    const requestBody = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      country: countryInput,
      city: cityInput,
      calendly: calendlyInput,
    };
    setFirstName(firstNameInput);
    setLastName(lastNameInput);
    setCountry(countryInput);
    setCity(cityInput);
    setCalendly(calendlyInput);

    try {
      await axios.put(`${api_URL}/user/edit/${user.id}`, requestBody);
      setIsEdited(true);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCities = async () => {
    if (!isFetching) {
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
    }
  };

  useEffect(() => {
    setCityInput("");
    getCities();
  }, [countryInput]);

  return (
    <Modal
      sx={{ maxWidth: "sm", display: "flex", alignItems: "center", margin: "auto" }}
      aria-labelledby="edit-info-form"
      aria-describedby="edit-info-form"
      open={open}
      onClose={() => setIsEditing(false)}
    >
      <Container>
        <Card sx={{ bgcolor: "#eaf4f4", padding: 3 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Update profile
          </Typography>
          <Box component="form" onSubmit={handleEdit}>
            <TextField
              sx={{ mb: 2, bgcolor: "#fbfbfb" }}
              fullWidth
              id="first-name"
              label="First Name"
              variant="outlined"
              type="text"
              value={firstNameInput}
              onChange={(event) => setFirstNameInput(event.target.value)}
            />
            <TextField
              sx={{ mb: 2, bgcolor: "#fbfbfb" }}
              fullWidth
              id="last-name"
              label="Last Name"
              variant="outlined"
              type="text"
              value={lastNameInput}
              onChange={(event) => setLastNameInput(event.target.value)}
            />
            <Autocomplete
              sx={{ mb: 2, bgcolor: "#fbfbfb" }}
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
              sx={{ mb: 2, bgcolor: "#fbfbfb" }}
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
            <TextField
              fullWidth
              id="calendly"
              label="Calendly link"
              variant="outlined"
              sx={{ bgcolor: "#fbfbfb" }}
              value={calendlyInput}
              onChange={(event) => setCalendlyInput(event.target.value)}
            />
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <Button variant="contained" sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }} type="submit">
                Commit Changes
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
                type="button"
                onClick={() => {
                  setFirstNameInput(firstName);
                  setLastNameInput(lastName);
                  setCityInput(city);
                  setCountryInput(country);
                  setCalendlyInput(calendly);
                  setIsEdited(false);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>
    </Modal>
  );
}

export default EditJunior;
