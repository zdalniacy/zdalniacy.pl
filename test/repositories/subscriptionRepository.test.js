"use strict";

var repository = require('../../server/repositories/subscriptionRepository'),
  chance = require('chance').Chance(),
  expect = require('chai').expect,
  co = require('co');


describe('subscriptionRepository', function () {

  after(function (done) {
    co(function * () {
      yield repository.removeAll();
      done();
    })();
  });

  describe("create", function () {
    it("should create and return new subscription", function (done) {
      var email = chance.email();
      var subscription = {email: email};

      co(function * () {
        var savedSubscription = yield repository.create(subscription);
        expect(savedSubscription.email).to.equal(email);
        done();
      })();
    });
  });

  describe("findOne", function () {
    it("should return subscription if subscription exists", function (done) {
      var email = chance.email();
      var subscription = {email: email};
      
      co(function * () {
        var savedSubscription = yield repository.create(subscription);
        var foundSubscription = yield repository.findOne({email: email});
        expect(email).to.equal(foundSubscription.email);
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
      var emails = [chance.email(), chance.email(), chance.email()];

      co(function * () {
        yield repository.create({email: emails[0]});
        yield repository.create({email: emails[1]});
        yield repository.create({email: emails[2]});
        var subscriptions = yield repository.find();

        emails.sort();
        expect(subscriptions.length).to.equal(3);
        emails.forEach(function (elem, index) {
          expect(subscriptions[index].email).to.equal(elem);
        });
        done();
      })();
    });
  });
});