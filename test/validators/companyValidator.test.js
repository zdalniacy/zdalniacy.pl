"use strict";

var companyValidator = require('../../server/validators/companyValidator'),
  testHelpers = require('../testHelpers'),
  expect = require('chai').expect;

describe("companyValidator", function () {

  it("should exist and have method validate", function () {
    expect(companyValidator).to.be.ok;
    expect(companyValidator.validate).to.be.ok;
  });

  it("validate should throw excpetion when company is not passed", function () {
    var fn = function () {
      companyValidator.validate();
    };
    expect(fn).to.throw("Nie przekazano obiektu do walidacji");
  });

  describe("validate should return errors", function () {
    var company;

    beforeEach(function () {
      company = testHelpers.createRandomCompany();
    });

    describe("when name", function () {
      it("is null", function () {
        company.name = null;
        var errors = companyValidator.validate(company);

        expect(errors[0].message).to.equal("Pole jest wymagane");
        expect(errors[0].field).to.equal("name");
        expect(errors[0].ruleName).to.equal("required");
      });

      it("is empty", function () {
        company.name = '';
        var errors = companyValidator.validate(company);

        expect(errors[0].message).to.equal("Pole jest wymagane");
        expect(errors[0].field).to.equal("name");
      });
    });

    describe("when url", function () {

      it("is invalid", function () {
        company.url = 'sdfs';
        var errors = companyValidator.validate(company);

        expect(errors[0].message).to.equal("Nieprawidłowy adres url");
        expect(errors[0].field).to.equal("url");
        expect(errors[0].ruleName).to.equal("url");
      });
    });

    describe("when phone number", function () {

      it("is invalid", function () {
        company.phone = 'sdfs';
        var errors = companyValidator.validate(company);

        expect(errors[0].message).to.equal("Nieprawidłowy numer telefonu");
        expect(errors[0].field).to.equal("phone");
        expect(errors[0].ruleName).to.equal("phone");
      });
    });

    describe("when email", function () {

      it("is invalid", function () {
        company.email = 'sdfs';
        var errors = companyValidator.validate(company);

        expect(errors.length).to.equal(1);
        expect(errors[0].message).to.equal("Nieprawidłowy adres email");
        expect(errors[0].field).to.equal("email");
        expect(errors[0].ruleName).to.equal("email");
      });
    });

    describe("when email and phone", function () {

      it("are invalid", function () {
        company.email = 'sdfs';
        company.phone = 'dsf';
        var errors = companyValidator.validate(company);

        expect(errors.length).to.equal(2);
        expect(errors[0].ruleName).to.equal("phone");
        expect(errors[1].ruleName).to.equal("email");
      });
    });

  });

  describe("validate should not errors", function () {
    it("when company is ok", function () {
      var company = testHelpers.createRandomCompany();
      var errors = companyValidator.validate(company);

      expect(errors.length).to.equal(0);
    });
  });
});