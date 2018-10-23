// Require modules
const createError = require("http-errors");
const logger = require("morgan");
const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const expressValidator = require("express-validator");
const session = require("express-session");
const passport = require("passport");
const multer = require("multer");
const LocalStrategy = require("passport-local").Strategy;
const port = process.env.PORT || 3000;
const title = "Home";

/********** MONGOOSE ****************/
require("./db/db_conn");

/********** MODELS ****************/
var User = require("./models/user");
var Product = require("./models/product");

/*********************** VIEW ENGINE ***************************/
app.set("views", path.join(__dirname, "views/"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

/*********************** MIDDLEWARES ***************************/
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "/public/"))); // set public folder
app.use(bodyParser()); // use bodyParser
app.use(cookieParser()); // use cookieParser
app.use(expressLayouts); // use expressLayouts
app.use(express.json()); // use express.json
app.use(express.urlencoded({ extended: false })); // use express.urlencoded

// Express-session Middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Express-validator middleware
app.use(
  expressValidator({
    errorFormater: (param, msg, value) => {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

// Express Messages Middleware
app.use(require("connect-flash")());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Custom middleware for log request
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  // writing to file "server.log"
  fs.appendFile("log/server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to write to server.log\n");
    } else {
      console.log(log);
    }
  });

  next();
});

// Get any route and send Global variables
app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.url = req.originalUrl || null;
  next();
});

// Home Route
app.get("/", (req, res) => {
  
  // To show the products available
  Product.find((err, items) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      res.render("index", { title: title, items: items });
    }
  });
});

/*********************** ROUTES ***************************/
var indexRouter = require("./routes/index"); // index router
app.use("/", indexRouter);

var frontRouter = require("./routes/front/index"); // front-index router
app.use("/", frontRouter);

var usersRouter = require("./routes/admin"); // users router
app.use("/", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (req.isAuthenticated()) {
    res.render(`404`, {
      title: "Error",
      name: req.user.full_name,
      category: req.user.category
    });
  } else {
    console.log(`\n\nAll users has been logged out!\n\n`);
    res.redirect("/");
  }
});

// SERVER listening
app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
