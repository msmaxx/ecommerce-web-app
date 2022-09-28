const Router = require('express')
const router = new Router()

const categoryRouter = require('./categoryRouter')
const itemRouter = require('./itemRouter')
const userRouter = require('./userRouter')
const cartRouter = require('./cartRouter')
const cartItemsRouter = require('./cartItemsRouter')
const orderRouter = require('./orderRouter')
const orderItemsRouter = require('./OrderItemsRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/item', itemRouter)
router.use('/cart', cartRouter)
router.use('/cart_items', cartItemsRouter)
router.use('/order', orderRouter)
router.use('/order_items', orderItemsRouter)

module.exports = router