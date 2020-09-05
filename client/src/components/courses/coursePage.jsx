import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import "./coursePagecss.css";

const CoursePage = (props) => {
  const courseId = props.match.params.courseId;
  const [course, setCourse] = useState(null);
  const [loaded, setIsLoaded] = useState(false);
  const [purchase, setPurchase] = useState(false);
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`/courses/course_by_id?id=${courseId}&type=single`)
      .then((data) => {
        setCourse(data.data);
        setIsLoaded(true);
        if (user.courses.includes(courseId)) {
          setPurchase(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [courseId, user.courses]);

  const BuyButton = () => {
    return <button onClick={onBuyNow}>Buy Now</button>;
  };

  const GotoButton = () => {
    return <button style={{ background: "#d41f1f" }}>Go To Course</button>;
  };

  const onBuyNow = () => {
    if (isAuthenticated) {
      const data = {
        purpose: "Bid Payment",
        amount: course.price,
        buyer_name: user.username,
        email: user.email,
        phone: "9898989898",
        user_id: user._id,
        redirect_url: `https://smartlad.herokuapp.com/payment/callback?course_id=${courseId}&user_id=${user._id}`,
      };

      axios
        .post("/payment/", data)
        .then((res) => {
          window.location.href = res.data;
        })
        .catch((err) => console.log(err));
    } else props.history.push("/login");
  };

  const data = () => {
    return (
      <>
        <div className="sidebar">
          <img src={course.image} alt="course" />
          <div className="content">
            <h2>&#8377; {course.price}</h2>

            {purchase ? GotoButton() : BuyButton()}

            <h4>This course includes :</h4>
            <p>&#9734; &nbsp; 24 hours on demand videos</p>
            <p>&#9734; &nbsp; 5 articles</p>
            <p>&#9734; &nbsp; 20 downlodable documents</p>
            <p>&#9734; &nbsp; Full life time access</p>
            <p>&#9734; &nbsp; Certificate of completion</p>
          </div>
        </div>

        <div className="flex-div">
          <div className="course-details">
            <div className="upper-content">
              <div className="content">
                <h1> {course.title} </h1>
                <p>
                  Use Blender to Create Beautiful 3D models for Video Games, 3D
                  Printing & More. Beginners Level Course
                </p>
                <p>Created By : {course.writer} </p>
              </div>
            </div>
          </div>

          <div className="left-main-content-box">
            <div className="what-learn">
              <h1>We'll teaches you</h1>
              <p>
                &#10004; &nbsp; Ethical Hacking
                <br />
                &#10004; &nbsp; Python Programming
                <br />
                &#10004; &nbsp; Penetration Testing
                <br />
                &#10004; &nbsp; Network Security
                <br />
                &#10004; &nbsp; Port and Vulnerability Scanning
                <br />
                &#10004; &nbsp; SSH and FTP Attacks
                <br />
                &#10004; &nbsp; Password Cracking
                <br />
                &#10004; &nbsp; Sniffers, Flooders and Spoofers
                <br />
                &#10004; &nbsp; DNS Spoofing
                <br />
                &#10004; &nbsp; Network Analysis
                <br />
                &#10004; &nbsp; Multi-functioning Reverse Shell
              </p>
            </div>

            <div className="description">
              <h1>Description</h1>
              <p> {course.description} </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="course-container">
      {loaded ? data() : <h1>Loading...</h1>}
    </div>
  );
};

export default CoursePage;
