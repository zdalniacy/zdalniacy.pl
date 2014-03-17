var serve = require('koa-static');
var koa = require('koa');
var router = require('./server/routes/routes').router;
var mount = require('koa-mount');
var app = module.exports = koa();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./server/config/config')[env];

app.use(serve(__dirname + '/public'));
app.use(mount('/', router.middleware()));

if (!module.parent) app.listen(3000);
