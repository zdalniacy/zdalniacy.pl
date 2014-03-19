var views = require("../controllers/home").views,
  passport = require('koa-passport'),
  Router = require('koa-router'),
  router = new Router();

router.get("home-page", "/", views.homePage);
router.get("login", "/login/", views.loginPage);
router.get("login", '/auth/github', passport.authenticate('github'));

router.get("github-callback", '/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/admin_panel/',
    failureRedirect: '/'
  })
);

module.exports = router;


