import React, { Component } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

class Test extends Component {
  render() {
    return (
      <DropdownButton title="Dropdown">
        <Dropdown.Item href="#books">Books</Dropdown.Item>
        <Dropdown.Item href="#podcasts">Podcasts</Dropdown.Item>
        <Dropdown.Item href="#">Tech I Like</Dropdown.Item>
        <Dropdown.Item href="#">About me</Dropdown.Item>
        <Dropdown.Item href="#addBlog">Add a Blog</Dropdown.Item>
      </DropdownButton>
    );
  }
}

export default Test;
