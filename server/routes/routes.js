var views = require("../controllers/home");
var Router = require('koa-router');
var router = new Router();

router.get("home-page", "/", views.homePage);
router.get("admin-page", "/admin_panel/", views.adminPage)

exports = router;


