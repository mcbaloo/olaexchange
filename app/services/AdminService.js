"use strict";


const userService = require("../services/UserService")
const Constants = require("../utils/Constants");
const utils = require("../utils/Helpers");
exports.CreateAsync = async (payload) => {
    if(!payload.role) return{
       error: "role is required",
       statusCode : 400
    };
    if(payload.role.toLowerCase() != "manager") return{
        error: "Invalid role type.Kindly use Mangaer",
        statusCode : 400
    }
    const response =  await userService.CreateAsync(payload);
    return response;
};
