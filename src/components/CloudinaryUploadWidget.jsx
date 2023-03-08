import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
const api_URL = import.meta.env.VITE_API_URL

const CloudinaryUploadWidget = ({ profilePicture, setProfilePicture }) => {
  const [imageSelected, setImageSelected] = useState("");
  const { user } = useContext(AuthContext);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "qt1a58q1");
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dbxtlw5rz/image/upload", formData);
      const url = response.data.url;
      await axios.put(`${api_URL}/company/edit/picture/${user.id}`, { profilePicture: url });
      setProfilePicture(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          setImageSelected(e.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload image</button>
    </>
  );
};

export default CloudinaryUploadWidget;
