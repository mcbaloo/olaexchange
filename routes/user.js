"use strict";

const router = require("express").Router();
const controller = require("../app/controllers/UserContoller");

router.post("/", controller.createAsync);
router.get("/:id", controller.getUser);
router.get("/", controller.getUsers);

module.exports = router;