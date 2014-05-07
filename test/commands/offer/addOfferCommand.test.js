"use strict";

var addOfferCommand = require('../../../server/commands/offer/addOfferCommand'),
  expect = require('chai').expect;

describe("addOfferCommand", function () {
  it("should exist and have method execute", function () {
    expect(addOfferCommand).to.be.ok;
    expect(addOfferCommand.execute).to.be.ok;
  });



});