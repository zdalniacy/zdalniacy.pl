"use strict";

var companyValidator = require('../../validators/companyValidator');
var offerValidator = require('../../validators/offerValidator');
var companyRepository = require('../../repositories/companyRepository');
var offerRepository = require('../../repositories/offerRepository');
var dateTimeService = require('../../services/utils/dateTimeService');

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

function * execute(params) {

  var company = yield companyRepository.create(params.company);

  params.offer.company = company;
  params.offer.createDate = dateTimeService.toUtc(dateTimeService.getNow());

  var offer = yield offerRepository.create(params.offer);

  return {
    status: true,
    company: {
      _id: company._id
    },
    offer: {
      _id: offer._id
    }
  };
}

module.exports.execute = execute;
module.exports.validate = validate;