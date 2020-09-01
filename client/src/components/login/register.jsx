import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Message from "./message/message";
import avatar from "../../icons/avatar.png";

const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [message, setMessage] = useState(null);
  const [disable, setDisable] = useState(false);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({
      username: "",
      email: "",
      password: "",
      confirmPass: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setDisable(true);
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
      setDisable(false);
    });
  };

  return (
    <div className="login-container">
      <div className="loginbox">
        <img src={avatar} className="avatar" alt="avatar" />
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
          <p>Username</p>
          <input
            type="text"
            name="username"
            onChange={onChange}
            value={user.username}
            placeholder="Enter Your Name"
            required
          />
          <p>Email Id</p>
          <input
            type="text"
            name="email"
            onChange={onChange}
            value={user.email}
            placeholder="Enter Your Email Id"
            required
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            onChange={onChange}
            value={user.password}
            placeholder="Enter Password"
            required
          />
          <p>Confirm Password</p>
          <input
            type="password"
            name="confirmPass"
            onChange={onChange}
            value={user.confirmPass}
            placeholder="Re-enter Password"
            required
          />
          <input type="submit" value="Register" disabled={disable} />

          <Link to="/login">Already have an account?</Link>
        </form>
        {message ? <Message message={message} /> : null}
      </div>
    </div>
  );
};

export default Register;
