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

exports.forgotPassword = async (payload) => {
    const validator = accountValidator.validatePasswordRecoveryModel(payload);
    if(validator){
        return{
            error: validator,
            statusCode: 422
        }
    }

    const token =  await tokenRepository.findOne({$and:[{token:payload.token},{email:payload.email}]});

    if(!token) {
        return {
            error:response.Messages.ACCOUNTRECOVERYERROR,
            statusCode:404
        }
    }
    const expiryDate = new Date();

    if(token._doc.createdAt < expiryDate.setMinutes(-5)) {
        return {
            error:response.Messages.OTPEXPIRED,
            statusCode:404
        }
    }
    
    const user = await userRepository.findOne({email:token.email});

    if(!user){
        return {
            error:response.Messages.ACCOUNTRECOVERYERROR,
            statusCode:404
        }
    }

    user.loginProfile.password = utils.hash(payload.password,user.loginProfile.salt);

    await userRepository.upsert({_id:user._id},user);

    //set the created time to the last 10 hours to render the token reusable
    token._doc.createdAt.SetHours(-10)
    await tokenRepository.upsert({_id:token._id}, token);

    return{
        data: true,
        statusCode:201
    }
};