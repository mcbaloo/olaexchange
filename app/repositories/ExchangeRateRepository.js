"use strict";

const Model = require("../models/ExchangeRateModel");
const Repository = require("./BaseDbRepository");

class ExchangeRateRepository extends Repository{
    constructor(){
        super(Model);
    }
}

module.exports = (new ExchangeRateRepository());