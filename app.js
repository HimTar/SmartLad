const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const fileUpload = require("express-fileupload");

const app = express();

//Configuring MongoDB
const db = "mongodb://localhost:27017/test";

mongoose
  .connect(process.env.MONGODB_URI || db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

//Including User Routes
app.use("/user", require("./routes/User"));
app.use("/courses", require("./routes/Course"));
app.use("/payment", require("./routes/Payment"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

//Setting PORT and Listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
