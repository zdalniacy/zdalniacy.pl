"use strict";

var repository = require('../../server/repositories/offerRepository'),
  chance = require('chance').Chance(),
  expect = require('chai').expect,
  co = require('co'),
  _ = require('lodash');

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
      expect(value.toString()).to.equal(saveTransaction[key].toString());
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
    if (key === 'createDate') return;
    expect(value.toString()).to.equal(savedOffer[key].toString(), key);
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
      var offer = createRandomOffer();

      co(function * () {
        var savedOffer = yield repository.create(offer);
        var foundOffer = yield repository.findOne({title: offer.title});

        compareOffers(offer, savedOffer);
        compareOffers(offer, foundOffer);
        expect(savedOffer._id.toString()).to.equal(foundOffer._id.toString());
        done();
      })();
    });
    it("should return null if offer doesn't exist", function (done) {
      var title = chance.string() + chance.hash();

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
      var offers = [createRandomOffer(), createRandomOffer(), createRandomOffer()];

      co(function * () {
        yield repository.create(offers[0]);
        yield repository.create(offers[1]);
        yield repository.create(offers[2]);
        var foundOffers = yield repository.find();

        var sortedOffers = _.sortBy(offers, "title");
        expect(foundOffers.length).to.equal(3);
        sortedOffers.forEach(function (elem, index) {
          compareOffers(elem, foundOffers[index]);
        });
        done();
      })();
    });
  });

  describe("findByIdAndUpdate", function () {

    it("should update offer", function (done) {
      var offer = createRandomOffer();
      var updateOffer = createRandomOffer();

      co(function * () {
        var savedOffer = yield repository.create(offer);

        var afterUpdateOffer = yield repository.findByIdAndUpdate(savedOffer._id, updateOffer);

        compareOffers(updateOffer, afterUpdateOffer);

        done();
      })();
    });

    it("should unly update these properties which are passed", function (done) {
      var offer = createRandomOffer();
      var propertiesToUpdate = {
        closeKey: chance.hash(),
        moderationDate: chance.date(),
        transaction: {
          paymentDate: chance.date(),
          transactionId: chance.hash()
        }
      };

      co(function * () {
        var savedOffer = yield repository.create(offer);

        var afterUpdateOffer = yield repository.findByIdAndUpdate(savedOffer._id, propertiesToUpdate);

        offer.closeKey = propertiesToUpdate.closeKey;
        offer.moderationDate = propertiesToUpdate.moderationDate;
        offer.transaction.paymentDate = propertiesToUpdate.transaction.paymentDate;
        offer.transaction.transactionId = propertiesToUpdate.transaction.transactionId;

        compareOffers(offer, afterUpdateOffer);

        done();
      })();

    });

    it("should update tags", function (done) {
      var offer = createRandomOffer();
      var tagsToUpdate = {
        tags: [chance.string(), chance.string()]
      };

      co(function * () {
        var savedOffer = yield repository.create(offer);

        var afterUpdateOffer = yield repository.findByIdAndUpdate(savedOffer._id, tagsToUpdate);

        expect(tagsToUpdate.tags.toString()).to.equal(afterUpdateOffer.tags.toString());

        done();
      })();

    });

  });

  describe("remove", function () {
    it("when one offer matches should remove offer and return 1", function (done) {
      var offer = createRandomOffer();

      co(function * () {
        var savedOffer = yield repository.create(offer);
        var result = yield repository.remove({_id: savedOffer._id});

        var notExistsOffer = yield repository.findOne({_id: savedOffer._id});

        expect(notExistsOffer).to.equal(null);
        expect(result).to.equal(1);
        done();
      })();
    });

    it("when offer doesn't exist should return 0", function (done) {
      var offer = createRandomOffer();

      co(function * () {
        var savedOffer = yield repository.create(offer);
        yield repository.remove({_id: savedOffer._id});
        var documentsAffected = yield repository.remove({_id: savedOffer._id});


        expect(documentsAffected).to.equal(0);
        done();
      })();
    });

  });

});