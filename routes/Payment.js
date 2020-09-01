const express = require("express");
const url = require("url");
const Insta = require("instamojo-nodejs");
const User = require("../models/User");

const router = express.Router();

router.post("/", (req, res) => {
  Insta.setKeys(
    "test_ce22852ccc6c605a155f0abbd53",
    "test_0ff49ba876c9c8f4234ad161ef5"
  );
  Insta.isSandboxMode(true);

  const data = new Insta.PaymentData();

  data.purpose = req.body.purpose;
  data.amount = req.body.amount;
  data.buyer_name = req.body.buyer_name;
  data.redirect_url = req.body.redirect_url;
  data.email = req.body.email;
  data.phone = req.body.phone;
  data.send_email = false;
  data.send_sms = false;
  data.webhook = "http://www.example.com/webhook/";
  data.allow_repeated_payments = false;

  Insta.createPayment(data, function (error, response) {
    if (error) {
      // some error
      console.log("Error : " + error);
    } else {
      // Payment redirection link at response.payment_request.longurl
      const responseData = JSON.parse(response);
      const redirect_url = responseData.payment_request.longurl;
      res.status(200).json(redirect_url);
    }
  });
});

router.get("/callback/", (req, res) => {
  let url_parts = url.parse(req.url, true);
  let responseData = url_parts.query;

  if (responseData.payment_id) {
    const userId = responseData.user_id;
    const courseId = responseData.course_id;
    User.findByIdAndUpdate(userId, { $push: { courses: courseId } })
      .then((user) => console.log(user))
      .catch((err) => console.log(err));

    return res.redirect("http://localhost:3000/payment-status");
  }
});

module.exports = router;
