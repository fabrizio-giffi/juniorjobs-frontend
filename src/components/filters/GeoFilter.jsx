import { Box, Button, MenuItem, TextField } from "@mui/material";

function GeoFilter({ setGeoQuery, geoQuery, countryFilter }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <TextField
        sx={{ width: "200px" }}
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
      <Button variant="contained" sx={{ bgcolor: "#6b9080" }} onClick={() => setGeoQuery("")}>
        X
      </Button>
    </Box>
  );
}

export default GeoFilter;
