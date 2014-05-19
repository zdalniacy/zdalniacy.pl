"use strict";

var emailService = require('../../../server/services/infrastructure/emailService'),
  expect = require('chai').expect,
  co = require('co');

describe("emailService", function () {

  var emailParams = {
    from: "Testus ✔ <testus@zdalniacy.pl>",
    to: "testus@zdalniacy.pl",
    subject: "Hello ✔",
    text: "Hello world ✔",
    html: "<b>Hello world ✔</b>"
  };

  it("should send email", function (done) {
    co(function * () {
      var result = yield emailService.sendEmail(emailParams);
      expect(result.error).not.be.ok;
      expect(result.message).be.ok;
    })(done);
  });
});
