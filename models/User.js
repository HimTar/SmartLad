const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 15,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  courses: {
    type: Array,
    default: [],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
});

// Hashing password before saving in Database

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) {
      return next();
    }

    this.password = passwordHash;
    next();
  });
});

// Method For Comparing The Password Entered

UserSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return next(err);
    } else {
      if (!isMatch) {
        return next(null, isMatch);
      }

      return next(null, this);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
