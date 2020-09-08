import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import course from "../../icons/course.png";
import mentor from "../../icons/mentor.png";
import competition from "../../icons/competition.png";

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <br />
        <section className="section-container">
          <div className="left-half">
            <h1 className="title">Our Courses</h1>
            <p className="description">
              We provide skill-oriented courses that targets your professional
              and personal life and makes you a remarkable person. So train
              yourself with us and learn in-demand skills and make your future
              prosporous. <br />
            </p>
            <Link to="/courses">
              <button className="link-button" style={{ width: "200px" }}>
                Check Courses
              </button>
            </Link>
          </div>
          <div className="right-half">
            <img src={course} alt="course" />
          </div>
        </section>
        <br />
        <br />
        <section className="section-container">
          <div className="left-half">
            <img src={mentor} alt="mentor" />
          </div>
          <div className="right-half">
            <h1 className="title">Our Mentors</h1>
            <p className="description">
              We have skilled professionals here with us to guide and mentor you
              to your choosen field. Consult them, clear your doubts, take
              guidance and make your future more secure.
            </p>
            <Link to="/inmaking">
              <button className="link-button" style={{ width: "200px" }}>
                Book Mentor
              </button>
            </Link>
          </div>
        </section>
        <br />
        <br />
        <section className="section-container">
          <div className="left-half">
            <h1 className="title">Competitions and Seminars</h1>
            <p className="description">
              Participate in Competitions all around India and hone your skills.
              Attend Seminars of well renowned consultants and gain knowledge on
              leading topics and skills.
            </p>
            <Link to="/inmaking">
              <button className="link-button" style={{ width: "250px" }}>
                Look Competitions
              </button>
            </Link>
          </div>
          <div className="right-half">
            <img src={competition} alt="course" />
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
