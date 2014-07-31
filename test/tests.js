"use strict";

var app = require('../index');
var should = require('should');
var Offer = require('../server/models/offer.js');
var passportMock = require('./mockPassportMiddleware');
var passport = require('koa-passport');

var mockUser = {name: "test"};
app.use(passportMock.initialize(mockUser));
app.use(passport.session());
var request = require('supertest').agent(app.listen());

describe('Loading Main Page', function () {
  it('should say "Hello World "', function (done) {
    request
      .get('/')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        res.text.should.containEql("Hello World");
        done();

      });
  });
});

describe('Admin Page', function () {
  it('should show header "Admin Page"', function (done) {
    request
      .get('/admin_panel/')
      .expect(200)
      .end(function (err) {
        if (err) {
          throw err;
        }
        done();
      });
  });
});

