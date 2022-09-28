const Router = require("express");
const router = new Router();
const cartItemsController = require("../controllers/cartItemsController");
const authMiddleware = require('../middleware/authMiddleware');

router.post("/", authMiddleware, cartItemsController.create);
router.delete("/del/:id", authMiddleware, cartItemsController.deleteFromCart);
router.get('/:id', cartItemsController.getAllCartItemsById)

module.exports = router;