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
    var sendEmailToModeratorsParams;
    var oldSendEmailToModerators;

    var invokerParams = {
        command: approveOfferCommand,
        commandParams: {
        }
    };

    function * sendNoReplyEmailFake(params) {
        sendNoReplyEmailParams = params;
        return true;
    }

    function * sendEmailToModeratorsFake(params) {
        sendEmailToModeratorsParams = params;
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
            oldSendEmailToModerators = emailService.sendEmailToModerators;
            emailService.sendNoReplyEmail = sendNoReplyEmailFake;
            emailService.sendEmailToModerators = sendEmailToModeratorsFake;
        })(done);
    });

    afterEach(function () {
        emailService.sendNoReplyEmail = oldSendNoReplyEmail;
        emailService.sendEmailToModerators = oldSendEmailToModerators;
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

            expect(result.status).to.equal(true);
            expect(result._id.toString()).to.equal(offer._id.toString());
            expect(offer._id.toString()).to.equal(invokerParams.commandParams.offerId);
            expect(offer.status).to.equal("APPROVED");
        })(done);
    });

    it("should send email to offer's author with cancellation link", function (done) {

        co(function *() {
            var result = yield commandInvoker.invoke(invokerParams);
            var offer = yield offerRepository.findOne({_id: result._id});

            expect(sendNoReplyEmailParams.subject).to.equal('Oferta ' + offer.title + ' została zatwierdzona');
            expect(sendNoReplyEmailParams.to).to.equal(offer.company.email);

            var expectedHtml = yield testHelpers.emailsContent.approvedOfferEmailToAuthor({
                title: offer.title,
                cancellationUrl: invokerParams.commandParams.context.getApplicationUrl() + "/offer/cancel/" + offer.toObject().closeKey
            });

            expect(sendNoReplyEmailParams.html).to.equal(expectedHtml);
        })(done);

    });

    it("should send email to moderators", function (done) {
        co(function *() {
            var result = yield commandInvoker.invoke(invokerParams);
            var offer = yield offerRepository.findOne({_id: result._id});

            expect(sendEmailToModeratorsParams.subject).to.equal('Oferta ' + offer.title + ' została zatwierdzona');

            var expectedHtml = yield testHelpers.emailsContent.notifyOfferWasApproved({
                title: offer.title
            });

            expect(sendEmailToModeratorsParams.html).to.equal(expectedHtml);
        })(done);
    });

    it("when offer already approve should return false with message", function (done) {
        co(function *() {
            var firstResult = yield commandInvoker.invoke(invokerParams);
            var secondResult = yield commandInvoker.invoke(invokerParams);

            expect(firstResult.status).to.equal(true);
            expect(secondResult.status).to.equal(false);
            expect(secondResult.errors).to.be.ok;
            expect(secondResult.errors).to.equal("Oferta została już zatwierdzona");
        })(done);
    });

    it("when offer doesn't exist should return false with message", function (done) {
        co(function *() {
            invokerParams.commandParams.offerId = "53d808c94b55d7a4184d08da";
            var result = yield commandInvoker.invoke(invokerParams);

            expect(result.status).to.equal(false);
            expect(result.errors).to.ok;
            expect(result.errors).to.equal("Oferta nie istnieje");
        })(done)
    });

});
