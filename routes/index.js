"use strict";

const userRoute = require("./user");

module.exports =(app) => {
    app.use("/v1/user", userRoute);
};