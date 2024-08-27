var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// company Routes
router.get("/about-us", function (req, res, next) {
  res.render("about-us");
});
router.get("/company-video", function (req, res, next) {
  res.render("company-video");
});

router.get("/contacts", function (req, res, next) {
  res.render("contacts");
});
module.exports = router;
