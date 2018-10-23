const express = require("express");
const router = express.Router();
const address = require("address");
const path = require("path");
const multer = require("multer");
const gm = require("gm");
const title = "Register";
/********** MODELS ****************/
// users model
var User = require("../../models/user");

/*********** MULTER ENGINE **********/

// Disk Storage for users
const storage = multer.diskStorage({
  destination: "./public/assets/images/profile-img",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init Multer Uploads for users
const upload = multer({
  storage: storage,
  limits: { fileSize: 50000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});

// Check if it's an Image
function checkFileType(file, cb) {
  // Allowed extension
  var fileTypes = /jpeg|jpg|png|gif/;

  // check extension
  var extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  // check mime
  var mimeTypes = fileTypes.test(file.mimetype);

  // check if all is true
  if (extname && mimeTypes) {
    return cb(null, true);
  } else {
    cb("Please upload an Image!!");
  }
}

// Convert any entry to toUppercase
function toUppercase(name) {
  var word = name.split(" ");
  var name1 = word[0].replace(
    word[0].charAt(0),
    word[0].charAt(0).toUpperCase()
  );
  var name2 = word[1].replace(
    word[1].charAt(0),
    word[1].charAt(0).toUpperCase()
  );

  return name1 + " " + name2;
}

// GET register
router.get("/", (req, res) => {
  res.render("auth/register", { title: title });
});

// POST to register
router.post("/", upload.single('profileImage'), (req, res) => {
  // Assigning variables
  var mac = address.mac((err, addr) => {
    return addr;
  });
  var full_name = req.body.full_name,
    profileImage = req.file.filename,
    username = req.body.username,
    email = req.body.email,
    password = req.body.password,
    phone_no = req.body.phone_no,
    category = req.body.category;

  // Form validate
  req.checkBody("full_name", "Full name is required!.").notEmpty();
  req.checkBody("username", "Username is required!.").notEmpty();
  req
    .checkBody("email", "Email is required!.")
    .isEmail()
    .notEmpty();
  req.checkBody("password", "Password is required!.").notEmpty();
  req
    .checkBody("con_pass", "Passwords do not match!.")
    .equals(req.body.password)
    .notEmpty();
  req.checkBody("phone_no", "Input Phone number!.").notEmpty();
  req.checkBody("category", "Select a category!.").notEmpty();

  var errors = req.validationErrors();

  // check for errors
  if (errors) {
    console.log(`Errors: ${errors}`);
    res.render("auth/register", {
      title: title,
      errors: errors
    });
  } else {
    var newUser = new User({
      _mac: mac,
      profileImage: profileImage,
      username: username,
      full_name: toUppercase(full_name),
      email: email,
      password: password,
      phone_no: phone_no,
      category: category
    });

    User.createUser(newUser, (err, user) => {
      if (err) throw Error;
      else {
        var message = `Account created successfully!`;
        console.log(message);
        req.flash("success", message);
        res.location("/login");
        res.redirect("/login");
      }
    });
  }
});

module.exports = router;
