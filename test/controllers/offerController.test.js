"use strict";

var app = require('../../index');
var testHelpers = require('../testHelpers');
var expect = require('chai').expect;
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


});
