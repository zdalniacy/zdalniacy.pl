"use strict";
var offerRepository = require('../../repositories/offerRepository');

function * offerList() {
  this.body = yield offerRepository.find();
}

function * offerDetail() {
  this.body = yield offerRepository.findBy();
}

module.exports.offerList = offerList;
module.exports.offerDetail = offerDetail;
