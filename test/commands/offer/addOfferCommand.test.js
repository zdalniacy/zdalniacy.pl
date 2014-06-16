"use strict";

var addOfferCommand = require('../../../server/commands/offer/addOfferCommand'),
  commandInvoker = require('../../../server/commands/commandInvoker'),
  companyRepository = require('../../../server/repositories/companyRepository'),
  offerRepository = require('../../../server/repositories/offerRepository'),
  dateTimeService = require('../../../server/services/utils/dateTimeService'),
  testHelpers = require('../../testHelpers'),
  co = require('co'),
  expect = require('chai').expect,
  emailService = require('../../../server/services/infrastructure/emailService'),
  util = require('util');


describe("addOfferCommand", function () {

  var invokerParams = {
    command: addOfferCommand
  };

  before(function (done) {

    co(function * () {
      yield companyRepository.removeAll();
      yield offerRepository.removeAll();
    })(done);

  });

  var oldGetNow;
  var now;
  var oldSendNoReplyEmail;
  var oldSendEmailToModerators;
  var sendNoReplyEmailParams;
  var sendEmailToModeratorsParams;

  function * sendNoReplyEmailFake(params) {
    sendNoReplyEmailParams = params;
    return true;
  }

  function * sendEmailToModeratorsFake(params) {
    sendEmailToModeratorsParams = params;
    return true;
  }

  beforeEach(function () {
    oldGetNow = dateTimeService.getNow;
    now = new Date();
    dateTimeService.getNow = function () {
      return now;
    };
    sendNoReplyEmailParams = null;
    oldSendNoReplyEmail = emailService.sendNoReplyEmail;
    oldSendEmailToModerators = emailService.sendEmailToModerators;
    emailService.sendNoReplyEmail = sendNoReplyEmailFake;
    emailService.sendEmailToModerators = sendEmailToModeratorsFake;
  });

  afterEach(function () {
    dateTimeService.getNow = oldGetNow;
    emailService.sendNoReplyEmail = oldSendNoReplyEmail;
    emailService.sendEmailToModerators = oldSendEmailToModerators;
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

  it("should add company and offer", function (done) {
    invokerParams.commandParams = testHelpers.createAddOfferCommandParams();
    co(function * () {
      var result = yield commandInvoker.invoke(invokerParams);

      var company = yield companyRepository.findOne({_id: result.company._id});
      var offer = yield offerRepository.findOne({_id: result.offer._id});

      expect(company).to.be.ok;
      expect(offer).to.be.ok;
      expect(offer.company._id.toString()).to.equal(company._id.toString());

    })(done);
  });

  it("should add offer and set proper status", function (done) {
    invokerParams.commandParams = testHelpers.createAddOfferCommandParams();
    co(function * () {
      var result = yield commandInvoker.invoke(invokerParams);

      var offer = yield offerRepository.findOne({_id: result.offer._id});

      expect(offer.status).to.equal('WAITING_FOR_APPROVAL');

    })(done);
  });

  it("should add company and offer and return proper result", function (done) {
    invokerParams.commandParams = testHelpers.createAddOfferCommandParams();
    co(function * () {
      var result = yield commandInvoker.invoke(invokerParams);

      expect(result.status).to.equal(true);
      expect(result.company).to.be.ok;
      expect(result.company._id).to.be.ok;
      expect(result.offer).to.be.ok;
      expect(result.offer._id).to.be.ok;

    })(done);
  });

  it("should set createDate", function (done) {
    invokerParams.commandParams = testHelpers.createAddOfferCommandParams();
    co(function * () {
      var result = yield commandInvoker.invoke(invokerParams);
      var offer = yield offerRepository.findOne({_id: result.offer._id});

      expect(offer.createDate).to.be.ok;
      expect(offer.createDate.toString()).to.equal(now.toString());

    })(done);
  });

  it("should set slug", function (done) {
    invokerParams.commandParams = testHelpers.createAddOfferCommandParams();
    invokerParams.commandParams.offer.name = "New śćółęąźżńć offer";
    co(function * () {
      var result = yield commandInvoker.invoke(invokerParams);

      var offer = yield offerRepository.findOne({_id: result.offer._id});

      expect(offer.slug).to.be.ok;
      expect(offer.slug).to.equal("new-scoleazznc-offer");


    })(done);
  });

  it("should set slug which is unique", function (done) {
    invokerParams.commandParams = testHelpers.createAddOfferCommandParams();
    invokerParams.commandParams.offer.name = "existing name";
    co(function * () {
      yield commandInvoker.invoke(invokerParams);
      var result = yield commandInvoker.invoke(invokerParams);

      var offer = yield offerRepository.findOne({_id: result.offer._id});

      expect(offer.slug).to.be.ok;
      expect(offer.slug).to.equal("existing-name2");

    })(done);
  });


  it("should create offer with company", function (done) {
    invokerParams.commandParams = testHelpers.createAddOfferCommandParams();
    co(function * () {
      var result = yield commandInvoker.invoke(invokerParams);

      var offer = yield offerRepository.findOne({_id: result.offer._id});

      expect(offer.company._id.toString()).to.equal(result.company._id.toString());

    })(done);

  });

  it("should create offer and use existing comapny", function (done) {
    invokerParams.commandParams = testHelpers.createAddOfferCommandParams();
    co(function * () {
      yield commandInvoker.invoke(invokerParams);
      var secondResult = yield commandInvoker.invoke(invokerParams);

      yield offerRepository.findOne({_id: secondResult.offer._id});
      var companies = yield companyRepository.find(invokerParams.commandParams.company);

      expect(companies.length).to.equal(1);

    })(done);
  });

  it("should send confirm email to user", function (done) {
    invokerParams.commandParams = testHelpers.createAddOfferCommandParams();
    co(function * () {
      yield commandInvoker.invoke(invokerParams);

      expect(sendNoReplyEmailParams).to.be.ok;
      expect(sendNoReplyEmailParams.to).to.equal(invokerParams.commandParams.company.email);
      expect(sendNoReplyEmailParams.subject).to.equal('Potwierdzenie przyjęcia oferty');

      var expectedHtml = yield testHelpers.emailsContent.confirmAddNewOffer({ offer: invokerParams.commandParams.offer});
      expect(sendNoReplyEmailParams.html).to.equal(expectedHtml);
    })(done);
  });

  it("should send notify email to moderators", function (done) {
    invokerParams.commandParams = testHelpers.createAddOfferCommandParams();
    co(function * () {
      var result = yield commandInvoker.invoke(invokerParams);

      var expectedTitle = util.format('Dodano ofertę %s (%s)', invokerParams.commandParams.offer.title, result.offer._id.toString());
      expect(sendEmailToModeratorsParams.subject).to.equal(expectedTitle);

      invokerParams.commandParams.offer._id = result.offer._id.toString();
      invokerParams.commandParams.offer.tags = invokerParams.commandParams.offer.tags.join(', ');

      var context = invokerParams.commandParams.context;
      var expectedHtml = yield testHelpers.emailsContent.notifyOfferWasAdded({
        offer: invokerParams.commandParams.offer,
        company: invokerParams.commandParams.company,
        approveUrl: context.getApplicationUrl() + "/offer/approve/" + result.offer._id.toString()
      });

      expect(sendEmailToModeratorsParams.html).to.equal(expectedHtml);
    })(done);
  });
});