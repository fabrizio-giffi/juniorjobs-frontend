import { Autocomplete, Box, Button, TextField } from "@mui/material";

function StackFilter({ setStackQuery, stackQuery, stackFilter }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
              <TextField {...params} label="Stacks" placeholder="Stack" sx={{ minWidth: "200px" }} />
            </div>
          );
        }}
      />
      <Button variant="contained" sx={{ bgcolor: "#6b9080" }} onClick={() => setStackQuery([])}>
        X
      </Button>
    </Box>
  );
}

export default StackFilter;
