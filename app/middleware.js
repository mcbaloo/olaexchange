"use strict";
require("dotenv").config();

const jswt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
 const authHeader = req.headers.token;
 if (authHeader) {
    const token = authHeader.split(" ")[1];
   jswt.verify(
       token,
       process.env.ENCRYPTION_KEY,
       (err, user) => {
           if (err) return res.status(403).json('Token is not valid!'+ err);
           req.user = user.user;
           next();
       }
   );
 } else{
     return res.status(401).json('You are not authenticated!');
 }
};

const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req,res, ()=> {
        if (req.user.userId === req.params.id) {
            next();
        }else {
            return res.status(403).json('You are not allow to perform the operation');
        }
       });
};

const verifySuperAdminAuthorization = (req,res,next) => {
    verifyToken(req,res, ()=> {
        if (req.user.role.includes(process.env.SUPERADMIN)) {
            next();
        }else {
            return res.status(403).json('You are not allow to perform the operation');
        }
       });
};

const verifyAdminAuthorization = (req,res,next) => {
    verifyToken(req,res, ()=> {
        if (req.user.role.includes(process.env.SUPERADMIN) || req.user.role.includes(process.env.MANAGER)) {
            next();
        }else {
            return res.status(403).json('You are not allow to perform the operation');
        }
       });
};

module.exports = {verifyTokenAndAuthorization,verifyToken,verifySuperAdminAuthorization,verifyAdminAuthorization};