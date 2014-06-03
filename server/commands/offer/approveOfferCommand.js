"use strict";

var offerRepository = require('../../repositories/offerRepository');
var statusesManger = require('../../services/offer/offerStatusesManager');

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
  yield offerRepository.findByIdAndUpdate(offer._id, {status: nextStatus });
  return {
    _id: offer._id
  };
}

module.exports.execute = execute;
module.exports.validate = validate;