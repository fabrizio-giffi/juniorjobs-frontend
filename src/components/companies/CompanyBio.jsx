import { Alert, Avatar, Box, Button, IconButton, Stack, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PublicIcon from "@mui/icons-material/Public";
import EmailIcon from "@mui/icons-material/Email";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditIcon from "@mui/icons-material/Edit";
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
  const [isUploaded, setIsUploaded] = useState(false);
  const hiddenFileInput = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploadedName = event.target.files[0].name;
    const fileUploaded = event.target.files[0];
    setFileName(fileUploadedName);
    setImageSelected(fileUploaded);
    setIsUploaded(true);
  };

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
      setImageSelected("");
      setIsUploaded(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelUpload = () => {
    setImageSelected("");
    setIsUploaded(false);
  };

  return (
    <Box className="nobottom" sx={{ minWidth: "50%", boxSizing: "border-box", p: 4 }}>
      <Box className="media-break" sx={{ mb: 4, display: "flex", alignItems: "start", gap: 4 }}>
        <Box sx={{ position: "relative" }}>
          <Avatar
            className="profilePic"
            src={profilePicture}
            alt={name}
            sx={{
              width: 150,
              height: 150,
              mr: 2,
              bgcolor: "white",
              opacity: isHovered ? 0.6 : 1,
              border: "solid 1px #6b9080",
            }}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          {isHovered && <AddAPhotoIcon color="action" sx={{ position: "absolute", left: 0, bottom: 0 }} />}
        </Box>

        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "start", mb: 1 }}>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "start", mb: 1 }}>
            <Typography variant="h5">{name}</Typography>
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon color="action" />
            </IconButton>
          </Box>
          <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="small">
              <EmailIcon />
            </IconButton>
            <Typography variant="body1" sx={{ ml: 1 }}>
              {email}
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="small">
              <PublicIcon />
            </IconButton>
            <Typography variant="body1" sx={{ ml: 1 }}>
              {city}, {country}
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="small">
              <PlaceIcon />
            </IconButton>
            <Typography variant="body1" sx={{ ml: 1 }}>
              {zipCode}, {street}
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: "none" }} />
        {isUploaded && (
          <>
            <Stack sx={{ width: "100%", mt: 2 }}>
              <Alert severity="warning" sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}>
                Confirm your image selection:
                <br />
                <Typography>{fileName}</Typography>
              </Alert>
            </Stack>
            <Stack direction="row" sx={{ width: "100%", gap: 3 }}>
              <Button fullWidth variant="contained" sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }} onClick={uploadImage}>
                Upload image
              </Button>
              <Button fullWidth variant="contained" sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }} onClick={cancelUpload}>
                Cancel
              </Button>
            </Stack>
          </>
        )}
        {isEdited && (
          <Alert severity="success" sx={{ textAlign: "center", bgcolor: "#fbfbfb" }}>
            Your profile has been updated!
          </Alert>
        )}
      </Box>
    </Box>
  );
}

export default CompanyBio;
