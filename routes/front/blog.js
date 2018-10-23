var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.send('<center><h1 style="color: #ddd; font-family: "roboto";">Still working out!</h1></center>');
});

module.exports = router;
