var session = require('koa-sess');

module.exports = function (app, config) {
  "use strict";

  app.keys = ['zdalniacy.pl'];
  app.use(session());

  require('./passportConfig')(config);
  var passport = require('koa-passport');
  app.use(passport.initialize());
  app.use(passport.session());
};


