var mongoose = require('mongoose'),
  mongooseConfig = require('../../server/config/mongoose');

describe('mongoose config', function () {
  var connection,
    config = {
      db: 'mongodb://localhost/test'
    };

  beforeEach(function () {
    connection = mongoose.connection;
  });

  it("should setup connection to database", function (done) {
    mongooseConfig(config);
    connection.once('open', function () {
      done();
    });
  });
});