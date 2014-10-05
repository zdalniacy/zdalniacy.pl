"use strict";

var validator = require('./validator');
var sanitizer = require('./sanitizer');

var validationRules = {
  title: ["required"],
  description: ["required"],
  salaryStart: ['required', 'float'],
  salaryEnd: ['required', 'float']
};

var sanitizeRules = {
  title: ["escape"],
  description: ["escape"]
};

function areErrors(array) {
  return array && array.length > 0;
}

function validate(offer) {
  var result = validator.validate(validationRules, offer);
  if (result.isValid) {
    sanitizer.sanitize(sanitizeRules, offer);
  }
  return result;
}

module.exports.validate = validate;