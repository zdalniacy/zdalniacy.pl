"use strict";
var _ = require('lodash');
var Offer = require('../models/offer');

function create(offer) {
  return Offer.create(offer);
}

function findOne(criteria) {
  return function (call) {
    Offer.findOne(criteria, call);
  };
}

function find(criteria) {
  return Offer.find(criteria).sort('title').exec();
}

function removeAll() {
  return function (call) {
    Offer.collection.remove(call);
  };
}

function getUpdateOfferObject(updatedOffer) {
  var update = _.clone(updatedOffer);
  if (updatedOffer.transaction) {
    delete update.transaction;
    _.each(updatedOffer.transaction, function (value, key) {
      update['transaction.' + key] = value;
    });
  }
  return {$set: update};
}

function findByIdAndUpdate(id, updatedOffer) {
  var update = getUpdateOfferObject(updatedOffer);
  return Offer.findByIdAndUpdate(id, update).exec();
}

module.exports.create = create;
module.exports.findOne = findOne;
module.exports.find = find;
module.exports.removeAll = removeAll;
module.exports.findByIdAndUpdate = findByIdAndUpdate;