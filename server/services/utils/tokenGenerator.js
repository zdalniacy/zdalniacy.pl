"use strict";

var uuid = require('node-uuid');

function generateToken() {
  return uuid.v1();
}

module.exports.generateToken = generateToken;