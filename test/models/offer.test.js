"use strict";

var Offer = require('../../server/models/offer.js'),
  chance = require('chance').Chance(),
  expect = require('chai').expect,
  co = require('co');

describe('Offer model', function () {

  after(function (done) {
    Offer.collection.remove(done);
  });

  it("should create and find Offer object", function (done) {
    var title = chance.string();
    var offer = new Offer({title: title});

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
      var savedOffer = yield findOne(title);
      expect(savedOffer.title).to.equal(title);
      done();
    })();
  });

  // it("should update Offer object", function (done) {
  //   done();
  // });
  //
  // it("should delete Offer object", function (done) {
  //   done();
  // });
  
});
