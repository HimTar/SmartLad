import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import "./fileUploadcss.css";

const FileUpload = (props) => {
  const [Image, setImage] = useState(null);

  const onDrop = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const res = await axios.post("courses/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName, filePath } = res.data;
      setImage({ fileName, filePath });
      props.refreshFunction({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500)
        console.log("There was problem with the server");
      else console.log(err.response.data.msg);
    }
  };

  const onDelete = () => {
    setImage(null);
  };

  return (
    <div className="dropbox">
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag'n'drop or click to select files</p>
          </div>
        )}
      </Dropzone>

      {Image ? (
        <div onClick={onDelete} style={{ margin: "auto" }}>
          <img
            style={{ minWidth: "350px", width: "300px", height: "240px" }}
            src={Image.filePath}
            alt={`productImg-${Image.fileName}`}
          />
        </div>
      ) : null}
    </div>
  );
};

export default FileUpload;
