var controllers = require("../controllers/home.js"),
  offersController = require("../controllers/admin/offerController"),
  passport = require('koa-passport'),
  Router = require('koa-router'),
  router = new Router();

router.get("home-page", "/", controllers.homePage);
router.get("offers", '/admin/offers', offersController.offerList);

router.get("login", "/login/", controllers.loginPage);
router.get("login-github", '/auth/github', passport.authenticate('github'));
router.get("github-callback", '/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/admin_panel/',
    failureRedirect: '/'
  })
);

router.post("addOffer", "/offers/add", offersController.addOffer);
router.post("approveOffer", "/offers/approve/:id", offersController.approveOffer);

module.exports = router;


