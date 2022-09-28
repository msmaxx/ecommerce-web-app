const {Cart} = require('../models/models')

class CartController {

    async create(req, res) {
        const {userId} = req.body
        const cart = await Cart.create({userId})
        return res.json(cart)
    }

    async getAll(req, res) {
        const cart = await Cart.findAll()
        return res.json(cart)
    }

    async getOne(req, res) {
        const {id} = req.params
        const cart = await Cart.findOne({
            where: {userId: id}
        })
        return res.json(cart)
    }

}

module.exports = new CartController()