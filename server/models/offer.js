"use strict";

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  statusesManager = require('../services/offer/offerStatusesManager');

var statesEnum = {
  values: statusesManager.getStatuses(),
  message: "Invalid status"
};

var offerSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  company: {type: ObjectId, ref: "Company"},
  salaryStart: Number,
  salaryEnd: Number,
  createDate: {
    type: Date,
    required: true
  },
  moderationDate: Date,
  publishDate: Date,
  endDate: Date,
  closeKey: String,
  status: {
    type: String,
    enum: statesEnum,
    required: true
  },
  transaction: {
    isPaid: Boolean,
    paymentDate: Date,
    transactionId: String,
    amount: Number
  },
  slug: String,
  tags: { type: [String], index: true }
});

var Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;