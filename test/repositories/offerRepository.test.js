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
    it("should create and return new offer", function (done) {
      var title = chance.string();
      var offer = {title: title};

      co(function * () {
        var savedOffer = yield repository.create(offer);
        expect(savedOffer.title).to.equal(title);
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
      Offer.collection.remove(done);
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
          console.log(elem);
          expect(offers[index].title).to.equal(elem);
        });
        done();
      })();
    });
  });
});