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
        index: true,
        require: true
    },
    phoneNumber:{
        type: String,
        require: true
    },
    email:{
        type: String,
        index: true,
        require: true
    },
    loginProfile:{
        type: Object,
        default:{},
        require: true
    },
    role :{
        type : Array,
        default: "",
        index : true,
        require : true
    },
    isActive:{
        type : Boolean,
        index : true,
        require : true
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