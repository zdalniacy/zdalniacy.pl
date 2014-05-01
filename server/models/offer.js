var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var offerSchema = new Schema({
  title: String,
  description: String,
  company: {type: ObjectId, ref: "Company"},
  salaryStart: Number,
  salaryEnd: Number,
  createDate: Date,
  moderationDate: Date,
  publishDate: Date,
  endDate: Date,
  closeKey: String,
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