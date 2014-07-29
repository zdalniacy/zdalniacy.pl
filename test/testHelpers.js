"use strict";

var chance = require('chance').Chance();
var views = require('co-views');
var config = require('../server/config/config').getConfig();
var rootPath = config.rootPath;
var render = views(rootPath + '/server/views/emailViews', { ext: 'ejs' });

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

function createContext() {
  return  {
    getApplicationUrl: function () {
      return "http" + "://" + "zdalniacy.pl";
    }
  };
}

function createAddOfferCommandParams() {
  return createAddOfferRequestParams();
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
    status: 'WAITING_FOR_APPROVAL',
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

function * notifyOfferWasAdded(params) {
  return yield render('notifyOfferWasAdded', params);
}

function * confirmAddNewOffer(params) {
  return yield render('confirmAddNewOffer', params);
}

function * approvedOfferEmailToAuthor(params) {
  return yield render('approvedOfferEmailToAuthor', params);
}

function * notifyOfferWasApproved(params) {
  return yield render('notifyOfferWasApproved', params);
}

module.exports.createRandomOffer = createRandomOffer;
module.exports.createRandomCompany = createRandomCompany;
module.exports.createRandomSubscription = createRandomSubscription;
module.exports.createAddOfferCommandParams = createAddOfferCommandParams;
module.exports.createAddOfferRequestParams = createAddOfferRequestParams;
module.exports.emailsContent = {
  notifyOfferWasAdded: notifyOfferWasAdded,
  confirmAddNewOffer: confirmAddNewOffer,
  approvedOfferEmailToAuthor: approvedOfferEmailToAuthor,
  notifyOfferWasApproved: notifyOfferWasApproved
};
module.exports.createContext = createContext