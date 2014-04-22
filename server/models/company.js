var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var companySchema = new Schema({
  name: String,
  url: String,
  phone: String,
  email: String
});

var Company = mongoose.model("Company", companySchema);

module.exports = Company;