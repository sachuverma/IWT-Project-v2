const express = require("express"),
  request = require("request"),
  router = express.Router(),
  Dish = require("../models/dish"),
  middleware = require("../middleware/index.js");

// ============ HOME ROUTE =============
router.get("/", function (req, res) {
  res.render("home");
});

// ============ ABOUT ROUTES =============
router.get("/about/artists", function (req, res) {
  res.render("about/artists.ejs");
});

router.get("/about/awards", function (req, res) {
  res.render("about/awards.ejs");
});

router.get("/about/community", function (req, res) {
  res.render("about/community.ejs");
});

router.get("/about/contact-us", function (req, res) {
  res.render("about/contact-us.ejs");
});

router.get("/about/design", function (req, res) {
  res.render("about/design.ejs");
});

router.get("/about/gallery", function (req, res) {
  res.render("about/gallery.ejs");
});

router.get("/about/health-safety", function (req, res) {
  res.render("about/health.ejs");
});

router.get("/about/our-peoples", function (req, res) {
  res.render("about/our-peoples.ejs");
});

// ============ FEATURES ROUTES ========

router.get("/features/menu", async function (req, res) {
  await Dish.find({}, function (err, allDishes) {
    if (err) console.log(err);
    else res.render("features/menu.ejs", { dishes: allDishes });
  });
});

router.get("/features/bar", function (req, res) {
  res.render("features/bar.ejs");
});

router.get("/features/wine", function (req, res) {
  res.render("features/wine.ejs");
});

router.get("/features/beer", function (req, res) {
  res.render("features/beer.ejs");
});

router.get("/features/cocktails", function (req, res) {
  res.render("features/cocktails.ejs");
});

router.get("/features/dining", function (req, res) {
  res.render("features/dining.ejs");
});

router.get("/features/bel-cafe", function (req, res) {
  res.render("features/bel-cafe.ejs");
});

router.get("/features/deposit", function (req, res) {
  res.render("features/deposit.ejs");
});

router.get("/features/order", function (req, res) {
  res.render("features/order.ejs");
});

// ============ ADD / REMOVE ITEMS =============

router.get(
  "/add-remove-menu-items",
  middleware.isLoggedIn,
  async function (req, res) {
    await Dish.find({}, function (err, allDishes) {
      if (err) console.log(err);
      else res.render("menu/add", { dishes: allDishes });
    });
  }
);

router.post(
  "/add-special-item",
  middleware.isLoggedIn,
  async function (req, res) {
    var newDish = new Dish({
      name: req.body.name,
      price: req.body.price,
      details: req.body.details,
    });

    await Dish.create(newDish, function (err, newlyCreated) {
      if (err) {
        req.flash("error", "Error! Adding Dish ");
        console.log(err);
        res.redirect("/add-remove-menu-items");
      } else {
        req.flash("success", "Success! Added Dish ");
        res.redirect("/add-remove-menu-items");
      }
    });
  }
);

router.get(
  "/delete-special-item/:id",
  middleware.isLoggedIn,
  async function (req, res) {
    await Dish.findByIdAndRemove(req.params.id, function (err) {
      if (err) {
        console.log(err);
        req.flash("error", "Error, Deleting Dish Item! Internal Server Error!");
        res.redirect("/add-remove-menu-items");
      } else {
        req.flash("success", "Dish Removed Successfully!");
        res.redirect("/add-remove-menu-items");
      }
    });
  }
);

module.exports = router;
