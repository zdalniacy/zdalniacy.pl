"use strict";

var commandInvoker = require('../../server/commands/commandInvoker'),
  chance = require('chance').Chance(),
  expect = require('chai').expect,
  co = require('co'),
  _ = require('lodash');


var fakeCommandParams, commandWasCalled;
function fakeExecute(params) {
  fakeCommandParams = params;
  commandWasCalled = true;
}

describe("commandInvoker", function () {

  beforeEach(function () {
    fakeCommandParams = null;
    commandWasCalled = false;
  });

  it("should exists", function (done) {
    expect(commandInvoker).to.be.ok;
    done();
  });

  it("should have method invoke", function () {
    expect(commandInvoker.invoke).to.be.ok;
  });

  it("should execute command with proper params", function () {
    var commandParams = {};
    var invokerParams = {
      command: require('../commands/commandInvoker.test'),
      commandParams: commandParams
    };

    commandInvoker.invoke(invokerParams);

    expect(commandWasCalled).to.equal(true);
    expect(fakeCommandParams).to.equal(commandParams);
  });

  it("should throw Error when command is not passed", function () {

    var call = function () {
      commandInvoker.invoke({});
    };

    expect(call).to.throw("The command is required");
  });

  it("should throw Error when command doesn't have method execute", function () {

    var call = function () {
      commandInvoker.invoke({command: {}});
    };

    expect(call).to.throw("The command doesn't have method 'execute'");
  });


});


module.exports.execute = fakeExecute;