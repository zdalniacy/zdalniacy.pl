"use strict";

var offerRepository = require('../../repositories/offerRepository');
var statusesManger = require('../../services/offer/offerStatusesManager');
var approveOfferEmailService = require('../../services/offer/approveOfferEmailService');
var tokenGenerator = require('../../services/utils/tokenGenerator');

function validate(params) {
  if (!params.offerId) {
    return [
      {field: "offerId", message: "Id oferty jest wymagane", ruleName: "required"}
    ];
  }
  return null;
}

function * execute(params) {
  var offer = yield offerRepository.findOne({_id: params.offerId});
  var nextStatus = statusesManger.getNextStatus(offer.status);
  var cancellationToken = tokenGenerator.generateToken();

  yield offerRepository.findByIdAndUpdate(offer._id, {
    status: nextStatus,
    closeKey: cancellationToken
  });

  yield approveOfferEmailService.sendApprovedOfferEmailToAuthor({
    title: offer.title,
    email: offer.company.email,
    cancellationToken: cancellationToken
  });
  return {
    _id: offer._id
  };
}

module.exports.execute = execute;
module.exports.validate = validate;