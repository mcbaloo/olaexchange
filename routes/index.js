"use strict";

module.exports =(app) => {
    app.use("/v1/user", require("./user"));
};