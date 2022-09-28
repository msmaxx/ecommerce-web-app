const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware');
const checkAccessMiddleware = require('../middleware/checkAccessMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', checkRoleMiddleware('ADMIN'), orderController.getAll)

/**
 * @swagger
 * /order/:
 *   get:
 *     summary: Get all created orders (sales)
 *     description: Get all created orders
 *     responses:
 *       200:
 *         description: A list of orders
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
 *                       paymentMethod:
 *                         type: string
 *                         description: Order payment method
 *                         example: cash
 *                       paymentStatus:
 *                         type: string
 *                         description: Order payment status
 *                         example: exactAmount
 *                       totalPrice:
 *                         type: float
 *                         description: Total order price
 *                         example: 9.35
 *                       comment:
 *                         type: string
 *                         description: Comment to order
 *                         example: "client cash: 20 / change: 10.65"
 *                       userId:
 *                         type: integer
 *                         description: User (cashier) who created order
 *                         example: 1
 */

router.get('/:id', checkAccessMiddleware, orderController.getAllOrdersByUserId)

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Get all created orders (sales) by cashier (user) ID
 *     description: Get all created orders by cashier (user) ID
 *     responses:
 *       200:
 *         description: A list of orders by user ID
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
 *                       paymentMethod:
 *                         type: string
 *                         description: Order payment method
 *                         example: cash
 *                       paymentStatus:
 *                         type: string
 *                         description: Order payment status
 *                         example: exactAmount
 *                       totalPrice:
 *                         type: float
 *                         description: Total order price
 *                         example: 9.35
 *                      status:
 *                         type: string
 *                         description: Order status
 *                         example: "Completed"
 *                       comment:
 *                         type: string
 *                         description: Comment to order
 *                         example: "client cash: 20 / change: 10.65"
 *                       userId:
 *                         type: integer
 *                         description: User (cashier) who created order
 *                         example: 1
 */

router.get('/data/:id', checkRoleMiddleware('ADMIN'), orderController.getOrderById)

/**
 * @swagger
 * /order/data/{id}:
 *   get:
 *     summary: Get all created orders (sales) by order ID
 *     description: Get all created orders by order ID
 *     responses:
 *       200:
 *         description: A list of orders by oder ID
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
 *                       paymentMethod:
 *                         type: string
 *                         description: Order payment method
 *                         example: cash
 *                       paymentStatus:
 *                         type: string
 *                         description: Order payment status
 *                         example: exactAmount
 *                       totalPrice:
 *                         type: float
 *                         description: Total order price
 *                         example: 9.35
 *                       comment:
 *                         type: string
 *                         description: Comment to order
 *                         example: "client cash: 20 / change: 10.65"
 *                       status:
 *                         type: string
 *                         description: Order status
 *                         example: "Completed"
 *                       userId:
 *                         type: integer
 *                         description: User (cashier) who created order
 *                         example: 1
 */

router.get('/edit/status/:id/:status', checkRoleMiddleware('ADMIN'), orderController.updateOrderStatus)

/**
 * @swagger
 * /order/edit/status/{id}/{status}:
 *   get:
 *     summary: Update order status by order ID
 *     description: Update order status by order ID
 *     responses:
 *       200:
 *         description: Update order status by order ID
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
 *                       status:
 *                         type: string
 *                         description: Order status
 *                         example: "Completed"
 */

router.post('/', authMiddleware, orderController.create)

/**
 * @swagger
 * /order/:
 *   post:
 *     summary: Create new order (sale)
 *     description: Create new order (sale)
 *     responses:
 *       200:
 *         description: Create new order (sale)
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
 *                       paymentMethod:
 *                         type: string
 *                         description: Order payment method
 *                         example: cash
 *                       paymentStatus:
 *                         type: string
 *                         description: Order payment status
 *                         example: exactAmount
 *                       totalPrice:
 *                         type: float
 *                         description: Total order price
 *                         example: 9.35
 *                       comment:
 *                         type: string
 *                         description: Comment to order
 *                         example: "client cash: 20 / change: 10.65"
 *                       status:
 *                         type: string
 *                         description: Order status
 *                         example: "Completed"
 *                       userId:
 *                         type: integer
 *                         description: User (cashier) who created order
 *                         example: 1
 */

module.exports = router