"use strict";

var emailService = require('../infrastructure/emailService');
var util = require('util');
var views = require('co-views');
var rootPath = require('../../config/config').getConfig().rootPath;
var render = views(rootPath + '/server/views/emailViews', { ext: 'ejs' });

function getSendOfferWasAddedConfirmEmailOptions(email, content) {
  return {
    to: email,
    subject: 'Potwierdzenie przyjęcia oferty',
    html: content
  };
}

function * sendOfferWasAddedConfirmEmail(offer, company) {
  var content = yield render('confirmAddNewOffer', { offer: offer });
  var emailOptions = getSendOfferWasAddedConfirmEmailOptions(company.email, content);
  yield emailService.sendNoReplyEmail(emailOptions);
}

function getNotifyModeratorsEmailTitle(offer) {
  return util.format('Dodano ofertę %s (%s)', offer.title, offer._id);
}

function getTags(tags) {
  if (tags) {
    return tags.join(', ');
  }
  return "";
}

var approveOfferPath = "/offer/approve/";

function getApproveUrl(offer, context) {
  return context.getApplicationUrl() + approveOfferPath + offer._id;
}

function getObjectForView(offer, company, request) {
  var offerObject = offer.toObject();
  offerObject.tags = getTags(offer.tags);

  return {
    offer: offerObject,
    company: company,
    approveUrl: getApproveUrl(offer, request)
  };
}

function getNotifyModeratorsOfferWasAddedOptions(offer, content) {
  return  {
    subject: getNotifyModeratorsEmailTitle(offer),
    html: content
  };
}

function * notifyModeratorsOfferWasAdded(offer, company, request) {
  var viewModel = getObjectForView(offer, company, request);
  var content = yield render('notifyOfferWasAdded', viewModel);
  var emailOptions = getNotifyModeratorsOfferWasAddedOptions(offer, content);
  yield emailService.sendEmailToModerators(emailOptions);
}

module.exports.sendOfferWasAddedConfirmEmail = sendOfferWasAddedConfirmEmail;
module.exports.notifyModeratorsOfferWasAdded = notifyModeratorsOfferWasAdded;