"use strict";

const router = require("express").Router();
const adminController = require("../app/controllers/AdminController");

router.post("/", adminController.createAsync);

module.exports = router;