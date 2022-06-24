"use strict";
require("dotenv").config();

const userRepository = require("../repositories/UserRepository");
const accountValidator = require("../validators/AccountValidator");
const response = require("../utils/Constants");
const utils = require("../utils/Helpers");
const jwt = require("jsonwebtoken");

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

    const password = utils.hash(payload.password,user.loginProfile.salt);
         
    if(password !== user.loginProfile.password) {
        return{
            error: response.Messages.LOGINFAILED,
            statusCode: 401
        } 
    }
    const {loginProfile, ...others} = user._doc;

    const token = jwt.sign({
        user: others,
    },process.env.ENCRYPTION_KEY,{expiresIn: "5m"});

    return {
        data: token,
        statusCode: 201
    }
};