import { Avatar, Box, Button, IconButton, Stack, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function JuniorBio({ firstName, lastName, city, country, calendly, setIsEditing, isEdited }) {
  return (
    <Box sx={{ flexGrow: 1, minWidth: "50%" }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <Avatar alt="N/A" sx={{ width: 56, height: 56, mr: 2 }}>
          {firstName[0]}
          {lastName[0]}
        </Avatar>
        <Typography variant="h5">
          {firstName} {lastName}
        </Typography>
      </Box>
      <Stack direction="row" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <IconButton size="small">
          <PlaceIcon />
        </IconButton>
        <Typography variant="body1" sx={{ ml: 1 }}>
          {city}, {country}
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
        <IconButton size="small">
          <CalendarMonthIcon />
        </IconButton>
        <Typography variant="body1" sx={{ ml: 1 }}>
          Calendly Link: {calendly}
        </Typography>
      </Stack>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
          onClick={() => setIsEditing(true)}
        >
          Edit information
        </Button>
        {isEdited && <Typography>Your personal profile has been updated!</Typography>}
      </Box>
    </Box>
  );
}

export default JuniorBio;
