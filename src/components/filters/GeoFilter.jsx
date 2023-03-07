import { Box, Button, MenuItem, TextField } from "@mui/material";

function GeoFilter({ setGeoQuery, geoQuery, countryFilter }) {
  return (
    <Box>
      <TextField
        style={{ minWidth: "120px" }}
        type="text"
        onChange={(event) => setGeoQuery(event.target.value)}
        id="outlined-basic"
        label="Country"
        value={geoQuery}
        variant="outlined"
        select
      >
        {countryFilter.map((country) => (
          <MenuItem key={country} value={country}>
            {country}
          </MenuItem>
        ))}
      </TextField>
      <Button onClick={() => setGeoQuery("")}>Remove filter</Button>
    </Box>
  );
}

export default GeoFilter;
