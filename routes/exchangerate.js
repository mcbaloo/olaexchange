"use strict";

const router = require("express").Router();
const controller = require("../app/controllers/ExchangeRateController");
const{verifyTokenAndAuthorization,verifyToken} = require("../app/middleware");

router.post("/", controller.createAsync);
router.post("/edit", controller.updateRate)
router.get("/", controller.getRates);
router.get("/:id", controller.getRate);

module.exports = router;