"use strict";

function checkCommand(params) {
  if (!params.command) {
    throw new Error("The command is required");
  }
  if (!params.command.execute) {
    throw new Error("The command doesn't have method 'execute'");
  }

  if (!params.context) {
    throw new Error("The execution context doesn't exist");
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
  try {
    checkCommand(params);

    var errors = validate(params);

    if (areErrors(errors)) {
      return {
        status: false,
        errors: errors
      };
    }
    return yield params.command.execute(params.commandParams, params.context);
  } catch (err) {
    return {
      status: false,
      errors: err
    };
  }
}
/*
 command: '',
 commandParams: {
 },
 context:
 */
module.exports.invoke = invoke;