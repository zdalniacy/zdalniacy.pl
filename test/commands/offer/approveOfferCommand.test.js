"use strict";

var expect = require('chai').expect;
var co = require('co');
var commandInvoker = require('../../../server/commands/commandInvoker');
var approveOfferCommand = require('../../../server/commands/offer/approveOfferCommand');

describe("approveOfferCommand", function () {

  var invokerParams = {
    command: approveOfferCommand
  };

  it("should return errors when called with invalid params", function (done) {
    invokerParams.commandParams = {};

    co(function * () {
      var result = yield commandInvoker.invoke(invokerParams);

      expect(result.status).to.equal(false);
      expect(result.errors).to.be.ok;
      expect(result.errors[0].field).to.equal("offerId");
      expect(result.errors[0].message).to.equal("Id oferty jest wymagane");
      expect(result.errors[0].ruleName).to.equal("required");
    })(done);
  });

  it("should approve offer", function () {

  });

  it("should send email to offer author with cancellation link", function () {

  });

  it("should send email to moderators", function () {

  });

  it("when offer already approve should return false with message", function () {

  });

  it("when offer doesn't exist should return false with message", function () {

  });

});