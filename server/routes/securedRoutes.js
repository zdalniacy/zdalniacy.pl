var views = require("../controllers/home").views,
  Router = require('koa-router'),
  router = new Router();

router.get("admin-page", "/admin_panel/", views.adminPage);
module.exports = router;


