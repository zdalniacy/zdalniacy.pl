var koa = require('koa');
var app = koa();

app.use(serve(__dirname + '/public'));

app.listen(3000);
