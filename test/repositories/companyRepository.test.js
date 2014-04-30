"use strict";

var repository = require('../../server/repositories/companyRepository'),
  chance = require('chance').Chance(),
  expect = require('chai').expect,
  co = require('co'),
  _ = require('lodash'),
  createRandomCompany = require('../testHelpers').createRandomCompany;

function compareCompany(company, savedCompany) {
  _.each(company, function (value, key) {
    expect(value.toString()).to.equal(savedCompany[key].toString(), key);
  });
}

describe("companyRepository", function () {

  describe("create", function () {
    it("should create and return new company", function (done) {
      var company = createRandomCompany();

      co(function * () {
        var savedCompany = yield repository.create(company);

        compareCompany(company, savedCompany);
        expect(savedCompany._id).to.be.ok;
        done();
      })();
    });
  });

  describe("removeAll", function () {
    it("should remove all companies", function () {
    });
  });

});

