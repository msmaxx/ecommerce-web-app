const Router = require('express')
const router = new Router()
const cartController = require('../controllers/cartController')
const checkAccessMiddleware = require('../middleware/checkAccessMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', checkRoleMiddleware('ADMIN'), cartController.getAll)
router.get('/:id', checkAccessMiddleware, cartController.getOne)

module.exports = router