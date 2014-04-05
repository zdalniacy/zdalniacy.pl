var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var subscriptionSchema = new Schema({
  email: String,
});

var Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports.Subscription = Subscription;

