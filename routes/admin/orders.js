const express = require("express");
const router = express.Router();
const title = "Orders";


// GET Profile route
router.get("/orders", (req, res) => {
    res.render("dashbaord", {
        title: title
    });
});

module.exports = router;
