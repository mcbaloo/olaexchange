"use strict";
const Joi = require("joi");
const {validate} = require("../helpers");

exports.validateSchema = (payload) => {
    const schema = {
        fromCurrency: Joi.string().min(1).max(4).required(),
        toCurrency: Joi.string().min(1).max(4).required(),
        conversionRate : Joi.number().required()
    };
    return validate(schema, payload);
}
exports.validateUpdateSchema = (payload) => {
    const schema = {
        fromCurrency: Joi.string().min(1).max(4).required(),
        toCurrency: Joi.string().min(1).max(4).required(),
        conversionRate : Joi.number().required(),
        id : Joi.string().required()
    };
    return validate(schema, payload);
}