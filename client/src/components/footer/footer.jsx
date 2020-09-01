import React from "react";
import facebook from "../../icons/facebook.png";
import google from "../../icons/google-plus.png";
import instagram from "../../icons/instagram.png";
import twitter from "../../icons/twitter.png";

import "./footercss.css";

const footer = () => {
  return (
    <footer>
      <div className="content-box">
        <div className="left">
          <h1>Our Goal</h1>
          <p style={{ fontSize: "18px", marginTop: "18px" }}>
            We have been guiding and supporting Students since 2016. We work
            hard to become the Biggest Support Platform on which students can
            depend upon. Connecting 10 Million+ students and 50+ schools will be
            our fist step towards our goal.
          </p>
        </div>

        <div className="right">
          <div className="links">
            <h2>Smartlad</h2>
            <ul style={{ padding: "0", listStyle: "none" }}>
              <li>Home</li>
              <li>Courses</li>
              <li>Our Mentors</li>
              <li>Competitions</li>
              <li>About Us</li>
            </ul>
          </div>

          <div className="social">
            <img src={facebook} alt="facebook" />
            <img src={instagram} alt="instagram" />
            <img src={twitter} alt="twitter" />
            <img src={google} alt="google" />
            <h5 style={{ textAlign: "center", marginTop: "5px" }}>Follow Us</h5>
          </div>
        </div>
      </div>

      <h4 className="copyright">Copyrights by Smartlad.com @2020</h4>
    </footer>
  );
};

export default footer;
