"use strict";

var validator = require('./validator');
var sanitizer = require('./sanitizer');

var validationRules = {
  name: ["required"],
  url: ["url"],
  phone: ["phone"],
  email: ["email"]
};


var sanitizeRules = {
  name: ["escape"]
};

function validate(company) {
  var result = validator.validate(validationRules, company);
  if (result.isValid) {
    sanitizer.sanitize(sanitizeRules, company);
  }
  return result;
}

module.exports.validate = validate;