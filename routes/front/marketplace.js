const express = require("express");
const router = express.Router();
const title = "Marketplace";

/********** MODELS **********/
var Product = require("../../models/product");
var User = require("../../models/user");

/********** ROUTES **********/

// MarketPlace route
router.get("/", (req, res) => {
  Product.find((err, items) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      res.render("marketplace", { title: title, items: items });
    }
  });
});

// view items in marketplace
router.get("/view/:_id", (req, res) => {
  var item = req.params._id;
  var query = { _id: item };
  Product.find(query, (err, items) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      items.forEach(item => {
        User.findOne({ _id: item.owner }, (err, user) => {
          if(err) throw Error;
          else{
            item.owner = user.username;
            res.render("view_product", { title: title, items: items });
          }
        });
      });
    }
  });
});

module.exports = router;
