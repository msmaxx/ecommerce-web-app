const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/data/', checkRoleMiddleware('ADMIN'), userController.getAll)

/**
 * @swagger
 * /user/data:
 *   get:
 *     summary: Retrieve a list of SmartPOS users
 *     description: Retrieve information about user from PostgreSQL
 *     responses:
 *       200:
 *         description: A list of users.
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
 *                         description: The user ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Maksim
 *                       email:
 *                         type: string
 *                         description: The user's email.
 *                         example: maks@mail.com
 *                       password:
 *                         type: string
 *                         description: The user's password.
 *                         example: passwordHash
 *                       role:
 *                         type: string
 *                         description: The user's role.
 *                         example: USER
 */

router.get('/data/:id', checkRoleMiddleware('ADMIN'), authMiddleware, userController.getOne)

/**
 * @swagger
 * /user/data/{id}:
 *   get:
 *     summary: Retrieve data of a specific SmartPOS user
 *     description: Retrieve information about user from PostgreSQL
 *     responses:
 *       200:
 *         description: User data.
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
 *                         description: The user ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Maksim
 *                       email:
 *                         type: string
 *                         description: The user's email.
 *                         example: maks@mail.com
 *                       password:
 *                         type: string
 *                         description: The user's password.
 *                         example: passwordHash
 *                       role:
 *                         type: string
 *                         description: The user's role.
 *                         example: USER
 */

router.get('/auth', authMiddleware, userController.check)

/**
 * @swagger
 * /user/data/auth:
 *   get:
 *     summary: Check user authentication
 *     description: Check user authentication
 *     responses:
 *       200:
 *         description: Check auth token.
 */

router.post('/registration', userController.registration)

/**
 * @swagger
 * /user/registration:
 *   post:
 *     summary: Submit User Registration Data
 *     description: Submit User Registration Data
 *     responses:
 *       200:
 *         description: User registration data
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
 *                         description: The user ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Maksim
 *                       email:
 *                         type: string
 *                         description: The user's email.
 *                         example: maks@mail.com
 *                       password:
 *                         type: string
 *                         description: The user's password.
 *                         example: passwordHash
 */

router.post('/login', userController.login)

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login data check
 *     description: User login data check
 *     responses:
 *       200:
 *         description: User login data check
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
 *                       email:
 *                         type: string
 *                         description: The user's email.
 *                         example: maks@mail.com
 *                       password:
 *                         type: string
 *                         description: The user's password.
 *                         example: passwordHash
 */

module.exports = router