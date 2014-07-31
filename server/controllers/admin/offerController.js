"use strict";
var offerRepository = require('../../repositories/offerRepository');
var commandInvoker = require('../../commands/commandInvoker');
var invokerParamsFactory = require('../../services/infrastructure/commandInvokerParamsFactory');
var parse = require('co-body');

function * offerList() {
  this.body = yield offerRepository.find();
}

function * addOffer() {
  var invokerParams = yield invokerParamsFactory.createParams(require('../../commands/offer/addOfferCommand'), this);
  invokerParams.commandParams = yield parse(this);
  var result = yield commandInvoker.invoke(invokerParams);
  this.body = result;
}

function * approveOffer() {
  var invokerParams = yield invokerParamsFactory.createParams(require('../../commands/offer/approveOfferCommand'), this);
  invokerParams.commandParams = this.params.id;
  var result = yield commandInvoker.invoke(invokerParams);
  this.body = result;
}

module.exports.offerList = offerList;
module.exports.addOffer = addOffer;
module.exports.approveOffer = approveOffer;
