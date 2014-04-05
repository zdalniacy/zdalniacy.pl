var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var offerSchema = new Schema({
  title: String,
  description: String,
  salary_start: Number,
  salary_end: Number,
  offer_start: Date,
  offer_end: Date,
  slug: String
});

var Offer = mongoose.model("Offer", offerSchema);

module.exports.Offer = Offer;