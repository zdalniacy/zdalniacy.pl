var views = require('co-views');
var render = views(__dirname + '/../views', { ext: 'ejs' });

var homePage = function *(){
  this.body = yield render("home.ejs");
}

var adminPage = function *(){
  this.body = yield render("admin.ejs");
}

exports.views = {
  'adminPage': adminPage,
  'homePage': homePage
}
