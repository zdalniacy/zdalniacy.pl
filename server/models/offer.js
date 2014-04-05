var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var offerSchema = new Schema({
  title: String,
  description: String,
  salaryStart: Number,
  salaryEnd: Number,
  offerStart: Date,
  offerEnd: Date,
  slug: String
});

var Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;