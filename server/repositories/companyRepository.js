"use strict";
var _ = require('lodash');
var Company = require('../models/company');

function create(company) {
  return Company.create(company);
}

module.exports.create = create;