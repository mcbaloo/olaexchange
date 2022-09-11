"use strict";

const router = require("express").Router();
const controller = require("../app/controllers/TransactionController");
const{verifyTokenAndAuthorization,verifyToken} = require("../app/middleware");

router.post("/", controller.createAsync);

module.exports = router;