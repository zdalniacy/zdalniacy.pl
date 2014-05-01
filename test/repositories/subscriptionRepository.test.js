"use strict";

var repository = require('../../server/repositories/subscriptionRepository'),
  chance = require('chance').Chance(),
  expect = require('chai').expect,
  co = require('co'),
  _ = require('lodash'),
  createRandomSubscription = require('../testHelpers').createRandomSubscription;

function compareSubscription(subscription, savedsubscription) {
  _.each(subscription, function (value, key) {
    expect(value.toString()).to.equal(savedsubscription[key].toString(), key);
  });
}


describe('subscriptionRepository', function () {

  after(function (done) {
    co(function * () {
      yield repository.removeAll();
      done();
    })();
  });

  describe("create", function () {
    it("should create and return new subscription", function (done) {
      var subscription = createRandomSubscription();

      co(function * () {
        var savedSubscription = yield repository.create(subscription);
        compareSubscription(subscription, savedSubscription);
        done();
      })();
    });
  });

  describe("findOne", function () {
    it("should return subscription if subscription exists", function (done) {
      var subscription = createRandomSubscription();

      co(function * () {
        var savedSubscription = yield repository.create(subscription);
        var foundSubscription = yield repository.findOne({email: subscription.email});

        compareSubscription(subscription, foundSubscription);
        expect(savedSubscription._id.toString()).to.equal(foundSubscription._id.toString());
        done();
      })();
    });

    it("should return null if subscription doesn't exist", function (done) {
      var email = chance.email();

      co(function * () {
        var foundSubscription = yield repository.findOne({email: email});
        expect(foundSubscription).to.equal(null);
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

    it("should return all subscriptions sorted ascending", function (done) {
      var subscriptions = [createRandomSubscription(), createRandomSubscription(), createRandomSubscription()];

      co(function * () {
        yield repository.create(subscriptions[0]);
        yield repository.create(subscriptions[1]);
        yield repository.create(subscriptions[2]);
        var foundSubscriptions = yield repository.find();

        var sortedSubscriptions = _.sortBy(subscriptions, "email");
        expect(foundSubscriptions.length).to.equal(3);
        sortedSubscriptions.forEach(function (elem, index) {
          compareSubscription(elem, foundSubscriptions[index]);
        });
        done();
      })();
    });
  });
});