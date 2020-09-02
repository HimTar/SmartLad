import React, { Component } from "react";
import { Link } from "react-router-dom";
import image404 from "../../../icons/404.png";
import "./Page404css.css";

class Page404 extends Component {
  render() {
    return (
      <div className="page404-box">
        <div className="page404">
          <img src={image404} alt="404" />
          <h2>Seems like you went to the wrong page</h2>
          <h2>This page does not exists</h2>
          <Link to="/" style={{ textDecoration: "none" }}>
            <button className="common-button">Back To Home</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Page404;
