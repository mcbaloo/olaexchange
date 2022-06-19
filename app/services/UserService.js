"use strict";

const userRepository = require("../repositories/UserRepository");
const userValidator = require("../validators/UserValidator");
const Constants = require("../utils/Constants");


exports.CreateAsync = async (payload) => {
    const validator = userValidator.validateSchema(payload);
    if (validator) return {
        error: validator,
        statusCode: 422
    };

    const user = await userRepository.findOne({$or: [{username: payload.username, email: payload.email}]});

    if (user) {
        console.log("username or email exist.");
        return {data: Constants.Messages.DUPLICATE};
    }
    await userRepository.create(payload);
    return {
        data: true,
        statusCode: 201
    };
}
