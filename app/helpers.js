"use strict";
const Joi = require("joi");

exports.validate = (schema, payload) => {
    schema = Joi.object(schema);
    const {error} = schema.validate(payload, {
        allowUnknown: true,
    });

    if (error)
        return error.details[0].message.replace(/['"]/g, "");

    return null;
};