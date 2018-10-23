const express = require("express");
const router = express.Router();
const title = "Community";

/********** MODELS ****************/
// user model
var User = require("../../models/user");

router.get("/", (req, res) => {
  User.find((err, users) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      res.render("community", { title: title, users: users });
    }
  });
});

// view user profile
router.get("/:username", (req, res) => {
  var username = req.params.username;
  var query = { username: username };
  User.findOne(query, (err, user) => {
    if (err) throw Error;
    else {
      res.render("profile", { title: title, user: user });
    }
  });
});

module.exports = router;
