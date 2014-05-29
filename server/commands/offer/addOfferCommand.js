"use strict";

var companyValidator = require('../../validators/companyValidator');
var offerValidator = require('../../validators/offerValidator');
var companyRepository = require('../../repositories/companyRepository');
var offerRepository = require('../../repositories/offerRepository');
var dateTimeService = require('../../services/utils/dateTimeService');
var slugService = require('../../services/utils/slugService');
var addOfferEmailService = require('../../services/offer/addOfferEmailService');

function areErrors(companyErrors, offerErrors) {
  return !companyErrors.isValid || !offerErrors.isValid;
}

function validate(params) {
  if (!params) {
    throw new Error("Nie przekazano parametrów do addOfferCommand");
  }
  var companyValidationResult = companyValidator.validate(params.company);
  var offerValidationResult = offerValidator.validate(params.offer);
  if (areErrors(companyValidationResult, offerValidationResult)) {
    return {
      company: companyValidationResult.errors,
      offer: offerValidationResult.errors
    };
  }
  return null;
}

function * createSlug(name) {
  var existingOffer;
  var slug;
  var number = 1;
  var postFix;
  slug = slugService.createSlug(name);
  do {
    postFix = (number > 1) ? number : '';
    existingOffer = yield offerRepository.findOne({slug: slug + postFix});
    number += 1;
  } while (existingOffer !== null);
  return slug + postFix;
}

function prepareOffer(params, company, slug) {
  var offer = params.offer;
  offer.company = company;
  offer.createDate = dateTimeService.toUtc(dateTimeService.getNow());
  offer.slug = slug;
  offer.status = "WAITING_FOR_APPROVAL";
}

function createResult(company, offer) {
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

function * execute(params) {
  var company;
  company = yield companyRepository.findOne(params.company);
  if (!company) {
    company = yield companyRepository.create(params.company);
  }

  var slug = yield createSlug(params.offer.name);
  prepareOffer(params, company, slug);
  var offer = yield offerRepository.create(params.offer);
  yield addOfferEmailService.sendOfferWasAddedConfirmEmail(offer, company);
  yield addOfferEmailService.notifyModeratorsOfferWasAdded(offer, company, params.request);
  return createResult(company, offer);
}

module.exports.execute = execute;
module.exports.validate = validate;