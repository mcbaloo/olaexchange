"use strict";

require("dotenv").config();

const mongoose = require("mongoose");


mongoose.set("debug", true);

 const mongodbUrl = `${process.env.MONGODB_URL}`;

mongoose.connect(mongodbUrl, {useNewUrlParser: true});

mongoose.Promise = global.Promise;
let db = mongoose.connection;

db.on("connected", () => {
    console.log("mongodb connected", {});
});

db.on("error", (error) => {
    console.log(error);
    process.exit(0);
});