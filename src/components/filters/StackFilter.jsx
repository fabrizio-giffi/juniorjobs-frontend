import { Autocomplete, Box, Button, TextField } from "@mui/material";

function StackFilter({ setStackQuery, stackQuery, stackFilter }) {
  return (
    <Box>
      <Autocomplete
        sx={{display: "inline-block"}}
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
          return <div style={{display: "flex", justifyContent:"center", alignItems:"center", }}><TextField {...params}  label="Stacks" placeholder="Stack" sx={{width:"700px",display: "inline-block"}}/></div>;
        }}
      />
      <Button sx={{bgcolor: "#6b9080", padding:"15px 20px", margin:"0 20px", textDecoration:"none", color:"inherit"}} onClick={() => setStackQuery([])}>Remove filter</Button>
    </Box>
  );
}

export default StackFilter;
