"use strict";

var Subscription = require('../models/subscription');

function create(sbuscription) {
  return Subscription.create(sbuscription);
}

function findOne(criteria) {
  return function (call) {
    Subscription.findOne(criteria, call);
  };
}

function find(criteria) {
  return Subscription.find(criteria).sort('email').exec();
}

function removeAll() {
  return function (call) {
    Subscription.collection.remove(call);
  };
}

function findByIdAndUpdate(id, updatedSubscription) {
  return Subscription.findByIdAndUpdate(id, {$set: updatedSubscription}).exec();
}

module.exports.create = create;
module.exports.findOne = findOne;
module.exports.find = find;
module.exports.removeAll = removeAll;
module.exports.findByIdAndUpdate = findByIdAndUpdate;