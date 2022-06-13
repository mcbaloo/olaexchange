"use strict";

const userRepository = require("../repositories/UserRepository");
const userValidator = require("../validators/UserValidator");


exports.CreateAsync = async (payload) => {
    const validator =  userValidator.validateSchema(payload);

    if (validator) return {
        error: validator,
        statusCode: 422
    };
    await userRepository.Create(payload);
    return {
        data: true,
        statusCode: 201
    };
}