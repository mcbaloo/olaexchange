"use strict";

const userRoute = require("./user");
const accountRoute = require("./account");
const adminRoute = require("./admin");
module.exports =(app) => {
    app.use("/v1/user", userRoute);
    app.use("/v1/account",accountRoute);
    app.use("/v1/admin",adminRoute);
};