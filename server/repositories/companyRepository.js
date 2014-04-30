"use strict";
var _ = require('lodash');
var Company = require('../models/company');

function create(company) {
  return Company.create(company);
}

function findOne(criteria) {
  return Company.findOne(criteria).exec();
}

module.exports.create = create;
module.exports.findOne = findOne;