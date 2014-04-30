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

  describe("findOne", function () {
    it("should return company if company exists", function (done) {
      var company = createRandomCompany();

      co(function * () {
        var savedCompany = yield repository.create(company);
        var foundCompany = yield repository.findOne({name: company.name});

        compareCompany(company, savedCompany);
        compareCompany(company, foundCompany);

        expect(savedCompany._id.toString()).to.equal(foundCompany._id.toString());
        done();
      })();
    });
    it("should return null if company doesn't exist", function (done) {
      var name = chance.string() + chance.hash();

      co(function * () {
        var foundCompany = yield repository.findOne({name: name});
        expect(foundCompany).to.equal(null);
        done();
      })();
    });
  });

//  describe("removeAll", function () {
//    it("should remove all companies", function (done) {
//      co(function * () {
//        yield repository.create(createRandomCompany());
//        yield repository.create(createRandomCompany());
//        yield repository.create(createRandomCompany());
//        done();
//      })();
//    });
//  });

});

