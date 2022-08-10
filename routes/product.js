"use strict";

const router = require("express").Router();
const controller = require("../app/controllers/ProductController");
const{verifyTokenAndAuthorization,verifyToken} = require("../app/middleware");

router.post("/", controller.createAsync);
router.post("/edit", controller.updateProduct)
router.get("/active", controller.getActiveProducts);

router.get("/", controller.getProducts);
router.get("/:id", controller.getProduct);

module.exports = router;