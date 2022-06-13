"use strict";

const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

module.exports = mongoose.model("User", new Schema({
    firstname:{
        type: String,
        require: true
    },
    lastname:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true
    },
    phoneNumber:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    loginProfile:{
        type: Object,
        default:{},
        require: true
    }
}));