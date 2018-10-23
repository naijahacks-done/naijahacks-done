const express = require("express");
const router = express.Router();
const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;


// GET Profile route
router.get("/orders", (req, res) => {
    res.render("account", {
        title: 'Orders',
        name: req.user.full_name,
        category: req.user.category
    });
});

module.exports = router;
