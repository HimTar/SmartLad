import React, { Component } from "react";
import construction from "../../../icons/construction.jpg";

import "./InMakingcss.css";

class InMaking extends Component {
  state = {};
  render() {
    return (
      <div className="in-making">
        <div className="content">
          <img src={construction} alt="under-construction" />
          <h1 style={{ fontSize: "60px" }}>Under Construction</h1>
          <h3>
            <br /> Maybe next time you visit its completed.{" "}
          </h3>
        </div>
      </div>
    );
  }
}

export default InMaking;
