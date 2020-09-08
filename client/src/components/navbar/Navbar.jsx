import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../context/authContext";
import { Dropdown, DropdownButton } from "react-bootstrap";
import logo from "../../icons/Logo.png";
import "./navbarcss.css";

const Navbar = (props) => {
  const { isAuthenticated, user, setisAuthenticated, setUser } = useContext(
    AuthContext
  );

  const unauthenticatedNavBar = () => {
    return (
      <>
        <Link to="/login">
          <button className="common-button">Login</button>
        </Link>
        <Link to="/register">
          <button className="common-button">Register</button>
        </Link>
      </>
    );
  };

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setisAuthenticated(false);
      }
    });
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <DropdownButton title={user.username}>
          <Dropdown.Item href="/upload-course">Create Course</Dropdown.Item>
          <Dropdown.Item onClick={onClickLogoutHandler}>LogOut</Dropdown.Item>
        </DropdownButton>

        {user.role === "admin" ? (
          <Link to="/admin">
            <li className="nav-item nav-link">Admin</li>
          </Link>
        ) : null}
      </>
    );
  };

  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />

      <nav>
        <ul className="nav-link">
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/inmaking">Team</a>
          </li>
          <li>
            <a href="/inmaking">Blog</a>
          </li>
          <li>
            <a href="/inmaking">About Us</a>
          </li>
        </ul>
      </nav>
      {isAuthenticated ? authenticatedNavBar() : unauthenticatedNavBar()}
    </div>
  );
};

export default Navbar;
