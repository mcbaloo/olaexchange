"use strict";

const userRepository = require("../repositories/UserRepository");
const accountValidator = require("../validators/AccountValidator");
const response = require("../utils/Constants");
const utils = require("../utils/Helpers");

exports.login = async (payload) => {
    const validator = accountValidator.validate(payload);
    if(validator){
        return{
            error: validator,
            statusCode: 422
        }
    }

    const user = await userRepository.findOne({email:payload.email});
    if(!user){
        return{
            error: response.Messages.LOGINFAILED,
            statusCode: 401
        }
    }
    const password = utils.encrypt(user.loginProfile.password);
     
    if(password !== user.loginProfile.password) {
        return{
            error: response.Messages.LOGINFAILED,
            statusCode: 401
        } 
    }
    return {
        data: true,
        statusCode: 201
    }
};