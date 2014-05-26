"use strict";

var chance = require('chance').Chance();

function createAddOfferRequestParams() {
  return {
    company: {
      name: chance.string(),
      url: chance.domain(),
      phone: chance.phone(),
      email: chance.email()
    },
    offer: {
      title: chance.string(),
      description: chance.string(),
      salaryStart: "" + chance.floating({min: 1, fixed: 2}),
      salaryEnd: "" + chance.floating({min: 1, fixed: 2}),
      tags: [chance.string(), chance.string()]
    }
  };
}

function createAddOfferCommandParams() {
  var params = createAddOfferRequestParams();
  params.request = {
    host: "zdalniacy.pl",
    protocol: "http"
  };
  return params;
}

function createRandomOffer() {
  return {
    title: chance.string(),
    description: chance.string(),
    salaryStart: "" + chance.floating({min: 1, fixed: 2}),
    salaryEnd: "" + chance.floating({min: 1, fixed: 2}),
    createDate: chance.date(),
    moderationDate: chance.date(),
    publishDate: chance.date(),
    endDate: chance.date(),
    closeKey: chance.hash(),
    transaction: {
      isPaid: chance.bool(),
      paymentDate: chance.date(),
      transactionId: chance.hash(),
      amount: chance.floating({min: 1, fixed: 2})
    },
    slug: chance.string(),
    tags: [chance.string(), chance.string()]
  };
}

function createRandomCompany() {
  return {
    name: chance.string(),
    url: chance.domain(),
    phone: chance.phone(),
    email: chance.email()
  };
}

function createRandomSubscription() {
  return {
    email: chance.email(),
    salaryStart: chance.floating({min: 1, fixed: 2}),
    salaryCurrency: chance.string(),
    unsubscribeKey: chance.hash(),
    subscribeToken: chance.hash(),
    isValid: chance.bool(),
    tags: [chance.string(), chance.string()]
  };
}

module.exports.createRandomOffer = createRandomOffer;
module.exports.createRandomCompany = createRandomCompany;
module.exports.createRandomSubscription = createRandomSubscription;
module.exports.createAddOfferCommandParams = createAddOfferCommandParams;
module.exports.createAddOfferRequestParams = createAddOfferRequestParams;