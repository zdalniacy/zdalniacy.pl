var views = require('co-views');
var render = views(__dirname + '/../views', { ext: 'ejs' });

function * homePage() {
  this.body = yield render("home.ejs");
}

function * adminPage() {
  this.body = yield render("admin.ejs");
}

function * loginPage() {
  this.body = yield render("login.ejs");
}

module.exports = {
  adminPage: adminPage,
  homePage: homePage,
  loginPage: loginPage
};
