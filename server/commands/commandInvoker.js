"use strict";

function checkCommand(params) {
  if (!params.command) {
    throw new Error("The command is required");
  }
  if (!params.command.execute) {
    throw new Error("The command doesn't have method 'execute'");
  }
}

function validate(params) {
  if (params.command.validate) {
    return params.command.validate(params.commandParams);
  }
  return null;
}

function areErrors(errors) {
  if (errors) {
    if (Array.isArray(errors)) {
      return errors.length > 0;
    }
    return true;
  }
  return false;
}

function * invoke(params) {
  checkCommand(params);

  var errors = validate(params);

  if (areErrors(errors)) {
    return {
      status: false,
      errors: errors
    };
  }

  return yield params.command.execute(params.commandParams);
}

module.exports.invoke = invoke;