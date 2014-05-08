"use strict";

var offerValidator = require('../../server/validators/offerValidator'),
  testHelpers = require('../testHelpers'),
  expect = require('chai').expect;

describe("offerValidator", function () {

  it("should exist and have method validate", function () {
    expect(offerValidator).to.be.ok;
    expect(offerValidator.validate).to.be.ok;
  });

  describe("validate should return errors", function () {
    var offer;

    beforeEach(function () {
      offer = testHelpers.createRandomOffer();
    });

    describe("when title", function () {
      it("is null", function () {
        offer.title = null;
        var errors = offerValidator.validate(offer);

        expect(errors[0].message).to.equal("Pole jest wymagane");
        expect(errors[0].field).to.equal("title");
        expect(errors[0].ruleName).to.equal("required");
      });

      it("is empty", function () {
        offer.title = '';
        var errors = offerValidator.validate(offer);

        expect(errors[0].message).to.equal("Pole jest wymagane");
        expect(errors[0].field).to.equal("title");
      });
    });

    describe("when description", function () {
      it("is null", function () {
        offer.description = null;
        var errors = offerValidator.validate(offer);

        expect(errors[0].message).to.equal("Pole jest wymagane");
        expect(errors[0].field).to.equal("description");
        expect(errors[0].ruleName).to.equal("required");
      });

      it("is empty", function () {
        offer.description = '';
        var errors = offerValidator.validate(offer);

        expect(errors[0].message).to.equal("Pole jest wymagane");
        expect(errors[0].field).to.equal("description");
      });
    });

    describe("when salaryStart", function () {
      it("is not passed", function () {
        offer.salaryStart = '';
        var errors = offerValidator.validate(offer);

        expect(errors.length).to.equal(1);
        expect(errors[0].message).to.equal("Pole jest wymagane");
        expect(errors[0].field).to.equal("salaryStart");
        expect(errors[0].ruleName).to.equal("required");
      });

      it("is not float", function () {
        offer.salaryStart = '324sfds';
        var errors = offerValidator.validate(offer);

        expect(errors.length).to.equal(1);
        expect(errors[0].message).to.equal("Pole musi być liczbą");
        expect(errors[0].field).to.equal("salaryStart");
        expect(errors[0].ruleName).to.equal("float");
      });
    });

    describe("when salaryEnd", function () {
      it("is not passed", function () {
        offer.salaryEnd = '';
        var errors = offerValidator.validate(offer);

        expect(errors.length).to.equal(1);
        expect(errors[0].message).to.equal("Pole jest wymagane");
        expect(errors[0].field).to.equal("salaryEnd");
        expect(errors[0].ruleName).to.equal("required");
      });

      it("is not float", function () {
        offer.salaryEnd = '324sfds';
        var errors = offerValidator.validate(offer);

        expect(errors.length).to.equal(1);
        expect(errors[0].message).to.equal("Pole musi być liczbą");
        expect(errors[0].field).to.equal("salaryEnd");
        expect(errors[0].ruleName).to.equal("float");
      });
    });

  });


  describe("validate should not errors", function () {
    it("when offer is ok", function () {
      var offer = testHelpers.createRandomOffer();
      var errors = offerValidator.validate(offer);

      expect(errors.length).to.equal(0);
    });
  });
});