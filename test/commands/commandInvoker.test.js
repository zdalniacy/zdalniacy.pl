"use strict";

var commandInvoker = require('../../server/commands/commandInvoker'),
  expect = require('chai').expect,
  co = require('co'),
  Q = require('q');


var deferred;

function fakeExecute(params) {
  setTimeout(function () {
    deferred.resolve({commandWasCalled: true, fakeCommandParams: params});
  }, 10);

  return deferred.promise;
}

describe("commandInvoker", function () {

  beforeEach(function () {
    deferred = Q.defer();
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
      var result = yield commandInvoker.invoke(invokerParams);

      expect(result.commandWasCalled).to.equal(true);
      expect(result.fakeCommandParams).to.equal(commandParams);
    })(done);

  });

  it("should throw Error when command is not passed", function (done) {

    co(function *() {
      try {
        yield commandInvoker.invoke({});
      } catch (e) {
        expect(e.message).to.equal('The command is required');
      }
    })(done);
  });

  it("should throw Error when command doesn't have method execute", function (done) {

    co(function *() {
      try {
        yield commandInvoker.invoke({command: {}});
      } catch (e) {
        expect(e.message).to.equal("The command doesn't have method 'execute'");
      }
    })(done);
  });

  it("when validator is passed should call method validate", function (done) {
    var commandParams = {};
    var validationParams;
    var validatorWasCalled;
    var command = require('../commands/commandInvoker.test');
    command.validate = function (params) {
      validatorWasCalled = true;
      validationParams = params;
    };
    var invokerParams = {
      command: command,
      commandParams: commandParams
    };

    co(function * () {
      yield commandInvoker.invoke(invokerParams);

      expect(validatorWasCalled).to.equal(true);
      expect(validationParams).to.equal(commandParams);
    })(done);
  });

  it("when validator return array of errors should return object with errors", function (done) {
    var errors = ["test"];
    var command = require('../commands/commandInvoker.test');
    command.validate = function () {
      return errors;
    };
    var invokerParams = {
      command: command,
      commandParams: {}
    };

    co(function * () {
      var result = yield commandInvoker.invoke(invokerParams);

      expect(result.status).to.equal(false);
      expect(result.errors).to.equal(errors);
    })(done);
  });

  it("when validator return object of errors should return object with errors", function (done) {
    var errors = {};
    var command = require('../commands/commandInvoker.test');
    command.validate = function () {
      return errors;
    };
    var invokerParams = {
      command: command,
      commandParams: {}
    };

    co(function * () {
      var result = yield commandInvoker.invoke(invokerParams);

      expect(result.status).to.equal(false);
      expect(result.errors).to.equal(errors);
    })(done);
  });
});


module.exports.execute = fakeExecute;