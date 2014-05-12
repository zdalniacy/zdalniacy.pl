"use strict";

var addOfferCommand = require('../../../server/commands/offer/addOfferCommand'),
  commandInvoker = require('../../../server/commands/commandInvoker'),
  co = require('co'),
  expect = require('chai').expect;

describe("addOfferCommand", function () {

  var invokerParams;

  beforeEach(function () {
    invokerParams = {
      command: addOfferCommand
    };
  });

  it("should exist and have methods execute and validate", function () {
    expect(addOfferCommand).to.be.ok;
    expect(addOfferCommand.execute).to.be.ok;
    expect(addOfferCommand.validate).to.be.ok;
  });

  it("should throw exception when params are not passed", function (done) {
    co(function * () {

      try {
        yield commandInvoker.invoke(invokerParams);
      } catch (e) {
        expect(e.message).to.equal('Nie przekazano parametrów do addOfferCommand');
      }
    })(done);
  });

  it("should throw exception when params are without command and offer", function (done) {
    invokerParams.commandParams = {};
    co(function * () {

      try {
        yield commandInvoker.invoke(invokerParams);
      } catch (e) {
        expect(e.message).to.equal('Nie przekazano obiektu do walidacji');
      }
    })(done);
  });

  it("should return errors when called with invalid params", function (done) {
    invokerParams.commandParams = {company: {}, offer: {}};

    co(function * () {
      var result = yield commandInvoker.invoke(invokerParams);

      expect(result.status).to.equal(false);
      expect(result.errors).to.be.ok;
      expect(result.errors.company).to.be.ok;
      expect(result.errors.company.length).to.equal(1);
      expect(result.errors.offer).to.be.ok;
      expect(result.errors.offer.length).to.equal(4);
    })(done);
  });

  it("should not add offer", function () {

  });

});