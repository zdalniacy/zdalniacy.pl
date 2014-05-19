"use strict";

var configuration = {
  development: {
    port: process.env.PORT || 3000,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    db: 'mongodb://localhost/test',
    email: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
      server: 'mail.zdalniacy.pl'
    }
  },
  production: {
    port: process.env.PORT || 80,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    db: '',
    email: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
      server: 'mail.zdalniacy.pl'
    }
  }
};

function getEnvironment() {
  return process.env.NODE_ENV || 'development';
}

function getConfig() {
  var env = getEnvironment();
  return configuration[env];
}

module.exports.getConfig = getConfig;