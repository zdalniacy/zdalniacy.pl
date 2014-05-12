"use strict";

var companyValidator = require('../../validators/companyValidator');
var offerValidator = require('../../validators/offerValidator');

function areErrors(companyErrors, offerErrors) {
  return (companyErrors && companyErrors.length > 0) ||
    (offerErrors && offerErrors.length > 0);
}

function validate(params) {
  if (!params) {
    throw new Error("Nie przekazano parametrów do addOfferCommand");
  }
  var companyErrors = companyValidator.validate(params.company);
  var offerErrors = offerValidator.validate(params.offer);
  if (areErrors(companyErrors, offerErrors)) {
    return {
      company: companyErrors,
      offer: offerErrors
    };
  }
  return null;
}

function execute(params) {
  return {
    status: true,
    company: {},
    offer: {}
  };
}

module.exports.execute = execute;
module.exports.validate = validate;