var serve = require('koa-static');
var koa = require('koa');
var router = require('./server/routes/routes').router;
var mount = require('koa-mount');
var app = koa();

app.use(serve(__dirname + '/public'));
app.use(mount('/v1', router.middleware()))

app.listen(3000);
