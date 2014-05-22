"use strict";

var _ = require('lodash'),
  validator = require('validator');


function escape(fieldName, obj) {
  obj[fieldName] = validator.escape(obj[fieldName]);
}

var sanitizeMethods = {
  escape: {
    method: escape
  }
};


function checkObject(object) {
  if (!object) {
    throw new Error("Nie przekazano obiektu do sanityzacji");
  }
}

function sanitize(rules, obj) {
  checkObject(obj);

  var errors = [];
  _.each(rules, function (rulesForField, fieldName) {
    _.each(rulesForField, function (ruleName) {
      var rule = sanitizeMethods[ruleName];
      rule.method(fieldName, obj);
    });
  });
  return errors;
}

module.exports.sanitize = sanitize;