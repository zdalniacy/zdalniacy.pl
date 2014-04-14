"use strict";

var mongoose = require('mongoose'),
  mongooseConfig = require('../../server/config/mongoose'),
  Subscription = require('../../server/models/subscription').Subscription,
  connection = mongoose.connection,
  chance = require('chance').Chance();

describe('Subscription model', function () {
  var email = chance.email({domain: 'example.com'});

  before(function (done) {
    var subscription = new Subscription({email: email});
    subscription.save(function (err) {
      if (err) throw err;
      done();
    });
  });


  after(function (done) {
    Subscription.collection.remove(done);
  });

  afterEach(function (done) {
    Subscription.findOneAndRemove({email: email}, function (err) {
      if (!err) {
        done();
      }
    });
  });

  it("should find Subscription object", function (done) {
    Subscription.findOne({email: email}, function (err, subscrption) {
      if (err) throw err;
      subscrption.email.should.equal(email);
      done();
    });
  });

//  it("should update Subscription object", function () {
//  });

//  it("should delete Subscription object", function (done) {
//  });
});

