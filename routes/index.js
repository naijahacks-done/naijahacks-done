var express = require("express");
var router = express.Router();

/********** ROUTES **********/
// Register route
var regRouter = require("./auth/register");
router.use("/register", regRouter);

// Login route
var LoginRouter = require("./auth/login");
router.use("/login", LoginRouter);

// Home route if user is logged in...
// Dashboard route
router.get("/dashboard", (req, res) => {
  res.render("admin/dashboard", {
    title: "Dashboard"
  });
  req.flash("success", `Welcome, ${req.user.username}!`);
  console.log(`\n${req.user.username} is logged in.\n`);
});

// Account route
router.get("/account", (req, res) => {
  res.render("admin/account", {
    title: "Account"
  });
});

// Custom middleware for users daily-access
function dailyUsage(msg) {
  var now = new Date().toString();
  var log = `${msg}`;

  // writing to file "server.log"
  fs.appendFile("log/user-server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to write to user-server.log\n");
    } else {
      return msg;
    }
  });
}

// Log-out route
router.get("/logout", function(req, res) {
  req.session.destroy(err => {
    console.log(`\n${req.user.username} just logged out!\n`);
    if (err) throw err;
    else {
      res.redirect("/"); //Inside a callback… bulletproof!
    }
  });
});

module.exports = router;
