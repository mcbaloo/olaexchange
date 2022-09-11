"use strict";

const { string } = require("joi");
const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

module.exports = mongoose.model("Transaction", new Schema({
    userId : {
    type : String,
    require : true
    },
    product:{
        type: Object,
        require: true
    },
    status:{
        type: String,
        require: true
    },
    manager : {
        type : Object,
        require : true
    },
    unit:{
        type : Number,
        require : true
    },
    amount:{
        type: Number,
        require: true
    },
    dateCreated :{
        type: Date,
        require: true
    },
    exhangeRate : {
        type : Number,
        require : true
    },
    currency : {
      type : String,
      require : true
    },
    transactionType:{
        type : String,
        index : true,
        require : true
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