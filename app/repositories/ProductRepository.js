"use strict";

const Model = require("../models/ProductModel");
const Repository = require("./BaseDbRepository");

class ProductRepository extends Repository{
    constructor(){
        super(Model);
    }
}

module.exports = (new ProductRepository());