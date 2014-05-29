"use strict";

var Offer = require('../../server/models/offer.js'),
  expect = require('chai').expect,
  co = require('co'),
  testHelper = require('../testHelpers');

describe('Offer model', function () {

  after(function (done) {
    Offer.collection.remove(done);
  });

  it("should create and find Offer object", function (done) {
    var offerParams = testHelper.createRandomOffer();
    var offer = new Offer(offerParams);

    var save = function () {
      return function (callback) {
        offer.save(callback);
      };
    };

    var findOne = function (title) {
      return function (call) {
        Offer.findOne({title: title}, call);
      };
    };

    co(function * () {
      yield save();
      var savedOffer = yield findOne(offerParams.title);
      expect(savedOffer.title).to.equal(offerParams.title);
      done();
    })();
  });

  it("should update Offer object", function (done) {
    done();
  });

  it("should delete Offer object", function (done) {
    done();
  });

});