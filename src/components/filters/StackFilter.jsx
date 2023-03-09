import { Autocomplete, Box, IconButton, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function StackFilter({ setStackQuery, stackQuery, stackFilter }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={stackFilter}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        disableClearable
        value={[...stackQuery]}
        onChange={(event) => {
          event.preventDefault();
          if (event.code === "Backspace" || event.code === "Enter") {
            return;
          }
          setStackQuery([...stackQuery, event.target.innerText]);
        }}
        renderInput={(params) => {
          return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <TextField {...params} label="Stacks" placeholder="Stack" sx={{ minWidth: "200px", maxWidth: "350px" }} />
            </div>
          );
        }}
      />
      <IconButton size="small" aria-label="remove filters" onClick={() => setStackQuery([])}>
        <ClearIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}

export default StackFilter;
