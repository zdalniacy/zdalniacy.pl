"use strict";

var expect = require('chai').expect;
var co = require('co');
var commandInvoker = require('../../../server/commands/commandInvoker');
var approveOfferCommand = require('../../../server/commands/offer/approveOfferCommand');
var testHelpers = require('../../testHelpers');
var offerRepository = require('../../../server/repositories/offerRepository');

describe("approveOfferCommand", function () {

  var invokerParams = {
    command: approveOfferCommand,
    commandParams: {
      offerId: null
    }
  };

  beforeEach(function (done) {
    co(function * () {
      var createOfferCommandParams = {
        commandParams: testHelpers.createAddOfferCommandParams(),
        command: require('../../../server/commands/offer/addOfferCommand')
      };

      var result = yield commandInvoker.invoke(createOfferCommandParams);
      invokerParams.commandParams.offerId = result.offer._id.toString();

    })(done);
  });

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

  it("should approve proper offer", function (done) {

    co(function *() {
      var result = yield commandInvoker.invoke(invokerParams);
      var offer = yield offerRepository.findOne({_id: result._id});

      expect(result._id.toString()).to.equal(offer._id.toString());
      expect(offer._id.toString()).to.equal(invokerParams.commandParams.offerId);
      expect(offer.status).to.equal("APPROVED");
    })(done);
  });

  it("should send email to offer's author with cancellation link", function () {

  });

  it("should send email to moderators", function () {

  });

  it("when offer already approve should return false with message", function () {

  });

  it("when offer doesn't exist should return false with message", function () {

  });

});
