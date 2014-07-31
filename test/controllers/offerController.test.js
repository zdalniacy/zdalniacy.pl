"use strict";

var app = require('../../index');
var testHelpers = require('../testHelpers');
var expect = require('chai').expect;
var testHelper = require('../testHelpers');
var Offer = require('../../server/models/offer.js');

var passportMock = require('../mockPassportMiddleware');
var passport = require('koa-passport');

var mockUser = {name: "test"};
app.use(passportMock.initialize(mockUser));
app.use(passport.session());
var request = require('supertest').agent(app.listen());

describe("offerController", function () {

  describe('/offers/add', function () {

    it("should add offer", function (done) {
      request
        .post('/offers/add')
        .send(testHelpers.createAddOfferRequestParams())
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          expect(res).to.be.ok;
          expect(res.body.status).to.be.ok;
          expect(res.body.offer._id).to.be.ok;
          expect(res.body.company._id).to.be.ok;
          done();
        });
    });
  });


  describe('/admin/offers', function () {
    it('should show list admin offers', function (done) {
      var offerParams = testHelper.createRandomOffer();
      var offer = new Offer(offerParams);
      offer.save(function (err) {
        if (err) throw err;
        request
          .get('/admin/offers/')
          .expect(200)
          .end(function () {
            done();
          });
      });
    });
  });
});
