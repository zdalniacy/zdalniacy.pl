"use strict";

var emailService = require('../infrastructure/emailService');
var util = require('util');
var views = require('co-views');
var rootPath = require('../../config/config').getConfig().rootPath;
var render = views(rootPath + '/server/views/emailViews', { ext: 'ejs' });

function getSendApprovedOfferEmailToAuthor(email, content) {
  return {
    to: email,
    subject: 'Oferta została zatwierdzona',
    html: content
  };
}
/*
 title,
 email
 cancellationToken
 */
function * sendApprovedOfferEmailToAuthor(options) {
  var content = yield render('approvedOfferEmailToAuthor', {
    title: options.title,
    cancellationToken: options.cancellationToken
  });
  var emailOptions = getSendApprovedOfferEmailToAuthor(options.email, content);
  yield emailService.sendNoReplyEmail(emailOptions);
}

module.exports.sendApprovedOfferEmailToAuthor = sendApprovedOfferEmailToAuthor;