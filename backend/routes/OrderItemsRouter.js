const Router = require('express')
const router = new Router()
const orderItemsController = require('../controllers/orderItemsController')
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', checkRoleMiddleware('ADMIN'), orderItemsController.getAll)

/**
 * @swagger
 * /order_items/:
 *   get:
 *     summary: Fetch all order products (sold products)
 *     description: Fetch all order products
 *     responses:
 *       200:
 *         description: Fetch all order products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The order ID.
 *                         example: 1
 *                       price:
 *                         type: float
 *                         description: Product price
 *                         example: 10.00
 *                       amount:
 *                         type: integer
 *                         description: Bought product Amount
 *                         example: 3
 *                       itemId:
 *                         type: float
 *                         description: itemId from "items" Table (FK)
 *                         example: 9.35
 *                       userId:
 *                         type: integer
 *                         description: User (cashier) ID
 *                         example: 1
 *                       orderId:
 *                         type: integer
 *                         description: Order ID
 *                         example: 3
 */

router.get('/:id', orderItemsController.getAllOrderItemsByOrderId)

/**
 * @swagger
 * /order_items/{id}:
 *   get:
 *     summary: Fetch all ordered products (sold products) by order ID
 *     description: Fetch all order products by order ID
 *     responses:
 *       200:
 *         description: Fetch all order products by order ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The order ID.
 *                         example: 1
 *                       price:
 *                         type: float
 *                         description: Product price
 *                         example: 10.00
 *                       amount:
 *                         type: integer
 *                         description: Bought product Amount
 *                         example: 3
 *                       itemId:
 *                         type: float
 *                         description: itemId from "items" Table (FK)
 *                         example: 9.35
 *                       userId:
 *                         type: integer
 *                         description: User (cashier) ID
 *                         example: 1
 *                       orderId:
 *                         type: integer
 *                         description: Order ID
 *                         example: 3
 */

router.post('/', authMiddleware, orderItemsController.create)

/**
 * @swagger
 * /order_items/:
 *   post:
 *     summary: Create ordered products (sold products)
 *     description: Create order products
 *     responses:
 *       200:
 *         description: Create order products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The order ID.
 *                         example: 1
 *                       price:
 *                         type: float
 *                         description: Product price
 *                         example: 10.00
 *                       amount:
 *                         type: integer
 *                         description: Bought product Amount
 *                         example: 3
 *                       itemId:
 *                         type: float
 *                         description: itemId from "items" Table (FK)
 *                         example: 9.35
 *                       userId:
 *                         type: integer
 *                         description: User (cashier) ID
 *                         example: 1
 *                       orderId:
 *                         type: integer
 *                         description: Order ID
 *                         example: 3
 */

module.exports = router