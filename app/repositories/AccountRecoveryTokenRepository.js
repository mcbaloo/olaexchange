"use strict";

const Model = require("../models/AccountRecoveryToken");
const Repository = require("./BaseDbRepository");

class AccountRecoveryTokenRepository extends Repository{
    constructor(){
        super(Model);
    }
}

module.exports = (new AccountRecoveryTokenRepository());