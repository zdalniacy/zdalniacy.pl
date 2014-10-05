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
        var errors = offerValidator.validate(offer).errors;

        expect(errors[0].message).to.equal("Pole jest wymagane");
        expect(errors[0].field).to.equal("title");
        expect(errors[0].ruleName).to.equal("required");
      });

      it("is empty", function () {
        offer.title = '';
        var errors = offerValidator.validate(offer).errors;

        expect(errors[0].message).to.equal("Pole jest wymagane");
        expect(errors[0].field).to.equal("title");
      });
    });

    describe("when description", function () {
      it("is null", function () {
        offer.description = null;
        var errors = offerValidator.validate(offer).errors;

        expect(errors[0].message).to.equal("Pole jest wymagane");
        expect(errors[0].field).to.equal("description");
        expect(errors[0].ruleName).to.equal("required");
      });

      it("is empty", function () {
        offer.description = '';
        var errors = offerValidator.validate(offer).errors;

        expect(errors[0].message).to.equal("Pole jest wymagane");
        expect(errors[0].field).to.equal("description");
      });
    });

    describe("when salaryStart", function () {
      it("is not passed", function () {
        offer.salaryStart = '';
        var errors = offerValidator.validate(offer).errors;

        expect(errors.length).to.equal(1);
        expect(errors[0].message).to.equal("Pole jest wymagane");
        expect(errors[0].field).to.equal("salaryStart");
        expect(errors[0].ruleName).to.equal("required");
      });

      it("is not float", function () {
        offer.salaryStart = '324sfds';
        var errors = offerValidator.validate(offer).errors;

        expect(errors.length).to.equal(1);
        expect(errors[0].message).to.equal("Pole musi być liczbą");
        expect(errors[0].field).to.equal("salaryStart");
        expect(errors[0].ruleName).to.equal("float");
      });
    });

    describe("when salaryEnd", function () {
      it("is not passed", function () {
        offer.salaryEnd = '';
        var errors = offerValidator.validate(offer).errors;

        expect(errors.length).to.equal(1);
        expect(errors[0].message).to.equal("Pole jest wymagane");
        expect(errors[0].field).to.equal("salaryEnd");
        expect(errors[0].ruleName).to.equal("required");
      });

      it("is not float", function () {
        offer.salaryEnd = '324sfds';
        var errors = offerValidator.validate(offer).errors;

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
      var result = offerValidator.validate(offer);

      expect(result.isValid).to.equal(true);
      expect(result.errors.length).to.equal(0);
    });
  });

  describe("validate should sanitize", function () {
    it("title", function () {
      var offer = testHelpers.createRandomOffer();
      offer.title = "<script></script>";

      offerValidator.validate(offer);

      expect(offer.title).to.equal("&lt;script&gt;&lt;/script&gt;");
    });
    it("description", function () {
      var offer = testHelpers.createRandomOffer();
      offer.description = "<script></script>";

      offerValidator.validate(offer);

      expect(offer.description).to.equal("&lt;script&gt;&lt;/script&gt;");
    });
  });
});