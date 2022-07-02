"use strict";

const accountService = require("../services/AccountService");
const response = require("../utils/responses");

exports.login = async (req, res) => {
 const {
    error,
    data,
    statusCode
 } = await accountService.login(req.body);
 if(error) return response.error(res, error, statusCode);

 return response.success(res, data, statusCode);

};

exports.changePassword = async (req, res) => {
   const {
      error,
      data,
      statusCode
   } = await accountService.changePassword(req,body);
   
   if(error) return response.error(res, error, statusCode);

 return response.success(res, data, statusCode);
};