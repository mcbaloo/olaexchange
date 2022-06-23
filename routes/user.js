"use strict";

const router = require("express").Router();
const controller = require("../app/controllers/UserContoller");
const{verifyTokenAndAuthorization,verifyToken} = require("../app/middleware");

router.post("/", controller.createAsync);

router.use(verifyToken);
router.get("/", controller.getUsers);

router.use(verifyTokenAndAuthorization);
router.get("/:id", controller.getUser);

module.exports = router;