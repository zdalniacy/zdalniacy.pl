"use strict";

var nodemailer = require("nodemailer");
var config = require('../../config/config').getConfig();
var util = require('util');

var smtpTransport = nodemailer.createTransport("SMTP", {
  host: config.email.server,
  secureConnection: false,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
});


function sendEmail(params) {
  if (!params.text) {
    params.generateTextFromHTML = true;
  }

  return function (call) {
    smtpTransport.sendMail(params, call);
  };
}

function getNoReplyEmail() {
  return util.format("Zdalniacy <%s>", config.email.noReplyEmail);
}

function sendNoReplyEmail(params) {
  params.from = getNoReplyEmail();
  return sendEmail(params);
}

function getModeratorEmails() {
  return config.email.moderatorEmails.join(', ');
}

function sendEmailToModerators(params) {
  params.to = getModeratorEmails();
  return sendNoReplyEmail(params);
}

//{
//  from: "Fred Foo ✔ <foo@blurdybloop.com>", // sender address
//  to: "bar@blurdybloop.com, baz@blurdybloop.com", // list of receivers
//  subject: "Hello ✔", // Subject line
//  text: "Hello world ✔", // plaintext body
//  html: "<b>Hello world ✔</b>", // html body
//  generateTextFromHTML: ''if set to true uses HTML to generate plain text body part from the HTML if the text is not defined
//}
module.exports.sendEmail = sendEmail;
module.exports.sendNoReplyEmail = sendNoReplyEmail;
module.exports.sendEmailToModerators = sendEmailToModerators;
