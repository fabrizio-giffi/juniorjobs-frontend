import { Autocomplete, Box, Button, TextField } from "@mui/material";

function StackFilter({ setStackQuery, stackQuery, stackFilter }) {
  return (
    <Box>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={stackFilter}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        value={[...stackQuery]}
        onChange={(event) => setStackQuery([...stackQuery, event.target.innerText])}
        renderInput={(params) => {
          return <TextField {...params} label="Stacks" placeholder="Stack" />;
        }}
      />
      <Button onClick={() => setStackQuery([])}>Remove filter</Button>
    </Box>
  );
}

export default StackFilter;
