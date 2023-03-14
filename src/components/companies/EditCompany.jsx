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

function EditCompany({
  isFetching,
  name,
  email,
  street,
  zipCode,
  city,
  country,
  setName,
  setEmail,
  setStreet,
  setZipCode,
  setCity,
  setCountry,
  setIsEditing,
  setIsEdited,
}) {
  const { user } = useContext(AuthContext);
  const [nameInput, setNameInput] = useState(name);
  const [emailInput, setEmailInput] = useState(email);
  const [streetInput, setStreetInput] = useState(street);
  const [zipCodeInput, setZipCodeInput] = useState(zipCode);
  const [cityInput, setCityInput] = useState(city);
  const [countryInput, setCountryInput] = useState(country);
  const [citiesList, setCitiesList] = useState([]);

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

  const handleEdit = async (event) => {
    event.preventDefault();
    const requestBody = {
      name: nameInput,
      email: emailInput,
      street: streetInput,
      zipCode: zipCodeInput,
      city: cityInput,
      country: countryInput,
    };
    setName(nameInput);
    setEmail(emailInput);
    setStreet(streetInput);
    setZipCode(zipCodeInput);
    setCity(cityInput);
    setCountry(countryInput);

    try {
      await axios.put(`${api_URL}/company/edit/${user.id}`, requestBody);
      setIsEdited(true);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
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
              id="company-name"
              label="Company Name"
              variant="outlined"
              type="text"
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
            />
            <TextField
              sx={{ mb: 2, bgcolor: "#fbfbfb" }}
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
            />
            <TextField
              sx={{ mb: 2, bgcolor: "#fbfbfb" }}
              fullWidth
              id="street"
              label="Street"
              variant="outlined"
              type="text"
              value={streetInput}
              onChange={(event) => setStreetInput(event.target.value)}
            />
            <TextField
              sx={{ mb: 2, bgcolor: "#fbfbfb" }}
              fullWidth
              id="zipcode"
              label="ZIP code"
              variant="outlined"
              type="text"
              value={zipCodeInput}
              onChange={(event) => setZipCodeInput(event.target.value)}
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

            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <Button variant="contained" sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }} type="submit">
                Commit Changes
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
                type="button"
                onClick={() => {
                  setNameInput(name);
                  setEmailInput(email);
                  setStreetInput(street);
                  setZipCodeInput(zipCode);
                  setCityInput(city);
                  setCountryInput(country);
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

export default EditCompany;
