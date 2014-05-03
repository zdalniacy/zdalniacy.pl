"use strict";

var commandInvoker = require('../../server/commands/commandInvoker'),
  expect = require('chai').expect,
  co = require('co');


var fakeCommandParams, commandWasCalled;
function * fakeExecute(params) {
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

  it("should execute command with proper params", function (done) {
    var commandParams = {};
    var invokerParams = {
      command: require('../commands/commandInvoker.test'),
      commandParams: commandParams
    };

    co(function * () {
      yield commandInvoker.invoke(invokerParams);

      expect(commandWasCalled).to.equal(true);
      expect(fakeCommandParams).to.equal(commandParams);
    })(done);

  });

  it("should throw Error when command is not passed", function (done) {

    co(function *() {
      try {
        yield commandInvoker.invoke({});
      } catch (e) {
        expect(e.message).to.equal('The command is required');
        done();
      }
    })();
  });

  it("should throw Error when command doesn't have method execute", function (done) {

    co(function *() {
      try {
        yield commandInvoker.invoke({command: {}});
      } catch (e) {
        expect(e.message).to.equal("The command doesn't have method 'execute'");
        done();
      }
    })();
  });
});


module.exports.execute = fakeExecute;