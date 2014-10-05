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

  describe("findByIdAndUpdate", function () {

    it("should update subscription", function (done) {
      var subscription = createRandomSubscription();
      var updateSubscription = createRandomSubscription();

      co(function * () {
        var savedSubscription = yield repository.create(subscription);

        var afterUpdateSubscription = yield repository.findByIdAndUpdate(savedSubscription._id, updateSubscription);

        compareSubscription(updateSubscription, afterUpdateSubscription);

        done();
      })();
    });

    it("should unly update these properties which are passed", function (done) {
      var subscription = createRandomSubscription();
      var propertiesToUpdate = {
        unsubscribeKey: chance.hash(),
        subscribeToken: chance.hash()
      };

      co(function * () {
        var savedSubscription = yield repository.create(subscription);

        var afterUpdateSubscription = yield repository.findByIdAndUpdate(savedSubscription._id, propertiesToUpdate);

        subscription.unsubscribeKey = propertiesToUpdate.unsubscribeKey;
        subscription.subscribeToken = propertiesToUpdate.subscribeToken;

        compareSubscription(subscription, afterUpdateSubscription);

        done();
      })();

    });

    it("should update tags", function (done) {
      var subscription = createRandomSubscription();
      var tagsToUpdate = {
        tags: [chance.string(), chance.string()]
      };

      co(function * () {
        var savedSubscription = yield repository.create(subscription);

        var afterUpdateSubscription = yield repository.findByIdAndUpdate(savedSubscription._id, tagsToUpdate);

        expect(tagsToUpdate.tags.toString()).to.equal(afterUpdateSubscription.tags.toString());

        done();
      })();

    });

  });

  describe("remove", function () {
    it("when one subscription matches should remove subscription and return 1", function (done) {
      var subscription = createRandomSubscription();

      co(function * () {
        var savedSubscription = yield repository.create(subscription);
        var result = yield repository.remove({_id: savedSubscription._id});

        var notExistsSubscription = yield repository.findOne({_id: savedSubscription._id});

        expect(notExistsSubscription).to.equal(null);
        expect(result[0]).to.equal(1);
        done();
      })();
    });

    it("when offer doesn't exist should return 0", function (done) {
      var subscription = createRandomSubscription();

      co(function * () {
        var savedSubscription = yield repository.create(subscription);
        yield repository.remove({_id: savedSubscription._id});
        var documentsAffected = yield repository.remove({_id: savedSubscription._id});


        expect(documentsAffected[0]).to.equal(0);
        done();
      })();
    });

  });

});
