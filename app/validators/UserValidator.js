"use strict";

const Joi = require("joi");
const {validate} = require("../helpers");

exports.validateSchema = (payload) => {
    const schema = {
        firstname: Joi.string().min(3).max(30).required(),
        lastname: Joi.string().min(3).max(30).required(),
        username: Joi.string().min(3).max(30).required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).required(),
        loginProfile: Joi.object().keys({
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        })
    };
    return validate(schema, payload);
}
