"use strict";

function checkCommand(params) {
  if(!params.command) {
    throw new Error("The command is required");
  }
  if(!params.command.execute) {
    throw new Error("The command doesn't have method 'execute'");
  }
}

function * invoke(params) {
  checkCommand(params);

  //TODO here call validate ???
  yield params.command.execute(params.commandParams);
}

module.exports.invoke = invoke;