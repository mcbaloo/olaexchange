"use strict";

const mongoose = require("mongoose");


mongoose.set("debug", true);

const mongodbUrl = `${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}/?retryWrites=true&w=majority`;

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.Promise = global.Promise;
let db = mongoose.connection;

db.on("connected", () => {
    console.log("mongodb connected", {});
});

db.on("error", (error) => {
    console.log(error);
    process.exit(0);
});