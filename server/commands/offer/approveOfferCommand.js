"use strict";

var offerRepository = require('../../repositories/offerRepository');

function validate(params) {
  if (!params.offerId) {
    return [
      {field: "offerId", message: "Id oferty jest wymagane", ruleName: "required"}
    ];
  }
  return null;
}


function * execute(params) {
//  var offer = yield offerRepository.findOne({_id: params.offerId});
}

module.exports.execute = execute;
module.exports.validate = validate;