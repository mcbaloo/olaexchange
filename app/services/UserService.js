"use strict";

const userRepository = require("../repositories/UserRepository");
const userValidator = require("../validators/UserValidator");
const Constants = require("../utils/Constants");
const utils = require("../utils/Helpers");


exports.CreateAsync = async (payload) => {
    const validator = userValidator.validateSchema(payload);
    if (validator) return {
        error: validator,
        statusCode: 422
    };
    
    const salt = utils.generateSalt(10);
    payload.loginProfile.salt = salt;
    payload.loginProfile.password = utils.hash(payload.loginProfile.password,salt);

    const user = await userRepository.findOne({$or:[{email: payload.email},{username: payload.username}]});

    if (user) {
        console.log("username or email exist.");
        return {error: Constants.Messages.DUPLICATE};
    }
    await userRepository.create(payload);
    return {
        data: true,
        statusCode: 201
    };
};

exports.getUsers = async () => {
    const users = await userRepository.Model.find();
    return {
        data: users,
        statusCode:201
    };
};

exports.getUser = async (id) => {
 const user = await userRepository.findById(id);
 return{
    data:user,
    statusCode: 201
 };
};
