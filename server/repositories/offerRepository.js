"use strict";

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

function removeAll(){
  return function(call) {
    Offer.collection.remove(call);
  }
}

module.exports.create = create;
module.exports.findOne = findOne;
module.exports.find = find;
module.exports.removeAll = removeAll;