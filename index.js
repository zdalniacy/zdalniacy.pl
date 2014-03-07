var serve = require('koa-static');
var koa = require('koa');
var router = require('./server/routes/routes').router;
var mount = require('koa-mount');
var app = module.exports = koa();

app.use(serve(__dirname + '/public'));
app.use(mount('/', router.middleware()))

if (!module.parent) app.listen(3000);
