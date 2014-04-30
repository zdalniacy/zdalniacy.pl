"use strict";
var Company = require('../models/company');

function create(company) {
  return Company.create(company);
}

function findOne(criteria) {
  return Company.findOne(criteria).exec();
}

function find(criteria) {
  return Company.find(criteria).sort('name').exec();
}


function removeAll() {
  return function (call) {
    Company.collection.remove(call);
  };
}

module.exports.create = create;
module.exports.findOne = findOne;
module.exports.find = find;
module.exports.removeAll = removeAll;