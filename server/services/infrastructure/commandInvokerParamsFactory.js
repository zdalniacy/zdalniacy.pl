"use strict";

function createContext(httpContext) {
  return {
    getApplicationUrl: function () {
      return httpContext.protocol + "://" + httpContext.host;
    }
  };
}

function * createParams(command, httpContext) {
  var invokerParams = {
    command: command,
    commandParams: null,
    context: createContext(httpContext)
  };
  return invokerParams;
}

module.exports.createParams = createParams;

