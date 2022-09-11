"use strict";

const userRoute = require("./user");
const accountRoute = require("./account");
const adminRoute = require("./admin");
const productRoute = require("./product");
const rateRoute = require("./exchangerate");
const transactionRoute = require("./transaction")
module.exports =(app) => {
    app.use("/v1/user", userRoute);
    app.use("/v1/account",accountRoute);
    app.use("/v1/admin",adminRoute);
    app.use("/v1/product",productRoute);
    app.use("/v1/rate",rateRoute);
    app.use("/v1/transaction", transactionRoute)
};