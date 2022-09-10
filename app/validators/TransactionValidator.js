"use strict";
const Joi = require("joi");
const {validate} = require("../helpers");

exports.validateSchema = (payload) => {
    const schema = {
        userId : Joi.string().required(),
        productId: Joi.string().required(),
        managerId : Joi.string().required(),
        unit: Joi.number().positive().greater(0).required(),
        exchangeRateId : Joi.string().required(),
        transactionType : Joi.string().valid('buy').required(),
        amount : Joi.number().positive().greater(0).required()
    };
    return validate(schema, payload);
}

