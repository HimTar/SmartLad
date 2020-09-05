const router = require("express").Router();
const passport = require("passport");
const path = require("path");
const Course = require("../models/course");
const cloudinary = require("cloudinary").v2;

router.get("/courses-display", (req, res) => {
  Course.find({}, (err, course) => {
    if (err) console.log(err);
    else res.send(course);
  });
});

//  ?id=${courseId}&type=single
router.get("/course_by_id", (req, res) => {
  const courseId = req.query.id;

  Course.findById(courseId, (err, course) => {
    if (err) res.status(400).json(err);

    res.status(200).json(course);
  });
});

router.post(
  "/upload-image",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const file = req.files.photo;
    var ext = path.extname(req.files.photo.name);

    if (ext === ".png" || ext === ".jpg") {
      cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        if (err)
          res.json({
            msgBody: "Error while uploading the file",
            msgError: true,
          });
        else
          res.json({
            msgBody: result.url,
            msgError: false,
          });
      });
    } else {
      res.json({
        msgBody: "File type not valid",
        msgError: true,
      });
    }
  }
);

router.post(
  "/upload-course",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newCourse = new Course(req.body);
    newCourse.save((err) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    });
  }
);

router.post(
  "/mycourses",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const data = req.body.courses;
    const courses = [];
    if (!data.length) {
      res.json([]);
    } else {
      for (let i = 0; i < data.length; i++) {
        Course.findById(data[i], (err, course) => {
          if (err) {
            res.json(err);
          }
          if (course) {
            courses.push(course);
          }
          if (i === data.length - 1) {
            res.status(200).json({ courses: courses });
          }
        });
      }
    }
  }
);

module.exports = router;
