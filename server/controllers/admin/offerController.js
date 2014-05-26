"use strict";
var offerRepository = require('../../repositories/offerRepository');
var commandInvoker = require('../../commands/commandInvoker');
var parse = require('co-body');

function * offerList() {
  this.body = yield offerRepository.find();
}

function * addOffer() {
  var body = yield parse(this);
  body.request = {
    host: this.host,
    protocol: this.protocol
  };
  var invokerParams = {
    command: require('../../commands/offer/addOfferCommand'),
    commandParams: body
  };

  var result = yield commandInvoker.invoke(invokerParams);
  this.body = result;
}

module.exports.offerList = offerList;
module.exports.addOffer = addOffer;
