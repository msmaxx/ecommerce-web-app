const {OrderItems} = require('../models/models')


class OrderItemsController {

    async create(req, res) {

        const {
            userId,
            itemId,
            price,
            amount,
            orderId,
        } = req.body

        const orderItem = await OrderItems.create({
            userId,
            itemId,
            price,
            amount,
            orderId,
        })
        return res.json(orderItem)
    }

    async getAll(req, res) {
        const orderItems = await OrderItems.findAll()
        return res.json(orderItems)
    }

    async getAllOrderItemsByOrderId(req, res) {

        const {id} = req.params
        const orderItems = await OrderItems.findAll({
            where: {orderId: id}
        })
        return res.json(orderItems)
    }
}

module.exports = new OrderItemsController()