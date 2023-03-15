import { Box, IconButton, MenuItem, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const fieldFilter = ["Frontend", "Backend", "Full-stack", "UX/UI", "Cyber security", "Data analytics"];

function FieldFilter({ setFieldQuery, fieldQuery }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
      <TextField
        sx={{ minWidth: "370px", maxWidth: "md" }}
        type="text"
        value={fieldQuery}
        onChange={(event) => setFieldQuery(event.target.value)}
        id="field-filter"
        label="Fields"
        variant="outlined"
        select
        InputProps={{
          endAdornment: (
            <IconButton
              position="end"
              sx={{ mr: 2, display: fieldQuery === "" ? "none" : "flex", alignItems: "center" }}
              size="small"
              aria-label="remove filters"
              onClick={() => setFieldQuery("")}
            >
              <ClearIcon fontSize="inherit" />
            </IconButton>
          ),
        }}
      >
        {fieldFilter.map((field) => (
          <MenuItem key={field} value={field}>
            {field}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default FieldFilter;
