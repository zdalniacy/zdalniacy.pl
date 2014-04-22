"use strict";

var Offer = require('../models/offer');

function create(offer) {
  return Offer.create(offer);
}

function findOne(query) {
  return function (call) {
    Offer.findOne(query, call);
  };
}

module.exports.create = create;
module.exports.findOne = findOne;