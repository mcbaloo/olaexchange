"use strict";

const Model = require("../models/UserModel");
const Repository = require("./BaseDbRepository");

class UserRepository extends Repository{
    constructor(){
        super(Model);
    }
}

module.exports = (new UserRepository());