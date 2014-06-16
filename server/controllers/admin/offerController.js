"use strict";
var offerRepository = require('../../repositories/offerRepository');
var commandInvoker = require('../../commands/commandInvoker');
var invokerParamsFactory = require('../../services/infrastructure/commandInvokerParamsFactory');

function * offerList() {
  this.body = yield offerRepository.find();
}

function * addOffer() {
  var invokerParams = yield invokerParamsFactory.createParams(require('../../commands/offer/addOfferCommand'), this);
  var result = yield commandInvoker.invoke(invokerParams);
  this.body = result;
}

function * approveOffer(){

}

module.exports.offerList = offerList;
module.exports.addOffer = addOffer;
module.exports.approveOffer = approveOffer;
