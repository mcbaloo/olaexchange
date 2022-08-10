"use strict";
const Joi = require("joi");
const {validate} = require("../helpers");

exports.validateSchema = (payload) => {
    const schema = {
        productName: Joi.string().min(1).max(50).required(),
        unitPrice: Joi.number().required()
    };
    return validate(schema, payload);
}

exports.validateProductUpdate = (payload) => {
    const schema = {
        productName: Joi.string().min(1).max(50).required(),
        unitPrice: Joi.number().required(),
        id : Joi.string().required(),
        isActive : Joi.boolean().required()
    };
    return validate(schema, payload);
}
