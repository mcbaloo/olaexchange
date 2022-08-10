"use strict";

const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

module.exports = mongoose.model("Product", new Schema({
    productName:{
        type: String,
        require: true
    },
    unitPrice:{
        type: Number,
        require: true
    },
    currency:{
        type: String,
        index: true,
        require: true
    },
    dateCreated :{
        type: Date,
        require: true
    },
    isActive:{
        type : Boolean,
        index : true,
        require : true
    }
}
));