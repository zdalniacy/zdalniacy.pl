"use strict";

var expect = require('chai').expect;
var co = require('co');
var commandInvoker = require('../../../server/commands/commandInvoker');
var approveOfferCommand = require('../../../server/commands/offer/approveOfferCommand');
var testHelpers = require('../../testHelpers');
var offerRepository = require('../../../server/repositories/offerRepository');
var emailService = require('../../../server/services/infrastructure/emailService');

describe("approveOfferCommand", function () {

  var sendNoReplyEmailParams;
  var oldSendNoReplyEmail;

  var invokerParams = {
    command: approveOfferCommand,
    commandParams: {
    }
  };

  function * sendNoReplyEmailFake(params) {
    sendNoReplyEmailParams = params;
    return true;
  }

  beforeEach(function (done) {
    co(function * () {
      var createOfferCommandParams = {
        commandParams: testHelpers.createAddOfferCommandParams(),
        command: require('../../../server/commands/offer/addOfferCommand')
      };

      var result = yield commandInvoker.invoke(createOfferCommandParams);
      invokerParams.commandParams.offerId = result.offer._id.toString();
      invokerParams.commandParams.context = testHelpers.createContext();

      sendNoReplyEmailParams = null;
      oldSendNoReplyEmail = emailService.sendNoReplyEmail;
      emailService.sendNoReplyEmail = sendNoReplyEmailFake;

    })(done);
  });

  afterEach(function () {
    emailService.sendNoReplyEmail = oldSendNoReplyEmail;
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

  it.skip("should send email to offer's author with cancellation link", function (done) {

    co(function *() {
      var result = yield commandInvoker.invoke(invokerParams);
      var offer = yield offerRepository.findOne({_id: result._id});

      expect(sendNoReplyEmailParams.subject).to.equal('Oferta ' + offer.title + ' została zatwierdzona');
      expect(sendNoReplyEmailParams.to).to.equal(offer.company.email);

      var expectedHtml = yield testHelpers.emailsContent.approvedOfferEmailToAuthor({
        title: offer.title
      });
      expect(sendNoReplyEmailParams.html).to.equal(expectedHtml);
    })(done);

  });

  it.skip("should send email to moderators", function () {

  });

  it.skip("when offer already approve should return false with message", function () {

  });

  it.skip("when offer doesn't exist should return false with message", function () {

  });

});
