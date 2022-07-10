"use strict";


const userService = require("../services/UserService")
const Constants = require("../utils/Constants");
const utils = require("../utils/Helpers");
exports.CreateAsync = async (payload) => {
    if(!payload.role) return{
       error: Constants.Messages.MISSINGROLE,
       statusCode : 400
    };
    if(payload.role.toLowerCase() != Constants.Messages.MANAGERROLE) return{
        error: Constants.Messages.INVALIDADMINROLE,
        statusCode : 400
    }
    const response =  await userService.CreateAsync(payload);
    return response;
};
