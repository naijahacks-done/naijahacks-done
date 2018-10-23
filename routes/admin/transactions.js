var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render(`transactions`, {
    title: "Transactions",
    name: req.user.full_name,
    category: req.user.category
  });
});

module.exports = router;
