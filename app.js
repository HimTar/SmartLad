const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");

const app = express();
const server = http.createServer(app);

// Configuring MongoDB
const db =
  "mongodb+srv://UserAdmin1:Himanshu@20@cluster0.b1n2w.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Configuring Cloudinary for Image Upload
cloudinary.config({
  cloud_name: "himanshu-cloud",
  api_key: "635627317166522",
  api_secret: "owQrw5R2uXB5-qHlWKUlgWlKL5A",
});

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Including User Routes
app.use("/user", require("./routes/User"));
app.use("/courses", require("./routes/Course"));
app.use("/payment", require("./routes/Payment"));

// Setting for Heroku Deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Setting PORT and Listening
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
