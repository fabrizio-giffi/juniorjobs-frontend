import { Box, IconButton, MenuItem, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function CompanyFilter({ setCompanyQuery, companyQuery, companyFilter }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
      <TextField
        sx={{ width: "370px" }}
        type="text"
        onChange={(event) => setCompanyQuery(event.target.value)}
        id="company-filter"
        label="Company"
        value={companyQuery}
        variant="outlined"
        select
        InputProps={{
          endAdornment: (
            <IconButton
              position="end"
              sx={{ mr: 2, display: companyQuery === "" ? "none" : "flex", alignItems: "center" }}
              size="small"
              aria-label="remove filters"
              onClick={() => setCompanyQuery("")}
            >
              <ClearIcon fontSize="inherit" />
            </IconButton>
          ),
        }}
      >
        {companyFilter.map((company) => (
          <MenuItem key={company} value={company}>
            {company}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default CompanyFilter;
