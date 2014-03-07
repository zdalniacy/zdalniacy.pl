var koa = require('koa');
var router = require('./server/routes/routes')
var app = koa();

app.use(serve(__dirname + '/public'));
app.use(mount('/', router.middleware()))

app.listen(3000);
