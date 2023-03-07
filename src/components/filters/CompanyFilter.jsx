import { Box, Button, MenuItem, TextField } from "@mui/material";

function CompanyFilter({ setCompanyQuery, companyQuery, companyFilter }) {
  return (
    <Box>
      <TextField
        style={{ minWidth: "120px" }}
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
      <Button onClick={() => setCompanyQuery("")}>Remove filter</Button>
    </Box>
  );
}

export default CompanyFilter;
