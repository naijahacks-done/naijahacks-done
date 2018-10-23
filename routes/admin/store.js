const express = require("express");
const router = express.Router();
const address = require("address");
const path = require("path");
const multer = require("multer");
const gm = require("gm");
const title = "Store";
/********** MODELS ****************/
// users model
var Product = require("../../models/product");

/*********** MULTER ENGINE **********/

// Disk Storage for users
const storage = multer.diskStorage({
  destination: "./public/assets/images/products/uploaded/",
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
  let query = { owner: req.user._id };
  Product.find(query, (err, items) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      res.render("admin/store", {
        title: title,
        items: items
      });
    }
  });
});

// POST to register
router.post("/new", upload.single("productImage"), (req, res) => {
  // Assigning variables
  var owner = req.user._id,
    product_name = req.body.product_name,
    description = req.body.description,
    price = req.body.price,
    productImage = req.file.filename,
    creationDate = new Date().toDateString(),
    phone_no = req.user.phone_no;

  // Form validate
  req.checkBody("product_name", "Product name is required!.").notEmpty();
  req.checkBody("description", "Description is required!.").notEmpty();
  req.checkBody("price", "Price is required!.").notEmpty();

  var errors = req.validationErrors();

  // check for errors
  if (errors) {
    console.log(`Errors: ${errors}`);
    res.render("admin/store", {
      title: title,
      name: req.user.full_name,
      category: req.user.category,
      errors: errors
    });
  } else {
    Product.create(
      {
        owner: owner,
        product_name: product_name,
        description: description,
        price: price,
        productImage: productImage,
        creationDate: creationDate,
        phone_no: phone_no
      },
      (err, item) => {
        if (err) throw Error;
        else {
          var message = `Item successfully added!`;
          console.log(message);
          req.flash("success", message);
          res.location("/store");
          res.redirect("/store");
        }
      }
    );
  }
});

module.exports = router;
