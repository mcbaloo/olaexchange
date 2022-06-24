"use strict";

const router = require("express").Router();
const accountController = require("../app/controllers/AccountController");

router.post("/login", accountController.login);

module.exports = router;