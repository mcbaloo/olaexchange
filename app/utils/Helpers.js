"use strict";
require("dotenv").config();
const cryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');

exports.encrypt = (data) => {
    if(!data){
        return;
    }
   const encryptedData = cryptoJS.AES.encrypt(
        data,
        process.env.ENCRYPTION_KEY
     ).toString()

     return encryptedData;
};

exports.decrypt = (ciphertext) => {
    if (!ciphertext){
        return;
    }
    const bytes = cryptoJS.AES.decrypt(ciphertext,process.env.ENCRYPTION_KEY) 
    return bytes.toString(cryptoJS.enc.Utf8);
}

exports.hash = (plainText, salt = "") => {
 if(!plainText) return;
 const hashedText = bcrypt.hashSync(plainText,salt);
 return hashedText;
};

exports.generateSalt = (saltRounds = 10) =>  bcrypt.genSaltSync(saltRounds); 
