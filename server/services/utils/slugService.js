"use strict";

var getSlug = require('speakingurl');

function createSlug(value) {
  return getSlug(value);
}

module.exports.createSlug = createSlug;