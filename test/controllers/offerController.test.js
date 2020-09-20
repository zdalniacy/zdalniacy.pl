"use strict";

var app = require('../../index');
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
        .send(testHelper.createAddOfferRequestParams())
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

  describe.only('approve offer (/offers/approve/:id)', function () {
    it('should show list admin offers', function (done) {

      var cookie;
      request.get('/auth/github')
        .expect(302)
        .end(function (err, res) {
          if (err) throw err;
          cookie = res.res.headers['set-cookie'];
        });

      var offerParams = testHelper.createRandomOffer();
      var offer = new Offer(offerParams);
      offer.save(function (err) {
        if (err) throw err;
        request
          .post('/offers/approve/' + offer.toObject()._id)
          .set('cookie', cookie)
          .expect(200)
          .end(function (err, res) {
            if (err) throw err;
            done();
          });
      });
    });
  });
});