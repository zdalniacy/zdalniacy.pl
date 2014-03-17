var serve = require('koa-static');
var koa = require('koa');
var router = require('./server/routes/routes').router;
var mount = require('koa-mount');
var app = module.exports = koa();
var session = require('koa-sess');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./server/config/config')[env];

app.use(serve(__dirname + '/public'));
app.keys = ['zdalniacy.pl'];
app.use(session());

require('./server/config/authConfig')(config);
var passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(mount('/', router.middleware()));

if (!module.parent) app.listen(config.port);
