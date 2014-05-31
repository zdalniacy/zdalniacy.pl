"use strict";

var path = require('path');
var rootPath = path.normalize(__dirname + "/../../");

var configuration = {
  development: {
    rootPath: rootPath,
    port: process.env.PORT || 3000,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    db: 'mongodb://localhost/test',
    email: {
      config: {

      },
      type: 'stub',
      noReplyEmail: 'testus@zdalniacy.pl',
      moderatorEmails: ['testus@zdalniacy.pl']
    }
  },
  production: {
    rootPath: rootPath,
    port: process.env.PORT || 80,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    db: '',
    email: {
      config: {
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        secureConnection: false,
        host: 'mail.zdalniacy.pl',
        port: 587
      },
      type: 'SMTP',
      noReplyEmail: 'testus@zdalniacy.pl',
      moderatorEmails: ['testus@zdalniacy.pl']
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
