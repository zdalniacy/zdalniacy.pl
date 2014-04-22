"use strict";

var Offer = require('../../server/models/offer.js'),
  repository = require('../../server/repositories/offerRepository'),
  chance = require('chance').Chance(),
  expect = require('chai').expect,
  co = require('co');

describe('offerRepository', function () {

  after(function (done) {
    Offer.collection.remove(done);
  });

  describe("create", function () {
    it("should create and add new offer", function (done) {
      var title = chance.string();
      var offer = {title: title};

      co(function * () {
        var savedOffer = yield repository.create(offer);
        expect(savedOffer.title).to.equal(title);
        done();
      })();
    });
  });

//  it("should create and find Offer object", function (done) {


//    var offer = new Offer({title: title});

//    var save = function () {
//      return function (callback) {
//        offer.save(callback);
//      };
//    };
//
//    var findOne = function (title) {
//      return function (call) {
//        Offer.findOne({title: title}, call);
//      };
//    };

//    co(function * () {
//      yield save();
//      var savedOffer = yield findOne(title);
//      expect(savedOffer.title).to.equal(title);
//      done();
//    })();
//  });

//  it("should update Offer object", function (done) {
//    done();
//  });
//
//  it("should delete Offer object", function (done) {
//    done();
//  });

});