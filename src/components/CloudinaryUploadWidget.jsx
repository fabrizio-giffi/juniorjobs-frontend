import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
const API_URL = "http://localhost:5005/api/company";

const CloudinaryUploadWidget = () => {
  const [imageSelected, setImageSelected] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const { user } = useContext(AuthContext);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "qt1a58q1");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dbxtlw5rz/image/upload",
        formData
      );
      const url = response.data.url;
      setProfilePicture(url);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImageToDB = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/edit/picture/${user.id}`,
        {profilePicture}
      );
      console.log("RESPONSE ON UPLOAD IMAGE", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    uploadImageToDB();
    console.log("PICTURE", profilePicture)
  }, [uploadImage]);

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
