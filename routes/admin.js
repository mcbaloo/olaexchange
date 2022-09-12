"use strict";

const router = require("express").Router();
const adminController = require("../app/controllers/AdminController");
const{verifySuperAdminAuthorization} = require("../app/middleware");

router.use(verifySuperAdminAuthorization);
router.post("/", adminController.createAsync);

module.exports = router;