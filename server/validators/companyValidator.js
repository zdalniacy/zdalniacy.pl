"use strict";

var validator = require('./validator');

var comapnyValidationRules = {
  name: ["required"],
  url: ["url"],
  phone: ["phone"],
  email: ["email"]
};


function validate(company) {
  return validator.validate(comapnyValidationRules, company);
}

module.exports.validate = validate;