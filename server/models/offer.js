var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var offerSchema = new Schema({
  title: String,
  description: String,
  company: {type: Number, ref: "Company"},
  salaryStart: Number,
  salaryEnd: Number,
  createDate: Date,
  moderationDate: Date,
  publishDate: Date,
  endDate: Date,
  close_key: Date,
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