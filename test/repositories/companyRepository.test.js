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

  before(function (done) {
    co(function * () {
      yield repository.removeAll();
      done();
    })();
  });

  after(function (done) {
    co(function * () {
      yield repository.removeAll();
      done();
    })();
  });

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

  describe("find", function () {

    beforeEach(function (done) {
      co(function * () {
        yield repository.removeAll();
        done();
      })();
    });

    it("should return all companies sorted ascending by name", function (done) {
      var companies = [createRandomCompany(), createRandomCompany(), createRandomCompany()];

      co(function * () {
        yield repository.create(companies[0]);
        yield repository.create(companies[1]);
        yield repository.create(companies[2]);
        var foundCompanies = yield repository.find();

        var sortedOffers = _.sortBy(companies, "name");
        expect(foundCompanies.length).to.equal(3);
        sortedOffers.forEach(function (elem, index) {
          compareCompany(elem, foundCompanies[index]);
        });
        done();
      })();
    });
  });

  describe("removeAll", function () {

    beforeEach(function (done) {
      co(function * () {
        yield repository.removeAll();
        done();
      })();
    });

    it("should remove all companies", function (done) {
      co(function * () {
        yield repository.create(createRandomCompany());
        yield repository.create(createRandomCompany());
        yield repository.create(createRandomCompany());
        var foundCompanies = yield repository.find();
        expect(foundCompanies.length).to.equal(3);

        yield repository.removeAll();

        var companiesAfterRemove = yield repository.find();
        expect(companiesAfterRemove.length).to.equal(0);
        done();
      })();
    });
  });

  describe("findByIdAndUpdate", function () {

    it("should update company", function (done) {
      var company = createRandomCompany();
      var updateCompany = createRandomCompany();

      co(function * () {
        var savedCompany = yield repository.create(company);

        var afterUpdateCompany = yield repository.findByIdAndUpdate(savedCompany._id, updateCompany);

        compareCompany(updateCompany, afterUpdateCompany);

        done();
      })();
    });

    it("should unly update these properties which are passed", function (done) {
      var company = createRandomCompany();
      var propertiesToUpdate = {
        name: chance.string(),
        email: chance.email()
      };

      co(function * () {
        var savedCompany = yield repository.create(company);

        var afterUpdateOffer = yield repository.findByIdAndUpdate(savedCompany._id, propertiesToUpdate);

        company.name = propertiesToUpdate.name;
        company.email = propertiesToUpdate.email;

        compareCompany(company, afterUpdateOffer);

        done();
      })();
    });

  });


});

