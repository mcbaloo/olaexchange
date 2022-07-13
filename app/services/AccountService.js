"use strict";
require("dotenv").config();

const userRepository = require("../repositories/UserRepository");
const tokenRepository = require("../repositories/AccountRecoveryTokenRepository");
const accountValidator = require("../validators/AccountValidator");
const notificationService = require("../services/NotificationService");
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

exports.changePassword = async (payload) => {
    const validator = accountValidator.validateChangePasswordModel(payload);
    if(validator){
        return{
            error: validator,
            statusCode: 422
        }
    }
    const user = await userRepository.findOne({email:payload.email});
    if(!user){
        return{
            error: response.Messages.PASSWORDCHANGEFAILED,
            statusCode: 404
        }
    }

    const password = utils.hash(payload.oldPassword,user.loginProfile.salt);
         
    if(password !== user.loginProfile.password) {
        return{
            error: response.Messages.PASSWORDCHANGEFAILED,
            statusCode: 404
        } 
    }

    user.loginProfile.password = utils.hash(payload.password,user.LOGINFAILED.salt);

    await userRepository.upsert({_id:user._id}, user);

    return {
        data: true,
        statusCode: 201
    }
};

exports.sendAccountRecoveryEmail = async (payload) => {
    const user = await userRepository.findOne({email:payload.email});
    if(!user){
        return{
            error: response.Messages.ACCOUNTRECOVERY,
            statusCode: 201
        }
    }
    const model = {token: utils.generateOTP(7), email:payload.email};
    await tokenRepository.create(model);
    const emailContent = process.env.EMAILTEMPLATE.replace("####", model.token);
    await notificationService.sendAsync(emailContent);

    return{
        data:response.Messages.ACCOUNTRECOVERY,
        statusCode:201
    }
};