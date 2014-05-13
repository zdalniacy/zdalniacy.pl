"use strict";

var moment = require('moment');

function getNow() {
  return new Date();
}

function toUtc(date) {
  return moment(date).utc();
}

module.exports.getNow = getNow;
module.exports.toUtc = toUtc;