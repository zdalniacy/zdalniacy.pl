"use strict";

var mongoose = require('mongoose');

console.log("config.db")
module.exports = function (config) {
  console.log(config.db)
  mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true  });
};