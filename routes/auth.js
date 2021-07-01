const express = require("express"),
  request = require("request"),
  router = express.Router(),
  middleware = require("../middleware/index.js"),
  User = require("../models/user"),
  passport = require("passport");

// ============ LOGIN ROUTE =============
router.get("/login", function (req, res) {
  res.render("auth/login");
});

// ============ REG ROUTE =============
router.get("/register", function (req, res) {
  res.render("auth/register");
});

// Auth ROUTES
// handle user sign up
router.post("/register", function (req, res) {
  var newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
  });

  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Welcome to Menu Edit Page! ");
      res.redirect("/add-remove-menu-items");
    });
  });
});

// LOGIN ROUTES
// login logic
router.post(
  "/login",
  (req, res, next) => {
    req.flash("error", "Enter Valid Credentials!");
    next();
  },
  // middleware
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  function (req, res) {
    req.flash("error", "");
    req.flash("success", "Welcome to Menu Edit Page!");
    res.redirect("/add-remove-menu-items");
  }
);

// logout logic
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged You Out!");
  res.redirect("/login");
});

// DEFAULT ROUTE HANDLER
router.get("*", function (req, res) {
  res.redirect("/");
});
module.exports = router;
