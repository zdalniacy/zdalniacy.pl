"use strict";

var validator = require('./validator');

var validationRules = {
  title: ["required"],
  description: ["required"],
  salaryStart: ['required', 'float'],
  salaryEnd: ['required', 'float']
};

function validate(offer) {
  return validator.validate(validationRules, offer);
}

module.exports.validate = validate;