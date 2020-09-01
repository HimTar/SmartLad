import React from "react";
import { Link } from "react-router-dom";
import "./courseboxcss.css";

const CourseBox = (props) => {
  const image = props.data.image;
  return (
    <div className="course-display-box">
      <Link to={`/courses/${props.data._id}`}>
        <img src={image} alt="Avatar" style={{ width: "100%" }} />
      </Link>
      <div className="container">
        <h4 style={{ fontSize: "20px", textDecoration: "underline" }}>
          <Link
            to={`/courses/${props.data._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <b>{props.data.title}</b>{" "}
          </Link>
        </h4>
        <p style={{ color: "#1e00ef" }}>Rs. {props.data.price}</p>
      </div>
    </div>
  );
};

export default CourseBox;
