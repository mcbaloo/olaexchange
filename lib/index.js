"use strict";

require("./database");
module.exports = (app, express) => {
    require("./middleware")(app, express);
};
