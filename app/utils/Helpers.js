"use strict";
require('dotenv').dotenv.config();
const cryptoJS = require('crypto-js');

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
    const bytes = cryptoJS.decrypt(ciphertext,process.env.ENCRYPTION_KEY) 
    return bytes.toString(cryptoJS.enc.Utf8);
}
