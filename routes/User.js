const router = require("express").Router();
const passport = require("passport");
const passportlocal = require("../config/passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", (req, res) => {
  const { username, email, password, confirmPass } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    else if (user)
      res.status(500).json({
        message: { msgBody: "Username already taken", msgError: true },
      });
    else if (confirmPass !== password) {
      res.status(500).json({
        message: { msgBody: "Passwords do not match", msgError: true },
      });
    } else {
      User.findOne({ email }, (err, user) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else if (user)
          res.status(500).json({
            message: { msgBody: "Email Id already in use", msgError: true },
          });

        const newUser = new User({
          username,
          email,
          password,
          courses: [],
          role: "user",
        });

        newUser.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "Error has occured", msgError: true },
            });
          else
            res.status(200).json({
              message: {
                msgBody: "Account added Successfully",
                msgError: false,
              },
            });
        });
      });
    }
  });
});

//Function for signing token
const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "Himanshu",
      sub: userID,
    },
    "secret",
    { expiresIn: "1h" }
  );
};

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, email, courses, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: req.user,
      });
    }
  }
);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

router.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin")
      res
        .status(200)
        .json({ message: { msgBody: "You are an admin" }, msgError: false });
    else
      res.status(500).json({
        message: { msgBody: "You are not authorized" },
        msgError: true,
      });
  }
);

router.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ isAuthenticated: true, user: req.user });
  }
);

module.exports = router;
