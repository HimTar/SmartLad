import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CourseBox from "../courses/extras/CourseBox";
import { AuthContext } from "../../context/authContext";
import "./dashbordcss.css";

const Dashbord = (props) => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.courses.length)
      axios
        .post("/courses/mycourses", { courses: user.courses })
        .then((res) => {
          setCourses(res.data.courses);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [user.courses]);

  const DisplayCourse = () => {
    return (
      <div
        className="course-list"
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {courses.map((course, index) => {
          return <CourseBox data={course} key={index} />;
        })}
      </div>
    );
  };

  return (
    <div className="dashbord-container" style={{}}>
      <div className="dashbord">
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "34px",
            margin: "0",
          }}
        >
          Dashbord
        </h1>
        <h6 style={{ margin: "0" }}>Student</h6>
        <br />
        <br />
        <div className="my-courses">
          <h3
            style={{
              fontWeight: "bold",
              fontSize: "26px",
              margin: "0",
              padding: "10px",
            }}
          >
            My Courses
          </h3>
          <hr />

          {courses.length ? (
            DisplayCourse()
          ) : (
            <div className="no-courses">
              <div className="center">
                <h2>Get Started. Check our Most Promising Courses</h2>
                <br />
                <Link to="/courses" style={{ textDecoration: "none" }}>
                  <button>Look Courses</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
