"use strict";

var Offer = require('../models/offer');

function create(offer) {
  return Offer.create(offer);
}

module.exports.create = create;