"use strict";

const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

module.exports = mongoose.model("Tokens", new Schema({
    token:{
        type: String,
        require: true,
        index: true
    },
    email:{
        type: String,
        index: true,
        require: true
    }  
},{
    toJSON: {
        transform: function (doc, ret) {
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
            delete ret._id;
        }
    },
    timestamps: true
}
));