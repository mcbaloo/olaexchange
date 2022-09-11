"use strict";

const Model = require("../models/TransactionModel");
const Repository = require("./BaseDbRepository");

class TransactionRepository extends Repository{
    constructor(){
        super(Model);
    }
}

module.exports = (new TransactionRepository());