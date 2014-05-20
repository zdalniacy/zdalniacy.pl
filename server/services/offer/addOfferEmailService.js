"use strict";

var emailService = require('../infrastructure/emailService');
var util = require('util');


var confirmEmailContent = {
  subject: 'Potwierdzenie żłozenia oferty',
  html: "<p>Potwierdzenie złożenia oferty o tytule <b>%s</b>. " +
    "Oferta oczekuję na akceptację. Poinformujęmy Cię gdy zostanie zaakceptowana</p>" +
    "<p>Proszę nie odpowiadać na tę wiadomość.</p>"
};

function getSendOfferWasAddedConfirmEmailOptions(offer, company) {
  return {
    to: company.email,
    subject: confirmEmailContent.subject,
    html: util.format(confirmEmailContent.html, offer.title),
    generateTextFromHTML: true
  };
}

function sendOfferWasAddedConfirmEmail(offer, company) {
  var emailOptions = getSendOfferWasAddedConfirmEmailOptions(offer, company);
  return emailService.sendNoReplyEmail(emailOptions);
}

function sendEmailToAdminOfferWasAdded() {

}

module.exports.sendOfferWasAddedConfirmEmail = sendOfferWasAddedConfirmEmail;
module.exports.sendEmailToAdminOfferWasAdded = sendEmailToAdminOfferWasAdded;