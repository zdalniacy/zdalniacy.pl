"use strict";

const { v1: uuidv1 } = require('uuid');

function generateToken() {
  return uuidv1();
}

module.exports.generateToken = generateToken;