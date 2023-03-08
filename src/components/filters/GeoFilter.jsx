import { Box, Button, MenuItem, TextField } from "@mui/material";

function GeoFilter({ setGeoQuery, geoQuery, countryFilter }) {
  return (
    <Box>
      <TextField
        style={{ minWidth: "120px", width:"700px" }}
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
      <Button sx={{bgcolor: "#6b9080", padding:"15px 20px", margin:"0 20px", textDecoration:"none", color:"inherit"}} onClick={() => setGeoQuery("")}>Remove filter</Button>
    </Box>
  );
}

export default GeoFilter;
