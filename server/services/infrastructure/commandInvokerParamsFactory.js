"use strict";

var parse = require('co-body');
var router = require('../../routes/routes');

function createContext(httpContext) {
  return {
    getApplicationUrl: function () {
      return httpContext.protocol + "://" + httpContext.host;
    }
  };
}

function * createParams(command, httpContext) {
  var commandParams = yield parse(httpContext);
  commandParams.context = createContext(httpContext);

  var invokerParams = {
    command: command,
    commandParams: commandParams
  };
  return invokerParams;
}

module.exports.createParams = createParams;

