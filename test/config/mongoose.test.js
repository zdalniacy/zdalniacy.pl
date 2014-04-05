var mongoose = require('mongoose'),
  mongooseConfig = require('../../server/config/mongoose'),
  connection = mongoose.connection;

describe('mongoose config', function () {
  it("should setup connection to database", function (done) {
    connection.once('open', function () {
      done();
    });
  });
});