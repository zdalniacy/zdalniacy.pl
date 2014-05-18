"use strict";

var _ = require('lodash'),
  validator = require('validator');


function createValidationError(fieldName, message, type) {
  return {field: fieldName, message: message, ruleName: type};
}

function required(fieldName, obj) {
  if (!obj[fieldName]) {
    return false;
  }
  return true;
}

function url(value) {
  return validator.isURL(value);
}

function phone(value) {
  return validator.matches(value, /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/);
}

function email(value) {
  return validator.isEmail(value);
}

function getValidationMethod(rule) {
  return function (fieldName, obj) {
    var value = obj[fieldName];
    if (value) {
      if (value.trim) {
        value = value.trim();
      }
      return rule(value);
    }
    return true;
  };
}

function float(value) {
  return validator.isFloat(value);
}

var validationMethods = {
  required: {
    method: required,
    message: 'Pole jest wymagane'
  },
  url: {
    method: getValidationMethod(url),
    message: 'Nieprawidłowy adres url'
  },
  phone: {
    method: getValidationMethod(phone),
    message: 'Nieprawidłowy numer telefonu'
  },
  email: {
    method: getValidationMethod(email),
    message: 'Nieprawidłowy adres email'
  },
  float: {
    method: getValidationMethod(float),
    message: 'Pole musi być liczbą'
  }
};


function checkObject(object) {
  if (!object) {
    throw new Error("Nie przekazano obiektu do walidacji");
  }
}

function validate(rules, obj) {
  checkObject(obj);

  var errors = [];
  _.each(rules, function (rulesForField, fieldName) {
    _.each(rulesForField, function (ruleName) {
      var rule = validationMethods[ruleName];
      var passed = rule.method(fieldName, obj);
      if (!passed) {
        errors.push(createValidationError(fieldName, rule.message, ruleName));
      }
    });
  });
  return errors;
}

module.exports.validate = validate;