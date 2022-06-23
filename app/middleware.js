"use strict";
require("dotenv").config();

const jswt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
 const authHeader = req.headers.token;
 if (authHeader) {
    console.log(authHeader);
    const token = authHeader.split(" ")[1];
   jswt.verify(
       token,
       process.env.ENCRYPTION_KEY,
       (err, user) => {
           if (err) return res.status(403).json('Token is not valid!'+ err);
           req.user = user;
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

module.exports = {verifyTokenAndAuthorization,verifyToken};