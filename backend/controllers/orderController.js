const {Order} = require('../models/models')


class OrderController {

    async create(req, res) {

        const {
            city,
            region,
            address,
            paymentMethod,
            paymentStatus,
            totalPrice,
            comment,
            status,
            userId,
        } = req.body

        const order = await Order.create({
            city,
            region,
            address,
            paymentMethod,
            paymentStatus,
            totalPrice,
            comment,
            status,
            userId,
        })
        return res.json(order)
    }

    async getAll(req, res) {

        const orders = await Order.findAll()
        return res.json(orders)
    }

    async getOrderById(req, res) {

        const {id} = req.params
        const order = await Order.findOne({
            where: {id: id}
        })
        return res.json(order)
    }

    async updateOrderStatus(req, res) {

        const {id, status} = req.params
        const order = await Order.update(
            {status: status},
            {
                where: {id: id}
            }
        )
        return res.json(order)
    }

    async getAllOrdersByUserId(req, res) {

        const {id} = req.params
        const order = await Order.findAll({
            where: {userId: id}
        })
        return res.json(order)
    }

}

module.exports = new OrderController()