"use strict";

const router = require("express").Router();
const accountController = require("../app/controllers/AccountController");

router.post("/login", accountController.login);
router.post("/_changePassword",accountController.changePassword);
router.post("/sendPasswordRecoveryEmail",accountController.sendPasswordRecoveryEmail);
router.post("/changePassword",accountController.recoverPassword);


module.exports = router;