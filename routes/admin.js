const express = require("express");
const router = express.Router();
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

/*********************** ROUTES ***************************/

var transRouter = require("./admin/transactions"); // transactions router
router.use("/transactions", transRouter);

var storeRouter = require("./admin/store"); // store router
router.use("/store", storeRouter);

var ordersRouter = require("./admin/orders"); // orders router
router.use("/orders", ordersRouter);

var partnersRouter = require("./admin/partners"); // partners router
router.use("/partners", partnersRouter);


module.exports = router;
