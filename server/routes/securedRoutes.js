var controllers = require("../controllers/home");
var Router = require('koa-router');
var router = new Router();
var offersController = require("../controllers/admin/offerController");

router.get("admin-page", "/admin_panel/", controllers.adminPage);
router.post("approveOffer", "/offers/approve/:id", offersController.approveOffer);
module.exports = router;
