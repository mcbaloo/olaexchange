"use strict";

const Model = require("../models/AdminModel");
const Repository = require("./BaseDbRepository");

class AdminRepository extends Repository{
    constructor(){
        super(Model);
    }
}

module.exports = (new AdminRepository());