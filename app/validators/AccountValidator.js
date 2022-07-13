"use strict";

const Joi = require("joi");
const {validate} = require("../helpers");

exports.validate = (payload) =>{
    const schema = {
        email: Joi.string().
        email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).required(),
        password: Joi.string().required()
    };
    return validate(schema,payload);
};

exports.validateChangePasswordModel = (payload) => {
    const schema = {
        email: Joi.string().
        email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).required(),
        password: Joi.string().required(),
        oldPassword: Joi.string().required()

    };
    return validate(schema,payload);
};

exports.validatePasswordRecoveryModel = (payload) => {
    const schema = {
        email: Joi.string().
        email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).required(),
        password: Joi.string().required(),
        token: Joi.string().required(),

    };
    return validate(schema,payload);
};