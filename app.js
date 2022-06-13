"use strict"

require("./lib/database");
require("dotenv").config();

const express = require("express");
const app = express();

//routes
require("./routes")(app);

// catch 404 and forward to error handler
app.use((req, res) => {
    return res.status(404).json({error: `${req.method} ${req.url} not found`});
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    console.log(err.message, (new Error(err)).stack, {
        status: err.status,
        url: req.url
    });
    // console.log(err);
    res.status(err.status || 500);
    res.send({error: err.message});
});

app.listen(process.env.PORT,()=> console.log("started"));