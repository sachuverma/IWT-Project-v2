const express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  path = require("path"),
  request = require("request"),
  flash = require("connect-flash"),
  User = require("./models/user"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");

const PORT = process.env.PORT || 3000;
const DB_URL =
  process.env.MONGODB_URI ||
  "mongodb+srv://sachu:sachu@cluster0.tn1hd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
app.use(flash());

app.use(
  require("express-session")({
    secret: "this iz demo #iwt-demo-app xD",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(require("./routes/index"));
app.use(require("./routes/auth"));

app.listen(PORT, function () {
  console.log(`server started at port: ${PORT}`);
});
