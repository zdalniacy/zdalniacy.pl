var controllers = require("../controllers/home"),
  Router = require('koa-router'),
  router = new Router();

router.get("admin-page", "/admin_panel/", controllers.adminPage);
module.exports = router;
