"use strict";

var mongoose = require('mongoose'),
  connection = mongoose.connection;

describe('mongoose config', function () {
  it("should setup connection to database", function (done) {
    if(connection.readyState === 1) {
      done();
    }
    else {
      connection.once('connected', function () {
        done();
      });
    }
  });
});