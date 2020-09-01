import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../context/authContext";
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
          <button className="login-button">Login</button>
        </Link>
        <Link to="/register">
          <button className="login-button">Register</button>
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
        <Link to="/">
          <li className="nav-item nav-link">{user.username}</li>
        </Link>
        {user.role === "admin" ? (
          <Link to="/admin">
            <li className="nav-item nav-link">Admin</li>
          </Link>
        ) : null}
        <li>
          <button
            type="button"
            className="btn btn-link nav-item nav-link"
            onClick={onClickLogoutHandler}
          >
            Logout
          </button>
        </li>
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
            <a href="/team">Team</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li>
            <a href="/aboutus">About Us</a>
          </li>
        </ul>
      </nav>
      {isAuthenticated ? authenticatedNavBar() : unauthenticatedNavBar()}
    </div>
  );
};

export default Navbar;
