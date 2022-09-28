const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', itemController.getAll)

/**
 * @swagger
 * /item/:
 *   get:
 *     summary: Fetch all products (items)
 *     description: Fetch all products
 *     responses:
 *       200:
 *         description: Fetch all products
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
 *                         description: The item ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Item name
 *                         example: Brownie
 *                       price:
 *                         type: float
 *                         description: Item price
 *                         example: 10.00
 *                       image:
 *                         type: string
 *                         description: Item image
 *                         example: test.jpg
 *                       description:
 *                         type: string
 *                         description: Item description
 *                         example: "Tasty brownie"
 *                       quantity:
 *                         type: integer
 *                         description: Product quantity
 *                         example: 40
 *                       categoryID:
 *                         type: integer
 *                         description: Product category
 *                         example: 1
 */

router.get('/:id', itemController.getOne)

/**
 * @swagger
 * /item/{id}:
 *   get:
 *     summary: Fetch product data by item ID
 *     description: Fetch product data
 *     responses:
 *       200:
 *         description: Fetch product data
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
 *                         description: The item ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Item name
 *                         example: Brownie
 *                       price:
 *                         type: float
 *                         description: Item price
 *                         example: 10.00
 *                       image:
 *                         type: string
 *                         description: Item image
 *                         example: test.jpg
 *                       description:
 *                         type: string
 *                         description: Item description
 *                         example: "Tasty brownie"
 *                       quantity:
 *                         type: integer
 *                         description: Product quantity
 *                         example: 40
 *                       categoryID:
 *                         type: integer
 *                         description: Product category
 *                         example: 1
 */

router.get('/update/:id/:name/:description/:price/:quantity/:categoryId', itemController.updateItemData)

/**
 * @swagger
 * /item/update/{id}/{name}/{description}/{price}/{quantity}/{categoryId}:
 *   get:
 *     summary: Update product data by product ID
 *     description: Update product data
 *     responses:
 *       200:
 *         description: Update product data
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
 *                         description: The item ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Item name
 *                         example: Brownie
 *                       price:
 *                         type: float
 *                         description: Item price
 *                         example: 10.00
 *                       image:
 *                         type: string
 *                         description: Item image
 *                         example: test.jpg
 *                       description:
 *                         type: string
 *                         description: Item description
 *                         example: "Tasty brownie"
 *                       quantity:
 *                         type: integer
 *                         description: Product quantity
 *                         example: 40
 *                       categoryID:
 *                         type: integer
 *                         description: Product category
 *                         example: 1
 */

router.post('/', checkRoleMiddleware('ADMIN'), itemController.create)

/**
 * @swagger
 * /item/:
 *   post:
 *     summary: Create new item
 *     description: Create new item
 *     responses:
 *       200:
 *         description: Create new item
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
 *                         description: The item ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Item name
 *                         example: Brownie
 *                       price:
 *                         type: float
 *                         description: Item price
 *                         example: 10.00
 *                       image:
 *                         type: string
 *                         description: Item image
 *                         example: test.jpg
 *                       description:
 *                         type: string
 *                         description: Item description
 *                         example: "Tasty brownie"
 *                       quantity:
 *                         type: integer
 *                         description: Product quantity
 *                         example: 40
 *                       categoryID:
 *                         type: integer
 *                         description: Product category
 *                         example: 1
 */

module.exports = router