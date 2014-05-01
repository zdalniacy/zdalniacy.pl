"use strict";
var offerRepository = require('../../repositories/offerRepository');

function * offerList() {
  this.body = yield offerRepository.find();
}

module.exports = {
  offerList: offerList
};
