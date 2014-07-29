"use strict";

var parse = require('co-body');

function createContext(httpContext) {
  return {
    getApplicationUrl: function () {
      return httpContext.protocol + "://" + httpContext.host;
    }
  };
}

function * createParams(command, httpContext) {
  var commandParams = yield parse(httpContext);

  var invokerParams = {
    command: command,
    commandParams: commandParams,
    context: createContext(httpContext)
  };
  return invokerParams;
}

module.exports.createParams = createParams;

