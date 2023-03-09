import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import "./CloudinaryUploadWidget";

const UploadFileBtn = () => {
  const [fileName, setFileName] = useState("");
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0].name;
    setFileName(fileUploaded);
  };

  return (
    <>
      <Button
        type="submit"
        variant="contained"
        sx={{ bgcolor: "#6b9080", mt: 3, mb: 2 }}
        onClick={handleClick}
      >
        Upload a file
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <span>{fileName}</span>
    </>
  );
};
export default UploadFileBtn;
