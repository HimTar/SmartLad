import React, { useState, useContext } from "react";
import FileUpload from "../utils/fileUpload/fileUpload";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import "./uploadCoursecss.css";

const UploadCourse = (props) => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: null,
  });
  const [Image, setImage] = useState(null);
  const Context = useContext(AuthContext);

  const onChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const updateImage = (newImage) => {
    setImage(newImage);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!Image) {
      alert("No Course Image is choosen");
    } else {
      const data = {
        writer: Context.user.username,
        title: course.title,
        description: course.description,
        price: course.price,
        image: Image.filePath,
      };

      try {
        const res = await axios.post("courses/upload-course", data);

        if (res.data.success) {
          alert("Product Successfully Uploaded");
          props.history.push("/home");
        }
      } catch (err) {
        alert("Falied to upload course");
      }
    }
  };

  return (
    <div className="UploadBox">
      <h1
        style={{ textAlign: "center", marginBottom: "20px", fontSize: "30px" }}
      >
        Upload Course
      </h1>
      <FileUpload refreshFunction={updateImage} />
      <h4 style={{ textAlign: "center", fontSize: "20px", marginTop: "20px" }}>
        Course Image
      </h4>
      <br />

      <form onSubmit={onSubmit}>
        <label>Course Title</label>
        <br />
        <input
          type="text"
          name="title"
          onChange={onChange}
          placeholder="Enter Title of the Course"
          required
        />
        <br />
        <br />

        <label>Course Description</label>
        <br />
        <textarea
          name="description"
          onChange={onChange}
          placeholder="Enter Description of the Course"
          required
        />
        <br />
        <br />

        <label>Course Price</label>
        <br />

        <input type="number" name="price" onChange={onChange} required />
        <br />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default UploadCourse;
