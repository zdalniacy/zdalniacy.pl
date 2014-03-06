var koa = require('koa');
var app = koa();

app.use(serve(__dirname + '/frontend_app'));

app.listen(3000);
