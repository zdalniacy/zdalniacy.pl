var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var subscriptionSchema = new Schema({
  email: String,
  salaryStart: Number,
  salaryCurrency: String,
  unsubscribeKey: String, // for unsubscribe
  subscribeToken: String, // for confirming subscription
  isValid: Boolean,
  tags: { type: [String], index: true } 
});

var Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;

