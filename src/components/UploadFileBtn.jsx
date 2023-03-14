import { Avatar, Button } from "@mui/material";
import React, { useRef, useState } from "react";
import "./CloudinaryUploadWidget";

const UploadFileBtn = ({ imageSelected, setImageSelected }) => {
  const [fileName, setFileName] = useState("");
  const hiddenFileInput = useRef(null);

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
    <>
      <Avatar sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }} onClick={handleClick}>
        Up
      </Avatar>
      <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: "none" }} />
      <span>{fileName}</span>
    </>
  );
};
export default UploadFileBtn;
