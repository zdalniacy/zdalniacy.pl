"use strict";

var nodemailer = require("nodemailer");
var config = require('../../config/config').getConfig();

var smtpTransport = nodemailer.createTransport("SMTP", {
  host: config.email.server,
  secureConnection: false,
  port: 587,
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
});


function sendEmail(params) {
  return function (call) {
    smtpTransport.sendMail(params, call);
  };
}

//{
//  from: "Fred Foo ✔ <foo@blurdybloop.com>", // sender address
//  to: "bar@blurdybloop.com, baz@blurdybloop.com", // list of receivers
//  subject: "Hello ✔", // Subject line
//  text: "Hello world ✔", // plaintext body
//  html: "<b>Hello world ✔</b>" // html body
//}
module.exports.sendEmail = sendEmail;