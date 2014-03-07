var views = require("../controllers/home");
var Router = require('koa-router');
var router = new Router();

modules.exports = router;

router.get("/", views.homePage);
router.get("/admin_panel/", views.adminPage)
