import { Box, Button, MenuItem, TextField } from "@mui/material";

function CompanyFilter({ setCompanyQuery, companyQuery, companyFilter }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
      <Button variant="contained" sx={{ bgcolor: "#6b9080" }} onClick={() => setCompanyQuery("")}>
        X
      </Button>
    </Box>
  );
}

export default CompanyFilter;
