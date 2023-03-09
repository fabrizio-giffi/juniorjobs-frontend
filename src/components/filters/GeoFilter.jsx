import { Box, IconButton, MenuItem, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function GeoFilter({ setGeoQuery, geoQuery, countryFilter }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
      <TextField
        sx={{ minWidth: "200px", maxWidth: "md" }}
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
      <IconButton size="small" aria-label="remove filters" onClick={() => setGeoQuery("")}>
        <ClearIcon fontSize="inherit"/>
      </IconButton>
    </Box>
  );
}

export default GeoFilter;
