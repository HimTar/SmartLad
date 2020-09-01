import React, { useState, useEffect } from "react";
import axios from "axios";
import cover from "../../icons/courses.png";
import CourseBox from "./extras/CourseBox";
import "./coursescss.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/courses/courses-display");
        setCourses(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const DisplayCourse = () => {
    return (
      <div className="course-list">
        {courses.map((course, index) => {
          return <CourseBox data={course} key={index} />;
        })}
      </div>
    );
  };

  return (
    <div className="courses-container">
      <div className="Courses">
        <div className="cover-image">
          <div>
            <img src={cover} alt="cover" />
          </div>
        </div>

        <div className="our-courses">
          <h3 style={{ fontWeight: "bold", fontFamily: "", margin: "0" }}>
            Featured Courses
          </h3>
          <hr />

          {courses ? (
            DisplayCourse()
          ) : (
            <div
              style={{
                display: "block",
                height: "300px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2>Get Started and Enroll in our Courses</h2>
              <button>Check Courses</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
