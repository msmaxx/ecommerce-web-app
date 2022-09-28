const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', categoryController.getAll)

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all created categories
 *     description: Get all categories
 *     responses:
 *       200:
 *         description: Get all categories
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
 *                         description: The category ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Category name
 *                         example: Food
 *                       slug:
 *                         type: string
 *                         description: Category slug
 *                         example: food
 */

router.get('/:id', categoryController.getCategoryById)

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get category by ID
 *     description: Get category by ID
 *     responses:
 *       200:
 *         description: Get category by ID
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
 *                         description: The category ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Category name
 *                         example: Food
 *                       slug:
 *                         type: string
 *                         description: Category slug
 *                         example: food
 */

router.post('/', checkRoleMiddleware('ADMIN'), categoryController.create)

/**
 * @swagger
 * /category/:
 *   post:
 *     summary: Create new category
 *     description: Create category
 *     responses:
 *       200:
 *         description: Create category
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
 *                         description: The category ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Category name
 *                         example: Food
 *                       slug:
 *                         type: string
 *                         description: Category slug
 *                         example: food
 */

module.exports = router