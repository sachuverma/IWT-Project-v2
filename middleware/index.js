const middlewareObject = {};

middlewareObject.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash(
    "error",
    "You Need to be Logged In, to Edit Menu Items, and Details!"
  );
  res.redirect("/login");
};

module.exports = middlewareObject;
