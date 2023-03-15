import { Avatar, Box, Button, IconButton, Stack, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PublicIcon from "@mui/icons-material/Public";
import EmailIcon from "@mui/icons-material/Email";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

const api_URL = import.meta.env.VITE_API_URL;

function CompanyBio({
  profilePicture,
  setProfilePicture,
  name,
  email,
  city,
  country,
  zipCode,
  street,
  isEdited,
  setIsEditing,
}) {
  const { user } = useContext(AuthContext);
  const [fileName, setFileName] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const hiddenFileInput = useRef(null);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "qt1a58q1");
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dbxtlw5rz/image/upload", formData);
      const url = response.data.url;
      await axios.put(`${api_URL}/company/edit/picture/${user.id}`, {
        profilePicture: url,
      });
      setProfilePicture(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploadedName = event.target.files[0].name;
    const fileUploaded = event.target.files[0];
    setFileName(fileUploadedName);
    setImageSelected(fileUploaded);
  };

  return (
    <Box sx={{ flexGrow: 1, minWidth: "50%" }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <Avatar
          className="profilePic"
          src={profilePicture}
          alt="N/A"
          sx={{ width: 56, height: 56, mr: 2 }}
          onClick={handleClick}
        />
        <Typography variant="h5">{name}</Typography>
      </Box>
      <Stack direction="row" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <IconButton size="small">
          <EmailIcon />
        </IconButton>
        <Typography variant="body1" sx={{ ml: 1 }}>
          {email}
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <IconButton size="small">
          <PublicIcon />
        </IconButton>
        <Typography variant="body1" sx={{ ml: 1 }}>
          {city}, {country}
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <IconButton size="small">
          <PlaceIcon />
        </IconButton>
        <Typography variant="body1" sx={{ ml: 1 }}>
          {zipCode}, {street}
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
        <Button type="submit" variant="contained" sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }} onClick={uploadImage}>
          Upload image
        </Button>
        <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: "none" }} />
        <Typography variant="body1">{fileName}</Typography>
        {isEdited && <Typography>Your personal profile has been updated!</Typography>}
      </Box>
    </Box>
  );
}

export default CompanyBio;