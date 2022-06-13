"use strict";

const router = require("express").Router();
const controller = require("../app/controllers/UserContoller");

router.post("/", controller.createAsync);

module.exports = router;