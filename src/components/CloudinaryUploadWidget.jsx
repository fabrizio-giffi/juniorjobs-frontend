import { Button } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import "./CloudinaryUploadWidget.css";
import UploadFileBtn from "./UploadFileBtn";

const api_URL = import.meta.env.VITE_API_URL;

const CloudinaryUploadWidget = ({ setProfilePicture }) => {
  const [imageSelected, setImageSelected] = useState("");
  const { user } = useContext(AuthContext);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "qt1a58q1");
    console.log("imageSelected", imageSelected);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dbxtlw5rz/image/upload",
        formData
      );
      const url = response.data.url;
      await axios.put(`${api_URL}/company/edit/picture/${user.id}`, {
        profilePicture: url,
      });
      setProfilePicture(url);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <UploadFileBtn imageSelected={imageSelected} setImageSelected={setImageSelected} />
      <div className="button-picture">
        <Button
          type="submit"
          variant="contained"
          sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
          onClick={uploadImage}
          
        >
          Upload image
        </Button>
      </div>
    </>
  );
};

export default CloudinaryUploadWidget;