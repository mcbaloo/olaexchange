"use strict";
require("dotenv").config();


const nodemailer = require("nodemailer");

exports.sendAsync = async (payload,isHTML = false) => 
{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SENDER,
          pass: process.env.AUTH
        }
      });


      var mailOptions = {
        from:  process.env.SENDER,
        to: payload.receiver,
        subject: payload.subject
      };

      if (isHTML)
        mailOptions.html = payload.body
       else
        mailOptions.text = payload.body;
      

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
};
