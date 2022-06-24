"use strict";

const userRoute = require("./user");
const accountRoute = require("./account");

module.exports =(app) => {
    app.use("/v1/user", userRoute);
    app.use("/v1/account",accountRoute);
};