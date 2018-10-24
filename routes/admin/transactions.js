var express = require("express");
var router = express.Router();
const title = "Transactions";

router.get("/", (req, res) => {
  res.render(`dashboard`, {
    title: title
  });
});

module.exports = router;
