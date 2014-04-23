"use strict";

var repository = require('../../server/repositories/offerRepository'),
  chance = require('chance').Chance(),
  expect = require('chai').expect,
  co = require('co'),
  _ = require('underscore');

function createRandomOffer() {
  return {
    title: chance.string(),
    description: chance.string(),
    salaryStart: chance.floating({min: 1, fixed: 2}),
    salaryEnd: chance.floating({min: 1, fixed: 2}),
    createDate: chance.date(),
    moderationDate: chance.date(),
    publishDate: chance.date(),
    endDate: chance.date(),
    closeKey: chance.hash(),
    transaction: {
      isPaid: chance.bool(),
      paymentDate: chance.date(),
      transactionId: chance.hash(),
      amount: chance.floating({min: 1, fixed: 2})
    },
    slug: chance.string(),
    tags: [chance.string(), chance.string()]
  };
}

function compareOffers(offer, savedOffer) {

  function compareTransaction(trasaction, saveTransaction) {
    _.each(trasaction, function (value, key) {
      expect(value).to.equal(saveTransaction[key]);
    });
  }

  _.each(offer, function (value, key) {
    if (key === 'transaction') {
      compareTransaction(value, savedOffer[key]);
      return;
    }
    if (key === 'tags') {
      expect(value.join()).to.equal(savedOffer[key].join());
      return;
    }
    expect(value).to.equal(savedOffer[key]);
  });
}

describe('offerRepository', function () {

  after(function (done) {
    co(function * () {
      yield repository.removeAll();
      done();
    })();
  });

  describe("create", function () {
    it("should create and return new offer", function (done) {
      var offer = createRandomOffer();

      co(function * () {
        var savedOffer = yield repository.create(offer);

        compareOffers(offer, savedOffer);

        done();
      })();
    });
  });

  describe("findOne", function () {
    it("should return offer if offer exists", function (done) {
      var title = chance.string();
      var offer = {title: title};

      co(function * () {
        var savedOffer = yield repository.create(offer);
        var foundOffer = yield repository.findOne({title: title});
        expect(title).to.equal(foundOffer.title);
        expect(savedOffer._id.toString()).to.equal(foundOffer._id.toString());
        done();
      })();
    });
    it("should return null if offer doesn't exist", function (done) {
      var title = chance.string();

      co(function * () {
        var foundOffer = yield repository.findOne({title: title});
        expect(foundOffer).to.equal(null);
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

    it("should return all offers sorted ascending", function (done) {
      var titles = [chance.string(), chance.string(), chance.string()];

      co(function * () {
        yield repository.create({title: titles[0]});
        yield repository.create({title: titles[1]});
        yield repository.create({title: titles[2]});
        var offers = yield repository.find();

        titles.sort();
        expect(offers.length).to.equal(3);
        titles.forEach(function (elem, index) {
          expect(offers[index].title).to.equal(elem);
        });
        done();
      })();
    });
  });
});