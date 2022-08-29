"use strict";

const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

module.exports = mongoose.model("ExchangeRate", new Schema({
    fromCurrency :{
        type: String,
        require: true
    },
    toCurrency:{
        type: String,
        require: true
    },
    conversionRate:{
        type: Number,
        index: true,
        require: true
    },
    dateCreated :{
        type: Date,
        require: true
    }
},{
    toJSON: {
        transform: function (doc, ret) {
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
           
        }
    },
    timestamps: true
}
));