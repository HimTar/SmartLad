import React, { useState } from "react";
import axios from "axios";
import "./fileUploadcss.css";

const FileUpload = (props) => {
  const [Image, setImage] = useState(null);

  const OnChange = (event) => {
    const formData = new FormData();
    const fileData = event.target.files[0];

    // Update the formData object
    formData.append("photo", fileData);

    axios
      .post("courses/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.msgError) {
          alert(res.data.msgBody);
        } else {
          setImage(res.data.msgBody);
          props.refreshFunction(res.data.msgBody);
        }
      })
      .catch((err) => console.log(err));
  };

  const onDelete = () => {
    setImage(null);
  };

  return (
    <div className="dropbox">
      <div className="inputWrapper">
        <input
          className="fileInput"
          type="file"
          name="file1"
          onChange={OnChange}
        />
      </div>

      {Image ? (
        <div onClick={onDelete} style={{ margin: "auto" }}>
          <img
            style={{ width: "250px", height: "200px" }}
            src={Image}
            alt="Course-Pic"
          />
        </div>
      ) : null}
    </div>
  );
};

export default FileUpload;
