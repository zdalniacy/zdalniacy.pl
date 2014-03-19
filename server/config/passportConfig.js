var passport = require('koa-passport');

var GitHubStrategy = require('passport-github').Strategy;

module.exports = function (config) {
  "use strict";

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
  passport.use(new GitHubStrategy({
      clientID: config.githubClientId,
      clientSecret: config.githubClientSecret,
      callbackURL: "http://localhost:" + config.port + "/auth/github/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  ));
};