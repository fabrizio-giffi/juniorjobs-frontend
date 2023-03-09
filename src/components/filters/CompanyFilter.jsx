import { Box, IconButton, MenuItem, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function CompanyFilter({ setCompanyQuery, companyQuery, companyFilter }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
      <TextField
        sx={{ width: "200px" }}
        type="text"
        onChange={(event) => setCompanyQuery(event.target.value)}
        id="outlined-basic"
        label="Company"
        value={companyQuery}
        variant="outlined"
        select
      >
        {companyFilter.map((company) => (
          <MenuItem key={company} value={company}>
            {company}
          </MenuItem>
        ))}
      </TextField>
      <IconButton size="small" aria-label="remove filters" onClick={() => setCompanyQuery("")}>
        <ClearIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}

export default CompanyFilter;
