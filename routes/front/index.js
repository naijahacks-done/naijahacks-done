const express = require("express");
const router = express.Router();
const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;


/*********************** ROUTES ***************************/

var blogRouter = require("./blog"); // transactions router
router.use("/blog", blogRouter);

var communityRouter = require("./community"); // community router
router.use("/community", communityRouter);

var marketplaceRouter = require("./marketplace"); // products router
router.use("/marketplace", marketplaceRouter);


module.exports = router;
