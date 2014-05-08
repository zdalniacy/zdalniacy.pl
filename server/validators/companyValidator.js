"use strict";

var validator = require('./validator');

var validationRules = {
  name: ["required"],
  url: ["url"],
  phone: ["phone"],
  email: ["email"]
};


function validate(company) {
  return validator.validate(validationRules, company);
}

module.exports.validate = validate;