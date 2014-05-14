"use strict";
var subscriptionRepository = require('../../repositories/subscriptionController');

function * offerList() {
  this.body = yield subscriptionRepository.find();
}

module.exports = {
  offerList: offerList
};
