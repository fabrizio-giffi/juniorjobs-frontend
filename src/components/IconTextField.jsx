import { InputAdornment, TextField } from "@mui/material";

function IconTextField({ iconStart, iconEnd, InputProps, props }) {
  console.log({ props });
  return (
    <TextField
      {...props}
      InputProps={{
        ...InputProps,
        startAdornment: iconStart ? <InputAdornment position="start">{iconStart}</InputAdornment> : null,
        endAdornment: iconEnd ? <InputAdornment position="end">{iconEnd}</InputAdornment> : null,
      }}
    />
  );
}

export default IconTextField;
