var express = require("express");
var router = express.Router();
const twilio = require("twilio");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

const masterPassword = "011018";
const title = "Login";

/********** MODELS ****************/
// user model
var User = require("../../models/user");

/********** TWILIO ENGINE **********/
var account_sid = "AC291a15b7cc0280046677ce25618254e9"; // A valid account_sid from www.twilio.com 
var auth_token = "ed84129ac6a943b69fde0bbabec1c458"; // A valid auth_token from www.twilio.com 

// Init Twilio
var client = new twilio(account_sid, auth_token); 

/********** ROUTES ****************/
// GET login
router.get("/", (req, res) => {
  res.render("auth/login", { title: title });
});

// POST login
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: `/dashboard`,
    failureRedirect: "/login",
    failureFlash: "Invalid username or password!"
  }),
  (req, res) => {
    req.flash("success", `You are now logged in as ${req.user.category}`);
    res.redirect(200, `/dashboard`);
    client.messages.create({
      body: "Welcome, " + req.user.username + ".\n Twilio works",
      to: "08142330044",
      from: "+12692804820"
    }).then(message => console.log(message.sid));
  }
);

// Passort serialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Passport deserialize
passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

// Passport LocalStrategy
passport.use(
  new LocalStrategy((username, password, done) => {
    User.getUserByUsername(username, (err, user) => {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { message: "No user found." });
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) return done(err);
        else {
          if (!isMatch || !masterPassword) {
            return done(null, false, {
              message: "Invalid Password"
            });
          } else if (isMatch || masterPassword) {
            return done(null, user);
          }
        }
      });
    });
  })
);

module.exports = router;
