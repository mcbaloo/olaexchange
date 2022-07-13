"use strict";

require("dotenv").config();

const userService = require("../services/UserService")
const Constants = require("../utils/Constants");

exports.CreateAsync = async (payload) => {
    if(!payload.role) return{
       error: Constants.Messages.MISSINGROLE,
       statusCode : 400
    };
    if(payload.role.toLowerCase() != process.env.MANAGER) return{
        error: Constants.Messages.INVALIDADMINROLE,
        statusCode : 400
    }
    const response =  await userService.CreateAsync(payload);
    return response;
};
