"use strict"

require("./lib/database");

const express = require("express");
const app = express();

app.listen(3000,()=> console.log("started"));