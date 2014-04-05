var serve = require('koa-static'),
  koa = require('koa'),
  router = require('./server/routes/routes'),
  securedRouter = require('./server/routes/securedRoutes'),
  //authorize = require('./server/routes/authorize'),
  app = module.exports = koa();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./server/config/config')[env];
require('./server/config/mongoose')(config);

app.use(serve(__dirname + '/public'));

require('./server/config/authConfig')(app, config);

app.use(router.middleware());
//app.use(authorize);
app.use(securedRouter.middleware());


if (!module.parent) app.listen(config.port);
